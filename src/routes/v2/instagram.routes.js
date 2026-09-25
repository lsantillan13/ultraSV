import { Router } from 'express';
import * as ctrl from '../controllers/instagram.controller.js';
const router = Router();

router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);
router.post('/publish', ctrl.publish);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;