import Post from '../models/Post.model.js';

// --- OPTIMIZADO ---
export const getPosts = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const skip = (page - 1) * limit;
    const category = req.query.category;

    const filter = {};
    if (category) filter.Entry_Category = category;

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .select('Entry_Title Entry_Resume Entry_Featured_Image Entry_Category createdAt updatedAt')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments(filter)
    ]);

    res.json({ posts, pagination: { total, page, limit, pages: Math.ceil(total / limit) } });
  } catch (error) {
    console.error('[getPosts]', error);
    res.status(500).json({ error: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).lean();
    if (!post) return res.status(404).json({ message: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- DEJA TUS FUNCIONES ORIGINALES ABAJO, SOLO ASEGURATE QUE NO HAYA OTRO import Post ---
export const createPost = async (req, res) => {
  try {
    const { Entry_Title, Entry_Resume, Entry_Body, Entry_Featured_Image, Entry_Category } = req.body;
    const newPost = new Post({ Entry_Title, Entry_Resume, Entry_Body, Entry_Featured_Image, Entry_Category });
    const saved = await newPost.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePostById = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePostById = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
