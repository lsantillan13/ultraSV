import {Router} from 'express';
const router = Router();

import * as cortesCtrl from '../controllers/cortes.controllers';
import { authJwt } from '../middlewares/index.js';

/* REGULAR USER */
/*R*/ router.get('/', cortesCtrl.getCortes);
/*R*/ router.get('/corteId', cortesCtrl.getCortesById);

/* ADMIN && MODERATOR */
/*C*/ router.post('/', [authJwt.verifyToken, authJwt.isAdmin], cortesCtrl.createCorte);
/*R*/ router.put('/:corteId', [authJwt.verifyToken, authJwt.isAdmin], cortesCtrl.updateCortesById);
/*D*/ router.delete('/:corteId', [authJwt.verifyToken, authJwt.isAdmin], cortesCtrl.deleteCortesById);

export default router;