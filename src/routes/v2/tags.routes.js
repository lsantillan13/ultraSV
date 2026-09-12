import { Router } from 'express';
import mongoose from 'mongoose';
const router = Router();

const getPostModel = () => mongoose.models.Post || mongoose.model('Post');

const cache = (req,res,next) => {
  res.set('Cache-Control', 'public, max-age=60, s-maxage=300');
  next();
};

// GET /api/v2/tags - todos los tags con conteo
router.get('/', cache, async (req,res) => {
  try {
    const Post = getPostModel();
    const tags = await Post.aggregate([
      { $unwind: '$Entry_Tags' },
      { $group: { _id: '$Entry_Tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 50 },
      { $project: { tag: '$_id', count: 1, _id: 0 } }
    ]);
    res.json({ data: tags });
  } catch(e){ res.status(500).json({ message: e.message }); }
});

// GET /api/v2/tags/:tag - posts por tag
router.get('/:tag', cache, async (req,res) => {
  try {
    const tag = req.params.tag.toLowerCase().trim();
    const limit = Math.min(parseInt(req.query.limit) || 12, 30);
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const Post = getPostModel();

    const posts = await Post.find({ Entry_Tags: tag })
     .sort({ createdAt: -1 })
     .skip((page-1)*limit)
     .limit(limit)
     .select('Entry_Title Entry_Slug Entry_Featured_Image Entry_Category Entry_Tags createdAt Entry_Body_Resume_Plain readingTime')
     .lean();

    const total = await Post.countDocuments({ Entry_Tags: tag });

    res.json({ data: posts, tag, total, page, pages: Math.ceil(total/limit) });
  } catch(e){ res.status(500).json({ message: e.message }); }
});

export default router;