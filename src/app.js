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
    // Permitir igual pero loguear para debug
    console.warn(`CORS: Origin no listado pero permitido: ${origin}`);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'x-access-token', // <- ESTE TE FALTABA
    'x-auth-token'
  ],
  exposedHeaders: ['x-access-token', 'Authorization'],
  optionsSuccessStatus: 204
};

// ORDEN IMPORTA: cors primero, antes que helmet
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Helmet sin bloquear recursos cross-origin
app.use(helmet({ 
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false 
}));

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
  // Asegurar CORS incluso en error
  const origin = req.headers.origin;
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
  }
  res.status(err.status || 500).json({ status: err.status || 500, message: err.message || 'Error interno' });
});

export default app;