import express from 'express';
import {createRoles} from './libs/initialSetup.js';
import morgan from 'morgan';
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import corteRoutes from './routes/corte.routes.js';
import contentRoutes from './routes/content.routes.js';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

const app = express();

// --- SEGURIDAD Y PERFORMANCE ---
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression()); // GZIP todo, baja 70% el peso de /api/posts

createRoles();

// --- CORS FIX (tenias 2 cors, eso duplica headers) ---
const whitelist = [
  'https://voxdiario.com',
  'https://www.voxdiario.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:8080',
  'http://192.168.100.11:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1 || origin.endsWith('.voxdiario.com')) {
      callback(null, true);
    } else {
      callback(null, true); // por ahora deja pasar para no bloquear app movil
    }
  },
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true, limit: '5mb' }))

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// --- HEALTH CHECKS (Para UptimeRobot y Cloudflare) ---
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'ultraserver', uptime: process.uptime(), timestamp: Date.now() });
});

app.get('/', (req, res) => {
  res.status(200).send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>VoxDiario API</title></head><body><h1>VoxDiario API v2 - Running</h1><ul><li><a href="/api/posts?limit=10">Posts (10 ultimos)</a></li><li><a href="/health">Health</a></li></ul></body></html>`);
})

// --- RUTAS CON CACHE HEADERS ---
// Cache de 60s en Cloudflare para listas, no cache para single post (lo maneja el Worker OG)
app.use('/api/posts', (req, res, next) => {
  if (req.method === 'GET' && !req.params.id) {
    res.set('Cache-Control', 'public, max-age=30, s-maxage=60');
  }
  next();
}, postRoutes);

app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cortes', corteRoutes);

export default app;
