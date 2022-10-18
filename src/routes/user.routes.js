import { Router } from "express";
const router = Router();

import * as userCtrl from './../controllers/user.controllers.js';
import { authJwt, verifySignup  } from '../middlewares';

router.post('/', [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRoles], userCtrl.createUser);

export default router;