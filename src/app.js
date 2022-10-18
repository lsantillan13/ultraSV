import express from 'express';
import morgan from 'morgan';
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

import {createRoles} from './libs/initialSetup.js';

const app = express();
createRoles();
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json('Welcome')
})

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;