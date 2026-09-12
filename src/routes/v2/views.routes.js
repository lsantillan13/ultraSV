import { Router } from 'express';
import mongoose from 'mongoose';
import NodeCache from 'node-cache';

const router = Router();

// cache en memoria para no contar 2 veces la misma IP en 5 min
const ipCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

const getPostModel = () => mongoose.models.Post || mongoose.model('Post');

// POST /api/v2/views/:slug/view - incrementa views real con anti-spam
router.post('/:slug/view', async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) return res.status(400).json({ ok: false });

    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'unknown';
    const key = `${slug}:${ip}`;

    if (ipCache.get(key)) {
      return res.json({ ok: true, cached: true });
    }

    const Post = getPostModel();

    const result = await Post.updateOne(
      { $or: [{ Entry_Slug: slug }, { _id: mongoose.Types.ObjectId.isValid(slug)? slug : null }] },
      {
        $inc: {
          views: 1,
          views24h: 1,
          views7d: 1,
          trendingScore: 2
        },
        $set: { lastViewedAt: new Date() }
      }
    );

    ipCache.set(key, true);
    res.json({ ok: true, modified: result.modifiedCount });
  } catch (e) {
    console.error('[VIEWS]', e);
    res.status(500).json({ ok: false, message: e.message });
  }
});

// GET /api/v2/views/trending - mas leidas reales (solo ultimas 72hs con views)
router.get('/trending', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 30);
    const Post = getPostModel();
    const since = new Date(Date.now() - 72 * 60 * 60 * 1000);

    const posts = await Post.find({
      $or: [
        { lastViewedAt: { $gte: since } },
        { createdAt: { $gte: since } }
      ],
      views24h: { $gt: 0 }
    })
    .sort({ trendingScore: -1, views24h: -1 })
    .limit(limit)
    .select('Entry_Title Entry_Slug Entry_Featured_Image Entry_Category views views24h trendingScore createdAt lastViewedAt')
    .lean();

    // fallback: si no hay nada en 72hs (ej domingo a la mañana), trae top 10 general
    if (posts.length === 0) {
      const fallback = await Post.find({ views: { $gt: 0 } })
       .sort({ views7d: -1, views: -1 })
       .limit(limit)
       .select('Entry_Title Entry_Slug Entry_Featured_Image Entry_Category views views24h trendingScore createdAt')
       .lean();
      return res.json({ data: fallback, fallback: true });
    }

    res.json({ data: posts, fallback: false });
  } catch (e) {
    console.error('[TRENDING]', e);
    res.status(500).json({ message: e.message });
  }
});

// GET /api/v2/views/stats/:slug - ver stats de una nota
router.get('/stats/:slug', async (req, res) => {
  try {
    const Post = getPostModel();
    const post = await Post.findOne({ Entry_Slug: req.params.slug })
    .select('Entry_Title views views24h views7d trendingScore lastViewedAt')
    .lean();
    if (!post) return res.status(404).json({ message: 'No encontrado' });
    res.json({ data: post });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;