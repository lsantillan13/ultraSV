import Post from '../models/Post.model.js';

const HOME_FIELDS =
  '_id Entry_Title Entry_Resume Entry_Featured_Image Entry_Category createdAt';

const CATEGORY_FIELDS =
  '_id Entry_Title Entry_Resume Entry_Featured_Image Entry_Category createdAt';

// --- Cache simple en memoria para no matar a Koyeb ---
// 60 segundos de cache, clave = req.originalUrl o nombre del widget
const cache = new Map();
const CACHE_TTL = 60 * 1000; // 60s

function getFromCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { data, ts: Date.now() });
}

// Helper para no repetir el find + portada/noticias
async function getWidget(category, limit = 3) {
  const cacheKey = `widget:${category}:${limit}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const posts = await Post.find({ Entry_Category: category })
    .select(CATEGORY_FIELDS)
    .sort({ createdAt: -1 })
    .limit(limit)
    .maxTimeMS(5000)
    .lean();

  const result = {
    portada: posts[0] || null,
    noticias: posts.slice(1)
  };
  setCache(cacheKey, result);
  return result;
}

async function getCategoryList(category, limit = 12, cacheKey) {
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const posts = await Post.find({ Entry_Category: category })
    .select(CATEGORY_FIELDS)
    .sort({ createdAt: -1 })
    .limit(limit)
    .maxTimeMS(5000)
    .lean();

  setCache(cacheKey, posts);
  return posts;
}

/**
 * Últimas 5 publicaciones
 * GET /api/content/carousel
 */
export const getLastFivePosts = async (req, res) => {
  try {
    const key = 'carousel';
    const cached = getFromCache(key);
    if (cached) return res.json(cached);

    const posts = await Post.find()
      .select(HOME_FIELDS)
      .sort({ createdAt: -1 })
      .limit(5)
      .maxTimeMS(5000)
      .lean();

    setCache(key, posts);
    res.json(posts);
  } catch (error) {
    console.error('[API] getLastFivePosts:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Publicaciones 6 a 13
 * GET /api/content/component
 */
export const getNextEightPosts = async (req, res) => {
  try {
    const key = 'component';
    const cached = getFromCache(key);
    if (cached) return res.json(cached);

    const posts = await Post.find()
      .select(HOME_FIELDS)
      .sort({ createdAt: -1 })
      .skip(5)
      .limit(8)
      .maxTimeMS(5000)
      .lean();

    setCache(key, posts);
    res.json(posts);
  } catch (error) {
    console.error('[API] getNextEightPosts:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Widget Política
 * GET /api/content/widgetP
 */
export const getPoliticalPosts = async (req, res) => {
  try {
    const data = await getWidget('Política', 3);
    res.json(data);
  } catch (error) {
    console.error('[API] getPoliticalPosts:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Widget Economía
 * GET /api/content/widgetE
 */
export const getEconomicPosts = async (req, res) => {
  try {
    const data = await getWidget('Economía', 3);
    res.json(data);
  } catch (error) {
    console.error('[API] getEconomicPosts:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Widget Sociedad
 * GET /api/content/widgetS
 */
export const getSocialPosts = async (req, res) => {
  try {
    const data = await getWidget('Sociedad', 3);
    res.json(data);
  } catch (error) {
    console.error('[API] getSocialPosts:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Policiales
 * GET /api/content/policiales
 */
export const getPolicePosts = async (req, res) => {
  try {
    const posts = await getCategoryList('Policiales', 12, 'policiales');
    res.json(posts);
  } catch (error) {
    console.error('[API] getPolicePosts:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Deportes
 * GET /api/content/deportes
 */
export const getSportsPosts = async (req, res) => {
  try {
    const posts = await getCategoryList('Deportes', 12, 'deportes');
    res.json(posts);
  } catch (error) {
    console.error('[API] getSportsPosts:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Tecnología
 * GET /api/content/tecnologia
 */
export const getTechnologyPosts = async (req, res) => {
  try {
    const posts = await getCategoryList('Tecnología', 12, 'tecnologia');
    res.json(posts);
  } catch (error) {
    console.error('[API] getTechnologyPosts:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Últimas noticias
 * GET /api/content/last
 */
export const getLast = async (req, res) => {
  try {
    const key = 'last';
    const cached = getFromCache(key);
    if (cached) return res.json(cached);

    const posts = await Post.find()
      .select(HOME_FIELDS)
      .sort({ createdAt: -1 })
      .limit(16)
      .maxTimeMS(5000)
      .lean();

    setCache(key, posts);
    res.json(posts);
  } catch (error) {
    console.error('[API] getLast:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Obtener publicación por ID
 * GET /api/content/:id
 */
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).maxTimeMS(5000).lean();

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('[API] getPostById:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Últimas publicaciones de una categoría
 * GET /api/content/buscar/:category
 */
export const getLatestPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
    const cacheKey = `buscar:${category}:${limit}`;

    const cached = getFromCache(cacheKey);
    if (cached) return res.json(cached);

    const posts = await Post.find({ Entry_Category: category })
      .select(CATEGORY_FIELDS)
      .sort({ createdAt: -1 })
      .limit(limit)
      .maxTimeMS(5000)
      .lean();

    setCache(cacheKey, posts);
    res.json(posts);
  } catch (error) {
    console.error('[API] getLatestPostsByCategory:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Publicaciones relacionadas
 * GET /api/content/:category/related-post/:postId
 */
export const getRelatedPost = async (req, res) => {
  const { category, postId } = req.params;
  try {
    const cacheKey = `related:${category}:${postId}`;
    const cached = getFromCache(cacheKey);
    if (cached) return res.json(cached);

    const posts = await Post.find({
      Entry_Category: category,
      _id: { $ne: postId }
    })
      .select(CATEGORY_FIELDS)
      .sort({ createdAt: -1 })
      .limit(4)
      .maxTimeMS(5000)
      .lean();

    setCache(cacheKey, posts);
    res.json(posts);
  } catch (error) {
    console.error('[API] getRelatedPost:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Streaming
 * GET /api/content/getStreaming
 */
export const getStreaming = async (req, res) => {
  try {
    const posts = await getCategoryList('Streaming', 12, 'streaming');
    res.json(posts);
  } catch (error) {
    console.error('[API] getStreaming:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Emprender
 * GET /api/content/getEmprender
 */
export const getEmprender = async (req, res) => {
  try {
    const posts = await getCategoryList('Emprender', 12, 'emprender');
    res.json(posts);
  } catch (error) {
    console.error('[API] getEmprender:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Espectáculos
 * GET /api/content/getEspectaculos
 */
export const getEspectaculos = async (req, res) => {
  try {
    const posts = await getCategoryList('Espectáculos', 12, 'espectaculos');
    res.json(posts);
  } catch (error) {
    console.error('[API] getEspectaculos:', error);
    res.status(500).json({ message: error.message });
  }
};
