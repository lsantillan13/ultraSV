import express from 'express';
import Boletin from '../models/Boletin.model.js';
import { authJwt } from '../middlewares/authJwt.js';

const router = express.Router();

router.get('/actual', async (req, res) => {
  try {
    const b = await Boletin.findOne({ activo: true }).sort({ createdAt: -1 });
    if (!b) return res.status(200).json({ fecha: null, cortes: [], titulo: 'CORTES PROGRAMADOS' });
    res.json(b);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const b = await Boletin.findOne({ activo: true }).sort({ createdAt: -1 });
    if (!b) return res.status(200).json({ fecha: null, cortes: [] });
    res.json(b);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

const saveBoletin = async (req, res) => {
  try {
    const { fecha, cortes, titulo } = req.body;
    if (!fecha ||!Array.isArray(cortes) || cortes.length === 0) {
      return res.status(400).json({ message: 'Falta fecha o cortes' });
    }
    await Boletin.updateMany({}, { activo: false });
    const nuevo = await Boletin.create({ fecha, cortes, titulo, activo: true });
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

router.post('/actual', authJwt, saveBoletin);
router.post('/', authJwt, saveBoletin);

export default router;