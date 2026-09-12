import { Router } from 'express';
import multer from 'multer';
import { crearBoletin, getBoletinActual } from '../controllers/boletin.controllers.js';
import { verifyToken, isAdmin } from '../middlewares/authJwt.js';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.get('/actual', getBoletinActual);
router.post('/', verifyToken, isAdmin, upload.single('foto'), crearBoletin);

export default router;