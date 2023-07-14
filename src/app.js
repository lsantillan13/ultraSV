import express from 'express';
import morgan from 'morgan';
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import corteRoutes from './routes/corte.routes.js';
import cors from 'cors';
import compression from 'compression';

import {createRoles} from './libs/initialSetup.js';

const app = express();
createRoles();
app.use(compression({
  level: 6,
  threshold: 100 * 1000,
  filter: (req, res) => {
    if(req.headers['x-no-compression']){
      return false
    }
    return compression.filter(req, res)
  }
}))
app.use(express.json({ limit: "100mb" }));
app.use(morgan('dev'));
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://voxdiario.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Verifica el origen de la solicitud y agrega el encabezado solo si es localhost
  if (req.headers.origin === 'http://localhost:3000') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  }
  
  next();
});


app.get('/', (req, res) => {
  
  res.json('')
})

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cortes', corteRoutes);

export default app;