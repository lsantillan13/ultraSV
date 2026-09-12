import Post from '../models/Post.model.js';

const HOME_FIELDS = '_id Entry_Title Entry_Resume Entry_Featured_Image Entry_Category createdAt Entry_Is_Portada Entry_Portada_At';
const CATEGORY_FIELDS = '_id Entry_Title Entry_Resume Entry_Featured_Image Entry_Category createdAt';

const cache = new Map();
const CACHE_TTL = 60 * 1000;

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
function clearHomeCache() {
  cache.delete('carousel');
  cache.delete('component');
}

async function getWidget(category, limit = 3) {
  const cleanCategory = String(category || '').trim();
  const cacheKey = `widget:${cleanCategory}:${limit}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const posts = await Post.find({ Entry_Category: cleanCategory })
  .select(CATEGORY_FIELDS)
  .sort({ createdAt: -1 })
  .limit(limit)
  .maxTimeMS(5000)
  .lean();

  const result = { portada: posts[0] || null, noticias: posts.slice(1) };
  setCache(cacheKey, result);
  return result;
}

async function getCategoryList(category, limit = 12, cacheKey) {
  const cached = getFromCache(cacheKey);
  if (cached) return cached;
  const cleanCategory = String(category).trim();
  const posts = await Post.find({ Entry_Category: cleanCategory })
  .select(CATEGORY_FIELDS)
  .sort({ createdAt: -1 })
  .limit(limit)
  .maxTimeMS(5000)
  .lean();
  setCache(cacheKey, posts);
  return posts;
}

// --- HOME: CAROUSEL CON PORTADA FIJA ---
export const getLastFivePosts = async (req, res) => {
  try {
    const key = 'carousel';
    const cached = getFromCache(key);
    if (cached) return res.json(cached);

    // 1. busca portada activa
    const portada = await Post.findOne({ Entry_Is_Portada: true })
     .select(HOME_FIELDS)
     .sort({ Entry_Portada_At: -1 })
     .lean();

    // 2. busca el resto excluyendo portada
    const excludeIds = portada? [portada._id] : [];
    const limitRest = portada? 4 : 5;

    const rest = await Post.find({ _id: { $nin: excludeIds } })
     .select(HOME_FIELDS)
     .sort({ createdAt: -1 })
     .limit(limitRest)
     .maxTimeMS(5000)
     .lean();

    const final = portada? [portada,...rest] : rest;

    setCache(key, final);
    res.json(final);
  } catch (error) { console.error('[API] getLastFivePosts:', error); res.status(500).json({ message: error.message }); }
};

// --- HOME: ULTIMAS EXCLUYENDO CAROUSEL ---
export const getNextEightPosts = async (req, res) => {
  try {
    const key = 'component';
    const cached = getFromCache(key);
    if (cached) return res.json(cached);

    // obtenemos los IDs del carousel para excluirlos
    const portada = await Post.findOne({ Entry_Is_Portada: true }).select('_id').lean();
    const restIds = await Post.find({ _id: { $nin: portada? [portada._id] : [] } })
     .sort({ createdAt: -1 }).limit(portada? 4 : 5).select('_id').lean();

    const carouselIds = [...(portada? [portada._id] : []),...restIds.map(r=>r._id)];

    const posts = await Post.find({ _id: { $nin: carouselIds } })
     .select(HOME_FIELDS)
     .sort({ createdAt: -1 })
     .limit(8)
     .maxTimeMS(5000)
     .lean();

    setCache(key, posts);
    res.json(posts);
  } catch (error) { console.error('[API] getNextEightPosts:', error); res.status(500).json({ message: error.message }); }
};

// --- ADMIN: SETEAR PORTADA ---
export const setPortada = async (req, res) => {
  try {
    const { id } = req.params;

    // saca todas las portadas anteriores (solo 1 a la vez)
    await Post.updateMany({ Entry_Is_Portada: true }, {
      $set: { Entry_Is_Portada: false, Entry_Portada_At: null }
    });

    const updated = await Post.findByIdAndUpdate(id, {
      $set: { Entry_Is_Portada: true, Entry_Portada_At: new Date() }
    }, { new: true }).select(HOME_FIELDS);

    if (!updated) return res.status(404).json({ message: 'Post not found' });

    clearHomeCache();
    res.json({ message: 'Portada actualizada', post: updated });
  } catch (error) {
    console.error('[API] setPortada:', error);
    res.status(500).json({ message: error.message });
  }
};

export const removePortada = async (req, res) => {
  try {
    await Post.updateMany({ Entry_Is_Portada: true }, {
      $set: { Entry_Is_Portada: false, Entry_Portada_At: null }
    });
    clearHomeCache();
    res.json({ message: 'Portada removida, vuelve a modo automático' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- RESTO DE TUS CONTROLLERS (igual que tenías) ---
export const getPoliticalPosts = async (req, res) => {
  try { res.json(await getWidget('Política', 3)); }
  catch (error) { console.error('[API] getPoliticalPosts:', error); res.status(500).json({ message: error.message }); }
};
export const getEconomicPosts = async (req, res) => {
  try { res.json(await getWidget('Economía', 3)); }
  catch (error) { console.error('[API] getEconomicPosts:', error); res.status(500).json({ message: error.message }); }
};
export const getSocialPosts = async (req, res) => {
  try { res.json(await getWidget('Sociedad', 3)); }
  catch (error) { console.error('[API] getSocialPosts:', error); res.status(500).json({ message: error.message }); }
};

export const getPolicePosts = async (req, res) => {
  try { res.json(await getCategoryList('Policiales', 12, 'policiales')); }
  catch (error) { console.error('[API] getPolicePosts:', error); res.status(500).json({ message: error.message }); }
};
export const getSportsPosts = async (req, res) => {
  try { res.json(await getCategoryList('Deportes', 12, 'deportes')); }
  catch (error) { console.error('[API] getSportsPosts:', error); res.status(500).json({ message: error.message }); }
};
export const getTechnologyPosts = async (req, res) => {
  try { res.json(await getCategoryList('Tecnología', 12, 'tecnologia')); }
  catch (error) { console.error('[API] getTechnologyPosts:', error); res.status(500).json({ message: error.message }); }
};

export const getLast = async (req, res) => {
  try {
    const key = 'last';
    const cached = getFromCache(key);
    if (cached) return res.json(cached);
    const posts = await Post.find().select(HOME_FIELDS).sort({ createdAt: -1 }).limit(16).maxTimeMS(5000).lean();
    setCache(key, posts);
    res.json(posts);
  } catch (error) { console.error('[API] getLast:', error); res.status(500).json({ message: error.message }); }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.length < 10) return res.status(400).json({ message: 'ID inválido' });
    const post = await Post.findById(id).maxTimeMS(5000).lean();
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) { console.error('[API] getPostById:', error); res.status(500).json({ message: error.message }); }
};

export const getLatestPostsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const cleanCategory = String(category || '').trim();
    if (!cleanCategory) return res.status(400).json({ message: 'Categoría requerida' });

    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
    const cacheKey = `buscar:${cleanCategory}:${limit}`;
    const cached = getFromCache(cacheKey);
    if (cached) return res.json(cached);

    const posts = await Post.find({ Entry_Category: cleanCategory })
    .select(CATEGORY_FIELDS)
    .sort({ createdAt: -1 })
    .limit(limit)
    .maxTimeMS(5000)
    .lean();

    setCache(cacheKey, posts);
    res.json(posts);
  } catch (error) { console.error('[API] getLatestPostsByCategory:', error); res.status(500).json({ message: error.message }); }
};

export const getRelatedPost = async (req, res) => {
  try {
    const { category, postId } = req.params;
    const cleanCategory = String(category || '').trim();
    if (!cleanCategory ||!postId) return res.status(400).json({ message: 'Parámetros inválidos' });

    const cacheKey = `related:${cleanCategory}:${postId}`;
    const cached = getFromCache(cacheKey);
    if (cached) return res.json(cached);

    const posts = await Post.find({ Entry_Category: cleanCategory, _id: { $ne: postId } })
    .select(CATEGORY_FIELDS)
    .sort({ createdAt: -1 })
    .limit(4)
    .maxTimeMS(5000)
    .lean();

    setCache(cacheKey, posts);
    res.json(posts);
  } catch (error) { console.error('[API] getRelatedPost:', error); res.status(500).json({ message: error.message }); }
};

export const getStreaming = async (req, res) => {
  try { res.json(await getCategoryList('Streaming', 12, 'streaming')); }
  catch (error) { console.error('[API] getStreaming:', error); res.status(500).json({ message: error.message }); }
};
export const getEmprender = async (req, res) => {
  try { res.json(await getCategoryList('Emprender', 12, 'emprender')); }
  catch (error) { console.error('[API] getEmprender:', error); res.status(500).json({ message: error.message }); }
};
export const getEspectaculos = async (req, res) => {
  try { res.json(await getCategoryList('Espectáculos', 12, 'espectaculos')); }
  catch (error) { console.error('[API] getEspectaculos:', error); res.status(500).json({ message: error.message }); }
};
export const getDeportes = async (req, res) => {
  try { res.json(await getCategoryList('Deportes', 12, 'deportes')); }
  catch (error) { console.error('[API] getDeportes:', error); res.status(500).json({ message: error.message }); }
};
export const getTecnologia = async (req, res) => {
  try { res.json(await getCategoryList('Tecnología', 12, 'tecnologia')); }
  catch (error) { console.error('[API] getTecnologia:', error); res.status(500).json({ message: error.message }); }
};
export const getCultura = async (req, res) => {
  try { res.json(await getCategoryList('Cultura', 12, 'cultura')); }
  catch (error) { console.error('[API] getCultura:', error); res.status(500).json({ message: error.message }); }
};
export const getPolitica = async (req, res) => {
  try { res.json(await getCategoryList('Política', 12, 'politica')); }
  catch (error) { console.error('[API] getPolitica:', error); res.status(500).json({ message: error.message }); }
};
export const getSalud = async (req, res) => {
  try { res.json(await getCategoryList('Salud', 12, 'salud')); }
  catch (error) { console.error('[API] getSalud:', error); res.status(500).json({ message: error.message }); }
};
export const getEducacion = async (req, res) => {
  try { res.json(await getCategoryList('Educación', 12, 'educacion')); }
  catch (error) { console.error('[API] getEducacion:', error); res.status(500).json({ message: error.message }); }
};
export const getViajes = async (req, res) => {
  try { res.json(await getCategoryList('Viajes', 12, 'viajes')); }
  catch (error) { console.error('[API] getViajes:', error); res.status(500).json({ message: error.message }); }
};
export const getGastronomia = async (req, res) => {
  try { res.json(await getCategoryList('Gastronomía', 12, 'gastronomia')); }
  catch (error) { console.error('[API] getGastronomia:', error); res.status(500).json({ message: error.message }); }
};