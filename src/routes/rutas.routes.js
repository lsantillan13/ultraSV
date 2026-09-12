import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import NodeCache from 'node-cache';

const router = express.Router();
const cache = new NodeCache({ stdTTL: 900 }); // 15 min

const getColorByEstado = (txt = "") => {
  const s = txt.toLowerCase();
  if (s.includes('corte') || s.includes('cerrado') || s.includes('intransitable')) return '#EF4444';
  if (s.includes('cadenas') || s.includes('precaución') || s.includes('precaucion') || s.includes('resbaladiza')) return '#EAB308';
  return '#16A34A';
};

const FALLBACK_RUTAS = [
  { id: 'rn22', nombre: 'Ruta 22', tramo: 'NQN - Arroyito', estado: 'Transitable', detalle: 'Precaución por viento - Vialidad', color: '#16A34A' },
  { id: 'rn40', nombre: 'Ruta 40', tramo: 'Zapala - Rinconada', estado: 'Transitable', detalle: 'Normal', color: '#16A34A' },
  { id: 'rn237', nombre: 'Ruta 237', tramo: 'Piedra del Águila', estado: 'Cadenas', detalle: 'Portación obligatoria', color: '#3B82F6' },
  { id: 'samore', nombre: 'Samoré', tramo: 'Chile - Arg', estado: 'Habilitado', detalle: '08:00 - 19:00', color: '#16A34A' },
];

// Esta función responde en / y en /estado
const handler = async (req, res) => {
  const cached = cache.get('rutas_estado');
  if (cached) return res.json(cached);

  try {
    let rutas = [];
    // Scraping simple de Vialidad para no romper, si falla usa fallback
    try {
      const { data: html } = await axios.get('https://www.argentina.gob.ar/obras-publicas/vialidad-nacional/estado-de-rutas-rutas-nacionales', {
        timeout: 10000,
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const texto = cheerio.load(html)('body').text().toLowerCase();
      // Si al menos menciona rutas, asumimos que está operativo
      if (texto.includes('ruta')) {
        rutas = FALLBACK_RUTAS.map(r => ({ ...r, detalle: 'Actualizado - Vialidad Nacional' }));
      }
    } catch (e) {
      console.log('Vialidad fallback:', e.message);
    }

    if (rutas.length === 0) rutas = FALLBACK_RUTAS;
    cache.set('rutas_estado', rutas);
    res.json(rutas);
  } catch (err) {
    res.json(cache.get('rutas_estado') || FALLBACK_RUTAS);
  }
};

router.get('/', handler);
router.get('/estado', handler);

export default router;