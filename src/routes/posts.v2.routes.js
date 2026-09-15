import { Router } from 'express';
import mongoose from 'mongoose';
const router = Router();

const cacheV2 = (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=30, s-maxage=120');
  next();
};

const getPostModel = () => {
  return mongoose.models.Post || mongoose.models.post || mongoose.model('Post');
};

// ==========================
// 1. LISTADO - /admin
// ==========================
router.get('/', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const search = req.query.search || req.query.q || '';
    const skip = (page - 1) * limit;

    const filter = {};
    if (search && search.length >= 2) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [
        { Entry_Title: regex },
        { Entry_Resume: regex },
        { Entry_Tags: regex },
        { Entry_Category: regex }
      ];
    }

    const [posts, total] = await Promise.all([
      Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Post.countDocuments(filter)
    ]);

    res.json({
      data: posts,
      posts: posts,
      total,
      page,
      pages: Math.ceil(total / limit),
      version: 'v2'
    });
  } catch (e) {
    console.error('[v2 posts /]', e);
    res.status(500).json({ message: e.message });
  }
});

// ==========================
// 2. SEARCH
// ==========================
router.get('/search', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    const { q, search, limit = 12 } = req.query;
    const query = q || search;
    if (!query || query.length < 2) return res.json({ data: [], posts: [], q: query });

    const l = Math.min(parseInt(limit), 30);
    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    const posts = await Post.find({
      $or: [
        { Entry_Title: regex },
        { Entry_Resume: regex },
        { Entry_Tags: regex },
        { Entry_Category: regex }
      ]
    }).sort({ createdAt: -1 }).limit(l).lean();

    res.json({ data: posts, posts, q: query, count: posts.length });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/last', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    const limit = Math.min(parseInt(req.query.limit) || 1, 10);
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(limit).lean();
    res.json({ data: limit===1? posts[0] : posts, posts: posts, version: 'v2' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// ==========================
// 3. CAROUSEL / PORTADA / DESTACADAS
// ==========================
router.get('/carousel', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    let main = await Post.findOne({ carouselMain: true }).sort({ carouselMainAt: -1, updatedAt: -1 }).lean();
    if (!main) main = await Post.findOne({ Entry_Is_Portada: true }).sort({ Entry_Portada_At: -1, updatedAt: -1 }).lean();
    let sides = await Post.find({ carouselSide: true }).sort({ carouselOrder: 1, carouselSideAt: -1, updatedAt: -1 }).limit(4).lean();
    if (!main) {
      main = await Post.find({}).sort({ createdAt: -1 }).limit(1).lean().then(r=>r[0]);
    }
    if (sides.length < 4) {
      const excludeIds = [main?._id,...sides.map(s=>s._id)].filter(Boolean);
      const faltan = 4 - sides.length;
      const autoSides = await Post.find({ _id: { $nin: excludeIds } }).sort({ createdAt: -1 }).limit(faltan).lean();
      sides = [...sides,...autoSides];
    }
    const carousel = [main,...sides].filter(Boolean);
    res.json({ data: carousel, posts: carousel, main, sides, version: 'v2-carousel-opcional' });
  } catch (e) {
    console.error('[carousel]', e);
    res.status(500).json({ message: e.message });
  }
});

router.get('/portada', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    let post = await Post.findOne({ carouselMain: true }).sort({ carouselMainAt: -1 }).lean();
    if (!post) post = await Post.findOne({ Entry_Is_Portada: true }).sort({ Entry_Portada_At: -1 }).lean();
    if (!post) post = await Post.findOne({}).sort({ createdAt: -1 }).lean();
    res.json({ data: post, post, version: 'v2' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/destacada', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    let post = await Post.findOne({ carouselMain: true }).sort({ carouselMainAt: -1 }).lean();
    if (!post) post = await Post.findOne({ Entry_Is_Portada: true }).sort({ Entry_Portada_At: -1 }).lean();
    if (!post) post = await Post.findOne({}).sort({ createdAt: -1 }).lean();
    res.json({ data: post, version: 'v2' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/destacadas', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    let posts = await Post.find({ destacada: true }).sort({ destacadaOrder: 1, destacadaAt: -1, updatedAt: -1 }).limit(5).lean();
    if (posts.length === 0) {
      const sort = Post.schema.path('views')? { views: -1, createdAt: -1 } : { createdAt: -1 };
      posts = await Post.find({}).sort(sort).limit(5).lean();
    }
    if (posts.length > 0 && posts.length < 5) {
      const exclude = posts.map(p=>p._id);
      const faltan = 5 - posts.length;
      const auto = await Post.find({ _id: { $nin: exclude } }).sort({ createdAt: -1 }).limit(faltan).lean();
      posts = [...posts,...auto];
    }
    res.json({ data: posts, posts, version: 'v2-destacadas-opcional', total: posts.length });
  } catch (e) {
    console.error('[destacadas]', e);
    res.status(500).json({ message: e.message });
  }
});

router.get('/ultimas', cacheV2, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 12, 30);
    const Post = getPostModel();
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(limit).lean();
    res.json({ data: posts, posts, version: 'v2' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/mas-leidas', cacheV2, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 5, 10);
    const Post = getPostModel();
    const sort = Post.schema.path('views')? { views: -1, createdAt: -1 } : { createdAt: -1 };
    const posts = await Post.find({}).sort(sort).limit(limit).lean();
    res.json({ data: posts, posts, version: 'v2', total: posts.length });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/slugs', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    const posts = await Post.find({}).select('Entry_Title Entry_Slug').sort({createdAt: -1}).limit(20).lean();
    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// ==========================
// 6. ADMIN PATCH
// ==========================
router.patch('/:id/portada', async (req, res) => {
  try {
    const Post = getPostModel();
    const { active } = req.body;
    if (active) {
      await Post.updateMany({}, { $set: { Entry_Is_Portada: false } });
      await Post.updateMany({}, { $set: { carouselMain: false } });
      await Post.findByIdAndUpdate(req.params.id, { Entry_Is_Portada: true, Entry_Portada_At: new Date(), carouselMain: true, carouselMainAt: new Date() });
    } else {
      await Post.findByIdAndUpdate(req.params.id, { Entry_Is_Portada: false, carouselMain: false });
    }
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.patch('/:id/carousel-main', async (req, res) => {
  try {
    const Post = getPostModel();
    const { active } = req.body;
    if (active) {
      await Post.updateMany({}, { $set: { carouselMain: false } });
      await Post.findByIdAndUpdate(req.params.id, { carouselMain: true, carouselMainAt: new Date() });
    } else {
      await Post.findByIdAndUpdate(req.params.id, { carouselMain: false });
    }
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.patch('/:id/carousel-side', async (req, res) => {
  try {
    const Post = getPostModel();
    const { active, order } = req.body;
    const update = { carouselSide:!!active };
    if (typeof order === 'number') update.carouselOrder = order;
    if (active) update.carouselSideAt = new Date();
    await Post.findByIdAndUpdate(req.params.id, update);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.patch('/:id/destacada', async (req, res) => {
  try {
    const Post = getPostModel();
    const { active, order } = req.body;
    const update = { destacada:!!active };
    if (typeof order === 'number') update.destacadaOrder = order;
    if (active) update.destacadaAt = new Date();
    await Post.findByIdAndUpdate(req.params.id, update);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ==========================
// 7. FIX COMPATIBILIDAD - VA ANTES DEL /:id
// ==========================
router.get('/slug/:slug', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    const post = await Post.findOne({ Entry_Slug: req.params.slug }).lean();
    if (!post) return res.status(404).json({ message: 'No encontrado' });
    res.json({ data: post, post });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// ==========================
// 8. ESTE SIEMPRE ULTIMO
// ==========================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (['search','last','destacada','destacadas','portada','carousel','ultimas','mas-leidas','slugs','slug'].includes(id)) {
      return res.status(404).json({ message: 'Ruta no encontrada' });
    }
    const Post = getPostModel();
    let post = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await Post.findById(id).lean();
    }
    if (!post) {
      post = await Post.findOne({ Entry_Slug: id }).lean();
    }
    if (!post) return res.status(404).json({ message: 'No encontrado' });
    res.json({ data: post, post });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;