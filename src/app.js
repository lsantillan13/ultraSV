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
app.use( function (req, res, next){
  res.header("Acess-Controll-Allow-Origin", "*")
  res.header("Acess-Controll-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept")
  next();
})

app.get('/', (req, res) => {
  
  res.json('')
})

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cortes', corteRoutes);

export default app;