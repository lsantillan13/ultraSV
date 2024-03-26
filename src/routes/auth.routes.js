import { Router } from "express";
import * as authCtrl from '../controllers/auth.controllers.js';
import {verifySignup}  from '../middlewares';
const router = Router();


router.post('/SignUp', [verifySignup.checkDuplicatedUsernameOrEmail, verifySignup.checkRoles], authCtrl.signUp);
router.post('/signin', authCtrl.signIn);

export default router;