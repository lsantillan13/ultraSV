import { Router } from 'express';
import { publishController, listController } from '../../controllers/instagram.controllers.js';

const router = Router();

// GET /api/v2/instagram -> historial
router.get('/', listController);

// POST /api/v2/instagram/publish -> publicar
router.post('/publish', publishController);

export default router;