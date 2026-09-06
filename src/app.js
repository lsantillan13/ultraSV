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

/* =========================================================
   CONFIGURACIÓN CORS
   ========================================================= */

const whitelist = [
  'https://voxdiario.com',
  'https://www.voxdiario.com',

  // Desarrollo
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:8080',
  'http://192.168.100.11:3000',
  'http://192.168.100.11:8080'
];

const corsOptions = {
  origin: (origin, callback) => {
    /*
     * Requests sin Origin:
     * curl, Postman, server-to-server, etc.
     */
    if (!origin) {
      return callback(null, true);
    }

    /*
     * Permitir solamente los dominios autorizados.
     */
    if (whitelist.includes(origin)) {
      return callback(null, true);
    }

    /*
     * Rechazar otros orígenes.
     */
    return callback(new Error(`CORS: Origin no permitido: ${origin}`));
  },

  credentials: true,

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization'
  ],

  optionsSuccessStatus: 204
};

/*
 * IMPORTANTE:
 * CORS se registra antes de las rutas.
 */
app.use(cors(corsOptions));

/*
 * Manejo explícito de preflight OPTIONS.
 */
app.options('*', cors(corsOptions));


/* =========================================================
   SEGURIDAD
   ========================================================= */

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);


/* =========================================================
   COMPRESIÓN
   ========================================================= */

app.use(compression());


/* =========================================================
   BODY PARSER
   ========================================================= */

app.use(
  express.json({
    limit: '5mb'
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: '5mb'
  })
);


/* =========================================================
   LOGGER
   ========================================================= */

app.use(morgan('dev'));


/* =========================================================
   INITIAL SETUP
   ========================================================= */

createRoles();


/* =========================================================
   HEALTH CHECK
   ========================================================= */

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'ultraserver',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});


/* =========================================================
   API ROOT
   ========================================================= */

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VoxDiario API</title>
      </head>

      <body>
        <h1>VoxDiario API v2 Running</h1>

        <ul>
          <li>
            <a href="/api/posts?limit=10">
              Posts
            </a>
          </li>

          <li>
            <a href="/health">
              Health
            </a>
          </li>
        </ul>
      </body>

    </html>
  `);
});


/* =========================================================
   API ROUTES
   ========================================================= */

app.use('/api/posts', postRoutes);

app.use('/api/content', contentRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/cortes', corteRoutes);


/* =========================================================
   404
   ========================================================= */

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});


/* =========================================================
   ERROR HANDLER
   ========================================================= */

app.use((err, req, res, next) => {
  console.error('[VoxDiario API ERROR]', err);

  /*
   * Si el error proviene de CORS,
   * devolver una respuesta clara.
   */
  if (err.message?.startsWith('CORS:')) {
    return res.status(403).json({
      status: 403,
      message: 'Origen no permitido por CORS'
    });
  }

  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Error interno del servidor'
  });
});


/* =========================================================
   EXPORT
   ========================================================= */

export default app;