import { Router } from "express";
const router = Router();

import * as authCtrl from '../controllers/auth.controllers.js';
import {verifySignup}  from '../middlewares';

router.post('/SignUp', [verifySignup.checkDuplicatedUsernameOrEmail, verifySignup.checkRoles], authCtrl.signUp);
router.post('/SignIn', authCtrl.signIn);

export default router;