import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();
const getPostModel = () => mongoose.models.Post || mongoose.model('Post');

const normalize = (str = '') =>
  decodeURIComponent(str || '')
   .toLowerCase()
   .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
   .replace(/\s+/g, '-')
   .trim();

// MAPEO REAL -> como está en tu DB o como queremos buscarlo
const CATEGORIAS_CONFIG = {
  'politica': { type: 'category', value: 'Política', search: 'politica' },
  'infraestructura': { type: 'tag_or_search', value: 'infraestructura', search: 'infraestructura' },
  'sociedad': { type: 'category', value: 'Sociedad', search: 'sociedad' },
  'economia': { type: 'category', value: 'Economía', search: 'economia' },
  'vaca-muerta': { type: 'tag_or_search', value: 'vaca muerta', search: 'vaca muerta' },
  'federal-a': { type: 'tag_or_search', value: 'federal a', search: 'federal a' },
  'lifune': { type: 'tag_or_search', value: 'lifune', search: 'lifune' },
  'rugby': { type: 'tag_or_search', value: 'rugby', search: 'rugby' },
  'voley': { type: 'tag_or_search', value: 'voley', search: 'voley' },
  'policiales': { type: 'category', value: 'Policiales', search: 'policiales' },
  'deportes': { type: 'category', value: 'Deportes', search: 'deportes' },
};

const buildFilter = (config) => {
  if (config.type === 'category') {
    // Con collation strength 1, esto matchea Politica, Política, politica, POLITICA
    return { Entry_Category: config.search };
  }
  // tag_or_search -> busca en tags, titulo y categoria
  if (config.type === 'tag_or_search') {
    const v = config.search;
    return {
      $or: [
        { Entry_Tags: { $regex: v, $options: 'i' } },
        { Entry_Category: { $regex: v, $options: 'i' } },
        { Entry_Title: { $regex: v, $options: 'i' } },
      ]
    };
  }
  return {};
};

// GET /api/v2/categorias -> debug, te dice cuantas tenes por cada una MERGEADO
router.get('/', async (req, res) => {
  try {
    const Post = getPostModel();

    // distinct real
    const distinctCats = await Post.distinct('Entry_Category');

    // counts mergeando con normalize para que Economia + Economía se sumen
    const all = await Post.aggregate([
      { $group: { _id: "$Entry_Category", count: { $sum: 1 } } }
    ]);

    const merged = new Map();
    for (const { _id, count } of all) {
      if (!_id) continue;
      const slug = normalize(_id);
      const current = merged.get(slug) || { slug, count: 0, queries: [] };
      current.count += count;
      current.queries.push(_id);
      merged.set(slug, current);
    }

    const counts = await Promise.all(
      Object.entries(CATEGORIAS_CONFIG).map(async ([slug, cfg]) => {
        const c = await Post.countDocuments(buildFilter(cfg))
         .collation({ locale: 'es', strength: 1 });
        return { slug, query: cfg.value, count: c };
      })
    );

    res.json({ counts: counts.sort((a,b) => b.count - a.count), distinctCats, merged: Array.from(merged.values()) });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET /api/v2/categorias/:slug -> trae 20 de esa categoria
router.get('/:slug', async (req, res) => {
  try {
    const Post = getPostModel();
    const rawSlug = req.params.slug;
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);

    // ESTO ARREGLA /política -> /politica
    const key = normalize(rawSlug);

    const config = CATEGORIAS_CONFIG[key];

    if (!config) {
      return res.status(404).json({
        message: `Categoria ${rawSlug} (${key}) no configurada`,
        disponibles: Object.keys(CATEGORIAS_CONFIG)
      });
    }

    const filter = buildFilter(config);

    const posts = await Post.find(filter)
     .collation({ locale: 'es', strength: 1 }) // ignora tildes y mayusculas
     .sort({ createdAt: -1 })
     .limit(limit)
     .select('Entry_Title Entry_Slug Entry_Category Entry_Featured_Image Entry_Resume Entry_ID Entry_Tags createdAt')
     .lean();

    res.json({
      category: key, // siempre sin tilde
      realQuery: config.value, // con tilde para mostrar en front
      count: posts.length,
      data: posts
    });
  } catch (e) {
    console.error('[CATEGORIAS]', e);
    res.status(500).json({ message: e.message });
  }
});

export default router;