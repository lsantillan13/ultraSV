import {Router} from 'express';
const router = Router();

import * as postsCtrl from '../controllers/posts.controllers';
import { authJwt } from '../middlewares/index.js';

/* REGULAR USER */
/*R*/ router.get('/', postsCtrl.getPosts);
/*C*/ router.get('/:postId',  postsCtrl.getPostById);
 
/* ADMIN && MODERATOR */
/*C*/ router.post('/', [authJwt.verifyToken, authJwt.isAdmin], postsCtrl.createPost);
/*R*/ router.put('/:postId', [authJwt.verifyToken, authJwt.isAdmin], postsCtrl.updatePostById);
/*D*/ router.delete('/:postId', [authJwt.verifyToken, authJwt.isAdmin], postsCtrl.deletePostById);

export default router;