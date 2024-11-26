import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import {createRoles} from './libs/initialSetup.js';
import morgan from 'morgan';
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import corteRoutes from './routes/corte.routes.js';
import contentRoutes from './routes/content.routes.js';
import cors from 'cors';

import axios from 'axios';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { Helmet } from 'react-helmet'

const app = express();
createRoles();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

const whitelist = [

  // Prod
  'https://voxdiario.com',
  'https://www.voxdiario.com',
  'http://voxdiario.com',
  'http://www.voxdiario.com',

  // Local
  'http://localhost:3000',
  'http://192.168.0.50:3000',

  // Serverside Rendering
  'http://localhost:8080',
  'http://192.168.0.50:8080',

  // Static
  'http://localhost:45678',

];
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
});


app.get('/rest/posts/:id', async (req, res) => {
  const { id } = req.params;
  
  try{
    const response = await axios.get(`${process.env.REACT_APP_POST_BY_ID}/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Error al cargar el contenido'});
  }
});

app.get('/rest/:category/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${process.env.REACT_APP_POST_BY_ID}/${id}`);
    const post = response.data;
    console.log(post);

    const content = renderToString(
      <div>
        <Helmet>
          <title>{`VoxDiario | ${post.Entry_Title}`}</title>
          <meta name="description" content={post.Entry_Resume} />
          <meta property="og:title" content={post.Entry_Title} />
          <meta property="og:description" content={post.Entry_Resume} />
          <meta property="og:image" content={post.Entry_Featured_Image} />
          <meta property="og:type" content="article" />
        </Helmet>
        <div>
          <h1>{post.Entry_Title}</h1>
          <p>{post.Entry_Resume}</p>
        </div>
      </div>
    );

    const helmet = Helmet.renderStatic();

    res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/static/js/bundle.js"></script>
      </body>
    </html>
    `);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Error al cargar el contenido');
  }
});

// app.get('/:category/:id', async (req, res) => {
//   const { category, id } = req.params;
 
//   try {
//     const response = await axios.get(`${process.env.REACT_APP_POST_BY_ID}/${id}`);
//     const post = response.data;
//     console.log(post)

//     const content = renderToString(
//     <div>
//       <Helmet>
//         <title>{`VoxDiario | ${post.Entry_Title}`}</title>
//         <meta name="description" content={post.Entry_Resume} />
//         <meta property="og:title" content={post.Entry_Title} />
//         <meta property="og:description" content={post.Entry_Resume} />
//         <meta property="og:image" content={post.Entry_Featured_Image} />
//         <meta property="og:type" content="article" />
//       </Helmet>
//       <div>
//         <h1>{post.Entry_Title}</h1>
//         <p>{post.Entry_Resume}</p>
//       </div>
//     </div>
//     );

//     const helmet = Helmet.renderStatic();

//     res.send(`
//     <!DOCTYPE html>
//     <html lang="es"
//       <head>
//         ${helmet.title.toString()}
//         ${helmet.meta.toString()}
//       </head>
//       <body>
//         <div id="root">${content}</div>
//         <script src="path/to/bundle.js"></script>
//       </body>
//       </html>
//     `);
//   } catch (error) {
//     console.error('Error fetching post:', error);
//     res.status(500).send('Error al cargar el contenido');
//   }
// });

// app.get('*', (req, res) => {
//   const content = renderToString(
//     <div>
//      <Helmet> <title>VoxDiario</title> <meta name="description" content="Portal de noticias en tiempo real." /> <meta property="og:title" content="VoxDiario" /> <meta property="og:description" content="Portal de noticias en tiempo real." /> <meta property="og:image" content="/default-image.jpg" /> <meta property="og:type" content="website" /> </Helmet>
//       <div id="root">
//         <h1>Bienvenido a VoxDiario</h1>
//         <p>Noticias en tiempo real</p>
//       </div>
//     </div>
//   )
//   const helmet = Helmet.renderStatic(); res.send(` <!DOCTYPE html> <html lang="es"> <head> ${helmet.title.toString()} ${helmet.meta.toString()} </head> <body> <div id="root">${content}</div> <script src="/static/js/bundle.js"></script> </body> </html> `);
// })

app.use('/api/posts', postRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cortes', corteRoutes);

export default app;
