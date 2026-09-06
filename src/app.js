import express from 'express';
import { createRoles } from './libs/initialSetup.js';
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

const whitelist = [
  'https://voxdiario.com',
  'https://www.voxdiario.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:8080',
  'http://192.168.100.11:3000',
  'http://192.168.100.11:8080'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir requests sin Origin (Koyeb health check, curl, Cloudflare Worker)
    if (!origin) return callback(null, true);
    if (whitelist.includes(origin)) return callback(null, true);
    // En vez de tirar error, permitimos pero logueamos. Asi no rompe CORS
    console.warn(`CORS: Origin no listado pero permitido temporalmente: ${origin}`);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Origin','X-Requested-With','Content-Type','Accept','Authorization'],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(morgan('dev'));

createRoles();

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'ultraserver', uptime: process.uptime(), timestamp: Date.now() });
});

app.get('/', (req, res) => {
  res.send(`<h1>VoxDiario API v2 Running</h1><a href="/health">Health</a>`);
});

app.use('/api/posts', postRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cortes', corteRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 404, message: 'Ruta no encontrada', path: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error('[VoxDiario API ERROR]', err);
  // Siempre devolver CORS incluso en error
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(err.status || 500).json({ status: err.status || 500, message: err.message || 'Error interno' });
});

export default app;