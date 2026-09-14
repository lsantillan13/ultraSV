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

// 1. LISTADO - ESTE ES EL QUE USA TU /admin Y TE DABA 404
// GET /api/v2/posts?page=1&limit=50&search=neuquen
// GET /api/v2/entradas?page=1&limit=50&search=neuquen
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

// 2. SEARCH - tu admin lo usa con?search= y con?q=
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
    })
  .sort({ createdAt: -1 })
  .limit(l)
  .lean();

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

router.get('/destacada', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    let post = await Post.findOne({ portada: true }).sort({ updatedAt: -1, createdAt: -1 }).lean();
    if (!post) post = await Post.findOne({}).sort({ createdAt: -1 }).lean();
    res.json({ data: post, version: 'v2' });
  } catch (e) {
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

// 3. ESTE SIEMPRE ULTIMO - si lo pones arriba te rompe /search y /last
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // evita que /search /last caigan acá si alguien cambia el orden
    if (['search','last','destacada','ultimas','mas-leidas','slugs'].includes(id)) {
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