import {Router} from 'express';
const router = Router();

import * as postsCtrl from '../controllers/posts.controllers.js';
import { authJwt } from '../middlewares/index.js';

// Middleware de cache para Cloudflare
const cacheList = (req, res, next) => {
  // Lista publica cache 1 min en edge
  res.set('Cache-Control', 'public, max-age=30, s-maxage=60');
  next();
};

const cacheSingle = (req, res, next) => {
  // Single post cache 5 min (lo usa el Worker OG de Facebook)
  res.set('Cache-Control', 'public, max-age=60, s-maxage=300');
  next();
};

/* REGULAR USER - OPTIMIZADOS */
// GET /api/posts?limit=20&page=1&category=Deportes
router.get('/', cacheList, postsCtrl.getPosts);

// GET /api/posts/:postId
router.get('/:postId', cacheSingle, postsCtrl.getPostById);

/* ADMIN && MODERATOR */
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], postsCtrl.createPost);
router.put('/:postId', [authJwt.verifyToken, authJwt.isAdmin], postsCtrl.updatePostById);
router.delete('/:postId', [authJwt.verifyToken, authJwt.isAdmin], postsCtrl.deletePostById);

export default router;
