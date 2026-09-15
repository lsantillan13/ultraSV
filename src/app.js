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
import rutasRouter from './routes/rutas.routes.js';
import postsV2Router from './routes/posts.v2.routes.js';
import tagsV2Router from './routes/v2/tags.routes.js';
import ttsRouter from './routes/v2/tts.routes.js';
import viewsV2Router from './routes/v2/views.routes.js';
import categoriasRouter from './routes/v2/categorias.routes.js';
import { startTrendingCron } from './crons/trending.cron.js';
import axios from 'axios';

import 'dotenv/config'
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

const app = express();

const whitelist = [
  'https://voxdiario.com',
  'https://www.voxdiario.com',
  'https://voxdiario.com.ar',
  'https://www.voxdiario.com.ar',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:8080',
  'http://192.168.100.11:3000',
  'http://192.168.100.11:8080'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (whitelist.includes(origin)) return callback(null, true);
    if (origin.includes('google') || origin.includes('bing') || origin.includes('facebook')) {
      return callback(null, true);
    }
    console.warn(`CORS: Origin no listado pero permitido: ${origin}`);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Origin','X-Requested-With','Content-Type','Accept','Authorization','x-access-token','x-auth-token'],
  exposedHeaders: ['x-access-token', 'Authorization'],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(helmet({ crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false }));
app.use(compression());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(morgan('dev'));

createRoles();
startTrendingCron();

// ========== FIX SEO BOTS PARA WHATSAPP / FB ==========
const BOT_REGEX = /facebookexternalhit|Twitterbot|WhatsApp|LinkedInBot|Slackbot|TelegramBot|Googlebot|bingbot/i;
const SITE_CANONICAL = 'https://voxdiario.com';

app.use(async (req, res, next) => {
  const ua = req.headers['user-agent'] || '';
  if (!BOT_REGEX.test(ua)) return next();

  // Solo nos interesan rutas tipo /region/slug-de-nota o /politica/slug
  // No interferir con /api/*
  if (req.path.startsWith('/api') || req.path.startsWith('/health') || req.path.startsWith('/sitemap')) {
    return next();
  }
  if (req.path === '/' || req.path === '/public') return next();

  const slug = req.path.split('/').pop();
  if (!slug || slug.length < 5) return next();

  try {
    // intenta por slug directo (tu ruta buena de V2)
    let post = null;
    try {
      const { data } = await axios.get(`http://localhost:${process.env.PORT || 8080}/api/v2/entradas/slug/${slug}`, { timeout: 3000 });
      post = data?.data || data?.posts?.[0] || data;
    } catch {
      // fallback externo si falla interno
      const { data } = await axios.get(`https://ultraserver.koyeb.app/api/v2/entradas/slug/${slug}`, { timeout: 4000 });
      post = data?.data || data?.posts?.[0] || data;
    }

    if (!post?.Entry_Title) return next();

    const title = String(post.Entry_Title).replace(/"/g, '&quot;');
    const desc = String(post.Entry_Resume || post.Entry_Body_Resume_Plain || '').slice(0, 160).replace(/"/g, '&quot;');
    const image = post.Entry_Featured_Image || `${SITE_CANONICAL}/og-default.jpg`;
    const url = `${SITE_CANONICAL}${req.path}`;

    return res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8" />
<title>${title} | Vox Diario</title>
<meta name="description" content="${desc}" />
<link rel="canonical" href="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${image}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Vox Diario" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${image}" />
</head>
<body>
<h1>${title}</h1>
<p>${desc}</p>
<img src="${image}" alt="${title}" />
<p><a href="${url}">Ver nota completa en Vox Diario</a></p>
<script>window.location.href="${url}"</script>
</body>
</html>`);
  } catch (e) {
    console.warn('[SEO BOT] fail', e.message);
    return next();
  }
});
// ========== FIN FIX SEO ==========

// PUBLIC ESTATICO
app.use('/public', express.static('public'));

// HEALTH
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'ultraserver', uptime: process.uptime(), timestamp: Date.now() });
});

app.get('/', (req, res) => {
  res.send(`<h1>VoxDiario API v2 Running</h1>
  <ul>
    <li><a href="/health">Health</a></li>
    <li><a href="/sitemap.xml">sitemap.xml</a></li>
    <li><a href="/api/content/carousel">/api/content/carousel</a></li>
    <li><a href="/api/v2/servicios/rutas">/api/v2/servicios/rutas</a></li>
    <li><a href="/api/v2/posts/destacada">/api/v2/posts/destacada</a></li>
    <li><a href="/api/v2/entradas">/api/v2/entradas</a></li>
  </ul>`);
});

app.use('/', sitemapRoutes);

// --- RUTAS V1 ---
app.use('/api/posts', postRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cortes', corteRoutes);
app.use('/api/boletin', boletinRoutes);

// --- RUTAS V2 ---
app.use('/api/v2/servicios/rutas', rutasRouter);
app.use('/api/v2/posts', postsV2Router);
app.use('/api/v2/entradas', postsV2Router);
app.use('/api/v2/views', viewsV2Router);
app.use('/api/v2/tags', tagsV2Router);
app.use('/api/v2/tts', ttsRouter);
app.use('/api/v2/categorias', categoriasRouter);

// FIX: boletin soporta /actual y / - tu Dashboard usa ambos
app.use('/api/v2/boletin', boletinRoutes);
app.use('/api/boletin', boletinRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 404, message: 'Ruta no encontrada', path: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error('[VoxDiario API ERROR]', err);
  res.status(err.status || 500).json({ status: err.status || 500, message: err.message || 'Error interno' });
});

export default app;