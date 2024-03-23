import express from 'express';
import morgan from 'morgan';
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import corteRoutes from './routes/corte.routes.js';
import cors from 'cors';
import {createRoles} from './libs/initialSetup.js';

const app = express();
createRoles();
app.use(morgan('dev'));
app.use(cors());
app.use(function (req, res, next) {
  const allowedOrigins = ['https://voxdiario.com', 'http://127.0.0.1:5001', 'http://localhost:5001', '[::1]:5001'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin); 
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);

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