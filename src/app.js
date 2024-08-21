import express from 'express';
import {createRoles} from './libs/initialSetup.js';
import morgan from 'morgan';
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import corteRoutes from './routes/corte.routes.js';
import contentRoutes from './routes/content.routes.js';
import cors from 'cors';

const app = express();
createRoles();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

const whitelist = ['https://voxdiario.com', 'https://www.voxdiario.com', 'http://localhost:3000', 'http://192.168.0.50:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Directorio de API</title>
</head>
<body>
    <h1>Bienvenido al directorio de API</h1>
    <p>Utiliza los siguientes enlaces para acceder a las APIs:</p>
    <ul>
        <li><a href="/api/posts">Posts API</a></li>
        <li><a href="/api/auth">Auth API</a></li>
        <li><a href="/api/users">Users API</a></li>
        <li><a href="/api/cortes">Cortes API</a></li>
    </ul>
</body>
</html>`);
})

app.use('/api/posts', postRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cortes', corteRoutes);

export default app;
