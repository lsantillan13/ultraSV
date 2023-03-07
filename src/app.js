import express from 'express';
import morgan from 'morgan';
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';
import compression from 'compression';

import {createRoles} from './libs/initialSetup.js';

const app = express();
createRoles();
app.use(compression())
app.use(express.json({ limit: "100mb" }));
app.use(morgan('dev'));
app.use(cors());
app.use( function (req, res, next){
  res.header("Acess-Controll-Allow-Origin", "*")
  res.header("Acess-Controll-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept")
  next();
})

app.get('/', (req, res) => {
  res.json('Perdón Milu nunca más voy a decirte Buen día. hermosa te amo perdón')
})

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;