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
import { startTrendingJobs } from './jobs/trendingDecay.js';

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
startTrendingJobs(); // <-- ACA SE INICIA

// PUBLIC ESTATICO PRIMERO
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
    <li><a href="/api/content/component">/api/content/component</a></li>
    <li><a href="/api/v2/servicios/cortes">/api/v2/servicios/cortes</a></li>
    <li><a href="/api/v2/servicios/farmacias">/api/v2/servicios/farmacias</a></li>
    <li><a href="/api/v2/servicios/rutas">/api/v2/servicios/rutas</a></li>
    <li><a href="/api/v2/tags">/api/v2/tags</a></li>
    <li><a href="/api/v2/posts/destacada">/api/v2/posts/destacada</a></li>
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
app.use('/api/v2/views', viewsV2Router);
app.use('/api/v2/tags', tagsV2Router);
app.use('/api/v2/tts', ttsRouter);
app.use('/api/v2/categorias', categoriasRouter);

app.use((req, res) => {
  res.status(404).json({ status: 404, message: 'Ruta no encontrada', path: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error('[VoxDiario API ERROR]', err);
  res.status(err.status || 500).json({ status: err.status || 500, message: err.message || 'Error interno' });
});

export default app;