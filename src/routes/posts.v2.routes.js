import { Router } from 'express';
import mongoose from 'mongoose';
const router = Router();

const cacheV2 = (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=30, s-maxage=120');
  next();
};

// helper para obtener el modelo sin importar path
const getPostModel = () => {
  // prueba todos los nombres posibles que usaste
  return mongoose.models.Post || mongoose.models.post || mongoose.model('Post');
};

// GET /api/v2/posts/destacada
router.get('/destacada', cacheV2, async (req, res) => {
  try {
    const Post = getPostModel();
    let post = await Post.findOne({ portada: true }).sort({ updatedAt: -1, createdAt: -1 }).lean();
    if (!post) {
      post = await Post.findOne({}).sort({ createdAt: -1 }).lean();
    }
    res.json({ data: post, version: 'v2' });
  } catch (e) {
    console.error('[v2 destacada]', e);
    res.status(500).json({ message: e.message });
  }
});

router.get('/slugs', async (req, res) => {
  const Post = mongoose.models.Post || mongoose.model('Post');
  const posts = await Post.find({}).select('Entry_Title Entry_Slug').sort({createdAt: -1}).limit(20).lean();
  res.json(posts);
});

// GET /api/v2/posts/mas-leidas
router.get('/mas-leidas', cacheV2, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 5, 10);
    const Post = getPostModel();
    // si no tenés campo views, ordena por createdAt, no rompe
    const sort = Post.schema.path('views') ? { views: -1, createdAt: -1 } : { createdAt: -1 };
    const posts = await Post.find({}).sort(sort).limit(limit).lean();
    res.json({ data: posts, version: 'v2', total: posts.length });
  } catch (e) {
    console.error('[v2 mas-leidas]', e);
    res.status(500).json({ message: e.message });
  }
});

// GET /api/v2/posts/ultimas
router.get('/ultimas', cacheV2, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 12, 30);
    const Post = getPostModel();
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(limit).lean();
    res.json({ data: posts, version: 'v2' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;