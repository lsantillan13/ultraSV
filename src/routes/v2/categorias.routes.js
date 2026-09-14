import { Router } from 'express';
import mongoose from 'mongoose';
const router = Router();
const getPostModel = () => mongoose.models.Post || mongoose.model('Post');

const CATEGORIAS = [
  { slug: 'anticipacion-politica', label: 'Anticipación Política', grupo: 'POLÍTICA Y ACTUALIDAD' },
  { slug: 'politica', label: 'Política', grupo: 'POLÍTICA Y ACTUALIDAD' },
  { slug: 'internacionales', label: 'Internacionales', grupo: 'POLÍTICA Y ACTUALIDAD' },
  { slug: 'policiales', label: 'Policiales', grupo: 'POLICIAL / JUDICIAL' },
  { slug: 'judiciales', label: 'Judiciales', grupo: 'POLICIAL / JUDICIAL' },
  { slug: 'seguridad', label: 'Seguridad', grupo: 'POLICIAL / JUDICIAL' },
  { slug: 'sociedad', label: 'Sociedad', grupo: 'NEUQUÉN' },
  { slug: 'ciudad', label: 'Ciudad', grupo: 'NEUQUÉN' },
  { slug: 'region', label: 'Región', grupo: 'NEUQUÉN' },
  { slug: 'infraestructura', label: 'Infraestructura', grupo: 'NEUQUÉN' },
  { slug: 'obras', label: 'Obras', grupo: 'NEUQUÉN' },
  { slug: 'rutas', label: 'Rutas', grupo: 'NEUQUÉN' },
  { slug: 'transito-y-transporte', label: 'Tránsito y Transporte', grupo: 'NEUQUÉN' },
  { slug: 'clima', label: 'Clima', grupo: 'NEUQUÉN' },
  { slug: 'cooperativas', label: 'Cooperativas', grupo: 'NEUQUÉN' },
  { slug: 'vivienda-y-habitat', label: 'Vivienda y Hábitat', grupo: 'NEUQUÉN' },
  { slug: 'inmobiliarias', label: 'Inmobiliarias', grupo: 'NEUQUÉN' },
  { slug: 'economia', label: 'Economía', grupo: 'ECONOMÍA' },
  { slug: 'emprender', label: 'Emprender', grupo: 'ECONOMÍA' },
  { slug: 'vaca-muerta', label: 'Vaca Muerta', grupo: 'ECONOMÍA' },
  { slug: 'energia', label: 'Energía', grupo: 'ECONOMÍA' },
  { slug: 'campo-y-produccion', label: 'Campo y Producción', grupo: 'ECONOMÍA' },
  { slug: 'trabajo', label: 'Trabajo', grupo: 'ECONOMÍA' },
  { slug: 'gremiales', label: 'Gremiales', grupo: 'ECONOMÍA' },
  { slug: 'jubilados-y-anses', label: 'Jubilados y ANSES', grupo: 'ECONOMÍA' },
  { slug: 'salud', label: 'Salud', grupo: 'SERVICIO' },
  { slug: 'educacion', label: 'Educación', grupo: 'SERVICIO' },
  { slug: 'ciencia-y-tecnologia', label: 'Ciencia y Tecnología', grupo: 'SERVICIO' },
  { slug: 'tecnologia', label: 'Tecnología', grupo: 'SERVICIO' },
  { slug: 'servicio-feriados', label: 'Servicio / Feriados', grupo: 'SERVICIO' },
  { slug: 'loteria-y-quiniela', label: 'Lotería y Quiniela', grupo: 'SERVICIO' },
  { slug: 'deportes', label: 'Deportes', grupo: 'DEPORTES' },
  { slug: 'deporte-local', label: 'Deporte Local', grupo: 'DEPORTES' },
  { slug: 'gaming-y-esports', label: 'Gaming y Esports', grupo: 'DEPORTES' },
  { slug: 'espectaculos', label: 'Espectáculos', grupo: 'CULTURA Y SHOW' },
  { slug: 'los40', label: 'Los40', grupo: 'CULTURA Y SHOW' },
  { slug: 'streaming', label: 'Streaming', grupo: 'CULTURA Y SHOW' },
  { slug: 'cultura', label: 'Cultura', grupo: 'CULTURA Y SHOW' },
  { slug: 'redes', label: 'Redes', grupo: 'CULTURA Y SHOW' },
  { slug: 'agenda', label: 'Agenda', grupo: 'CULTURA Y SHOW' },
  { slug: 'lifestyle', label: 'Lifestyle', grupo: 'ESTILO DE VIDA' },
  { slug: 'gastronomia', label: 'Gastronomía', grupo: 'ESTILO DE VIDA' },
  { slug: 'turismo', label: 'Turismo', grupo: 'ESTILO DE VIDA' },
  { slug: 'ambiente', label: 'Ambiente', grupo: 'ESTILO DE VIDA' },
  { slug: 'mascotas', label: 'Mascotas', grupo: 'ESTILO DE VIDA' },
  { slug: 'genero-y-diversidad', label: 'Género y Diversidad', grupo: 'ESTILO DE VIDA' },
  { slug: 'institucional', label: 'Institucional', grupo: 'INSTITUCIONAL' },
];

router.get('/', async (req, res) => {
  try {
    const Post = getPostModel();
    const counts = await Post.aggregate([
      { $group: { _id: "$Entry_Category", total: { $sum: 1 } } }
    ]);
    const mapCount = Object.fromEntries(counts.map(c => [c._id, c.total]));
    const data = CATEGORIAS.map(cat => ({
      ...cat,
      total: mapCount[cat.slug] || 0,
      value: cat.slug
    }));
    res.set('Cache-Control', 'public, max-age=60, s-maxage=300');
    res.json({ data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const Post = getPostModel();
    const slug = req.params.slug.toLowerCase();
    const cat = CATEGORIAS.find(c => c.slug === slug);
    if (!cat) return res.status(404).json({ message: 'Categoria no existe', disponibles: CATEGORIAS.map(c=>c.slug) });
    
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    
    const [posts, total] = await Promise.all([
      Post.find({ Entry_Category: slug })
        .sort({ createdAt: -1 })
        .skip((page-1)*limit)
        .limit(limit)
        .select('Entry_Title Entry_Slug Entry_Category Entry_Featured_Image Entry_Resume Entry_ID createdAt views trendingScore')
        .lean(),
      Post.countDocuments({ Entry_Category: slug })
    ]);

    res.set('Cache-Control', 'public, max-age=30, s-maxage=120');
    res.json({ 
      categoria: cat, 
      data: posts,
      pagination: { page, limit, total, pages: Math.ceil(total/limit) }
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;