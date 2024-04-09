import {Router} from 'express';
const router = Router();

import * as postsCtrl from '../controllers/posts.controllers';
import { authJwt } from '../middlewares/index.js';

/* REGULAR USER */
/*R*/ router.get('/', postsCtrl.getPosts);
/*R*/ router.get('/:postId',  postsCtrl.getPostById);

/* Últimas 5 Publicaciones */
// /*R*/ router.get('/api/carousel', postsCtrl.getLastFivePosts)
// /*R*/ router.get('/api/components', postsCtrl.getNextEightPosts)
// /*R*/ router.get('/api/politics', postsCtrl.getPoliticalPosts)

 
/* ADMIN && MODERATOR */
/*C*/ router.post('/', [authJwt.verifyToken, authJwt.isAdmin], postsCtrl.createPost);
/*R*/ router.put('/:postId', [authJwt.verifyToken, authJwt.isAdmin], postsCtrl.updatePostById);
/*D*/ router.delete('/:postId', [authJwt.verifyToken, authJwt.isAdmin], postsCtrl.deletePostById);

export default router;