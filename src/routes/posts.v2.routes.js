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

const slugify = (text = '') => text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').substring(0,110);

// ==========================
// 1. LISTADO
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
      filter.$or = [{ Entry_Title: regex }, { Entry_Resume: regex }, { Entry_Tags: regex }, { Entry_Category: regex }];
    }
    const [posts, total] = await Promise.all([
      Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Post.countDocuments(filter)
    ]);
    res.json({ data: posts, posts, total, page, pages: Math.ceil(total / limit), version: 'v2' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/search', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    const { q, search, limit = 12 } = req.query;
    const query = q || search;
    if (!query || query.length < 2) return res.json({ data: [], posts: [], q: query });
    const l = Math.min(parseInt(limit), 30);
    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const posts = await Post.find({ $or: [{ Entry_Title: regex }, { Entry_Resume: regex }, { Entry_Tags: regex }, { Entry_Category: regex }] }).sort({ createdAt: -1 }).limit(l).lean();
    res.json({ data: posts, posts, q: query, count: posts.length });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/last', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    const limit = Math.min(parseInt(req.query.limit) || 1, 10);
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(limit).lean();
    res.json({ data: limit===1? posts[0] : posts, posts, version: 'v2' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/carousel', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    let main = await Post.findOne({ carouselMain: true }).sort({ carouselMainAt: -1, updatedAt: -1 }).lean();
    if (!main) main = await Post.findOne({ Entry_Is_Portada: true }).sort({ Entry_Portada_At: -1, updatedAt: -1 }).lean();
    let sides = await Post.find({ carouselSide: true }).sort({ carouselOrder: 1, carouselSideAt: -1, updatedAt: -1 }).limit(4).lean();
    if (!main) main = await Post.find({}).sort({ createdAt: -1 }).limit(1).lean().then(r=>r[0]);
    if (sides.length < 4) {
      const excludeIds = [main?._id,...sides.map(s=>s._id)].filter(Boolean);
      const faltan = 4 - sides.length;
      const autoSides = await Post.find({ _id: { $nin: excludeIds } }).sort({ createdAt: -1 }).limit(faltan).lean();
      sides = [...sides,...autoSides];
    }
    res.json({ data: [main,...sides].filter(Boolean), posts: [main,...sides].filter(Boolean), main, sides, version: 'v2' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/portada', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    let post = await Post.findOne({ carouselMain: true }).sort({ carouselMainAt: -1 }).lean();
    if (!post) post = await Post.findOne({ Entry_Is_Portada: true }).sort({ Entry_Portada_At: -1 }).lean();
    if (!post) post = await Post.findOne({}).sort({ createdAt: -1 }).lean();
    res.json({ data: post, post, version: 'v2' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/destacada', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    let post = await Post.findOne({ carouselMain: true }).sort({ carouselMainAt: -1 }).lean();
    if (!post) post = await Post.findOne({ Entry_Is_Portada: true }).sort({ Entry_Portada_At: -1 }).lean();
    if (!post) post = await Post.findOne({}).sort({ createdAt: -1 }).lean();
    res.json({ data: post, version: 'v2' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/destacadas', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    let posts = await Post.find({ destacada: true }).sort({ destacadaOrder: 1, destacadaAt: -1 }).limit(5).lean();
    if (!posts.length) posts = await Post.find({}).sort({ createdAt: -1 }).limit(5).lean();
    if (posts.length < 5) {
      const exclude = posts.map(p=>p._id);
      const auto = await Post.find({ _id: { $nin: exclude } }).sort({ createdAt: -1 }).limit(5-posts.length).lean();
      posts = [...posts,...auto];
    }
    res.json({ data: posts, posts, total: posts.length });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/ultimas', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(Math.min(parseInt(req.query.limit)||12,30)).lean();
    res.json({ data: posts, posts });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/mas-leidas', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    const sort = Post.schema.path('views')? { views: -1, createdAt: -1 } : { createdAt: -1 };
    const posts = await Post.find({}).sort(sort).limit(Math.min(parseInt(req.query.limit)||5,10)).lean();
    res.json({ data: posts, posts });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/slugs', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    const posts = await Post.find({}).select('Entry_Title Entry_Slug').sort({createdAt: -1}).limit(20).lean();
    res.json(posts);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.patch('/:id/portada', async (req, res) => {
  try {
    const Post = getPostModel();
    if (req.body.active) {
      await Post.updateMany({}, { $set: { Entry_Is_Portada: false, carouselMain: false } });
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
    if (req.body.active) {
      await Post.updateMany({}, { $set: { carouselMain: false } });
      await Post.findByIdAndUpdate(req.params.id, { carouselMain: true, carouselMainAt: new Date() });
    } else await Post.findByIdAndUpdate(req.params.id, { carouselMain: false });
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.patch('/:id/carousel-side', async (req, res) => {
  try {
    const Post = getPostModel();
    const update = { carouselSide:!!req.body.active };
    if (typeof req.body.order === 'number') update.carouselOrder = req.body.order;
    if (req.body.active) update.carouselSideAt = new Date();
    await Post.findByIdAndUpdate(req.params.id, update);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.patch('/:id/destacada', async (req, res) => {
  try {
    const Post = getPostModel();
    const update = { destacada:!!req.body.active };
    if (typeof req.body.order === 'number') update.destacadaOrder = req.body.order;
    if (req.body.active) update.destacadaAt = new Date();
    await Post.findByIdAndUpdate(req.params.id, update);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/slug/:slug', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    const post = await Post.findOne({ Entry_Slug: req.params.slug }).lean();
    if (!post) return res.status(404).json({ message: 'No encontrado' });
    res.json({ data: post, post });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// ===== FIX DEFINITIVO: PRESERVA -mu2t10ll =====
router.put('/:id', async (req, res) => {
  try {
    const Post = getPostModel();
    const existing = await Post.findById(req.params.id).lean();
    if (!existing) return res.status(404).json({ message: 'No encontrado' });

    const body = { ...req.body };
    
    // Detecta el shortId viejo: mu2t10ll
    const oldSlug = existing.Entry_Slug || '';
    const parts = oldSlug.split('-');
    const last = parts[parts.length - 1] || '';
    const hasShortId = /^[a-z0-9]{6,10}$/.test(last) && oldSlug.includes('-');
    
    let base = '';
    if (body.Entry_Slug && String(body.Entry_Slug).trim() && String(body.Entry_Slug) !== 'undefined') {
      base = slugify(body.Entry_Slug);
    } else if (body.Entry_Title) {
      base = slugify(body.Entry_Title);
    } else {
      base = slugify(existing.Entry_Title);
    }

    // Saca cualquier shortId que haya quedado en el base para no duplicar
    base = base.replace(/-[a-z0-9]{6,10}$/, '');

    if (hasShortId) {
      body.Entry_Slug = `${base}-${last}`; // respeta el mu2t10ll viejo
    } else {
      // si no tenia, le crea uno con los ultimos 6 del ObjectId
      body.Entry_Slug = `${base}-${req.params.id.slice(-6).toLowerCase()}`;
    }

    const updated = await Post.findByIdAndUpdate(req.params.id, body, { new: true });
    res.json({ data: updated, post: updated });
  } catch (e) {
    console.error('[PUT v2]', e);
    res.status(500).json({ message: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const Post = getPostModel();
    const { id } = req.params;
    let deleted = mongoose.Types.ObjectId.isValid(id) ? await Post.findByIdAndDelete(id) : await Post.findOneAndDelete({ Entry_Slug: id });
    if (!deleted) return res.status(404).json({ status: 404, message: 'ID no existe', path: req.originalUrl });
    res.json({ ok: true, message: 'Borrado V2', id });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (['search','last','destacada','destacadas','portada','carousel','ultimas','mas-leidas','slugs','slug'].includes(id)) return res.status(404).json({ message: 'Ruta no encontrada' });
    const Post = getPostModel();
    let post = mongoose.Types.ObjectId.isValid(id)? await Post.findById(id).lean() : null;
    if (!post) post = await Post.findOne({ Entry_Slug: id }).lean();
    // fallback: busca por shortId mu2t10ll
    if (!post && /^[a-z0-9]{6,10}$/.test(id)) {
      post = await Post.findOne({ Entry_Slug: { $regex: `-${id}$` } }).lean();
    }
    if (!post) return res.status(404).json({ message: 'No encontrado' });
    res.json({ data: post, post });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

export default router;