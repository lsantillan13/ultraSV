import express from 'express';
import { createRoles } from './libs/initialSetup.js';
import morgan from 'morgan';
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import corteRoutes from './routes/corte.routes.js';
import contentRoutes from './routes/content.routes.js';
import sitemapRoutes from './routes/sitemap.routes.js';
import boletinRoutes from './routes/boletin.routes.js';
import voxRewriteNotes from './routes/v2/vox-rewrite.routes.js';
import rutasRouter from './routes/rutas.routes.js';
import postsV2Router from './routes/posts.v2.routes.js';
import tagsV2Router from './routes/v2/tags.routes.js';
import ttsRouter from './routes/v2/tts.routes.js';
import viewsV2Router from './routes/v2/views.routes.js';
import categoriasRouter from './routes/v2/categorias.routes.js';
import instagramRoutes from './routes/v2/instagram.routes.js';
import { startTrendingCron } from './crons/trending.cron.js';
import { startSitemapPingCron } from './crons/sitemapPing.cron.js';
import axios from 'axios';
import 'dotenv/config'
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const whitelist = [
  'https://voxdiario.com',
  'http://localhost:3000',
  'http://localhost:5173',
];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (whitelist.includes(origin)) return cb(null, true);
    if (process.env.NODE_ENV!== 'production') return cb(null, true);
    return cb(null, true);
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Origin','X-Requested-With','Content-Type','Accept','Authorization','x-access-token','x-auth-token'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(helmet({ crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false }));
app.use(compression());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(morgan('dev'));

// IMPORTANTE PARA IG FRAMES - TIENE QUE IR ANTES DE LAS RUTAS
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use('/public', express.static('public'));

createRoles();
startTrendingCron();
startSitemapPingCron();

// --- ENDPOINTS RADIO ---
app.get('/radio/status', (req, res) => {
  const radio = app.get('radio');
  res.json(radio? radio.getStatus() : { isOnAir: false, listeners: 0 });
});
app.get('/radio/reset', (req, res) => {
  const radio = app.get('radio');
  if(radio) radio.setOff();
  res.json({ ok: true });
});

// 1. FUERZA CANONICA SIN-WWW 301
app.use((req, res, next) => {
  const host = (req.headers.host || '').toLowerCase();
  if (host.startsWith('www.')) {
    return res.redirect(301, `https://voxdiario.com${req.originalUrl}`);
  }
  next();
});

// 2. BOT SEO + JSON-LD
const BOT_REGEX = /facebookexternalhit|Twitterbot|WhatsApp|LinkedInBot|Slackbot|TelegramBot/i;
const SITE_CANONICAL = 'https://voxdiario.com';

function escAttr(str = '') {
  return String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
}
function escHtml(str = '') {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

app.use(async (req, res, next) => {
  const ua = req.headers['user-agent'] || '';
  if (!BOT_REGEX.test(ua)) return next();
  if (req.path.startsWith('/api') || req.path.startsWith('/health') || req.path.startsWith('/sitemap') || req.path.startsWith('/radio') || req.path.startsWith('/feed') || req.path.startsWith('/uploads')) return next();
  if (req.path === '/' || req.path === '/public') return next();

  const slug = req.path.split('/').filter(Boolean).pop();
  if (!slug || slug.length < 3) return next();

  const baseLocal = `http://localhost:${process.env.PORT || 8080}`;
  const tryFetch = async (url) => {
    try {
      const { data } = await axios.get(url, { timeout: 4000 });
      return data?.data || data?.post || data?.posts?.[0] || data;
    } catch { return null; }
  };

  try {
    let post = await tryFetch(`${baseLocal}/api/v2/entradas/${slug}`);
    if (!post?.Entry_Title) post = await tryFetch(`${baseLocal}/api/v2/entradas/slug/${slug}`);
    if (!post?.Entry_Title) return next();

    const title = escAttr(post.Entry_Title);
    const titleHtml = escHtml(post.Entry_Title);
    const desc = escAttr(String(post.Entry_Resume || post.Entry_Title || '').slice(0, 160));
    const image = post.Entry_Featured_Image || `${SITE_CANONICAL}/og-default.jpg`;
    const url = `${SITE_CANONICAL}${req.path}`;
    const published = post.createdAt? new Date(post.createdAt).toISOString() : new Date().toISOString();
    const modified = post.updatedAt? new Date(post.updatedAt).toISOString() : published;

    const jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": post.Entry_Title,
      "description": String(post.Entry_Resume || '').slice(0, 160),
      "image": [image],
      "datePublished": published,
      "dateModified": modified,
      "author": [{ "@type": "Person", "name": post.Entry_Author || "Vox Diario" }],
      "publisher": {
        "@type": "Organization",
        "name": "Vox Diario",
        "logo": { "@type": "ImageObject", "url": `${SITE_CANONICAL}/logo.png` }
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": url }
    });

    res.set('Cache-Control', 'public, max-age=3600');
    return res.status(200).send(`<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"/><title>${title} | Vox Diario</title><meta name="description" content="${desc}"/><link rel="canonical" href="${url}"/><meta property="og:title" content="${title}"/><meta property="og:description" content="${desc}"/><meta property="og:image" content="${image}"/><meta property="og:url" content="${url}"/><meta property="og:type" content="article"/><meta property="og:site_name" content="Vox Diario"/><meta property="article:published_time" content="${published}"/><meta property="article:modified_time" content="${modified}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${title}"/><meta name="twitter:description" content="${desc}"/><meta name="twitter:image" content="${image}"/><script type="application/ld+json">${jsonLd}</script></head><body><h1>${titleHtml}</h1></body></html>`);
  } catch (e) { return next(); }
});

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'ultraserver', uptime: process.uptime(), timestamp: Date.now() }));
app.get('/', (req, res) => res.send(`<h1>VoxDiario API v2 Running</h1>`));

app.use('/', sitemapRoutes);
app.use('/api/v2', sitemapRoutes);

app.use('/api/posts', postRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cortes', corteRoutes);
app.use('/api/boletin', boletinRoutes);
app.use('/api/v2/servicios/rutas', rutasRouter);
app.use('/api/v2/posts', postsV2Router);
app.use('/api/v2/vox-rewrite', voxRewriteNotes);
app.use('/api/v2/entradas', postsV2Router);
app.use('/api/v2/views', viewsV2Router);
app.use('/api/v2/tags', tagsV2Router);
app.use('/api/v2/tts', ttsRouter);
app.use('/api/v2/categorias', categoriasRouter);
app.use('/api/v2/boletin', boletinRoutes);
app.use('/api/v2/instagram', instagramRoutes); // <- IG VIVO CON FRAMES

app.use((req, res) => res.status(404).json({ status: 404, message: 'Ruta no encontrada' }));
app.use((err, req, res, next) => res.status(err.status || 500).json({ status: err.status || 500, message: err.message || 'Error interno' }));

export default app;