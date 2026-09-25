import express from 'express';
import Boletin from '../models/Boletin.model.js';
import { authJwt } from '../middlewares/authJwt.js';

const router = express.Router();

// GET - actual
router.get('/actual', async (req, res) => {
  try {
    const b = await Boletin.findOne({ activo: true }).sort({ createdAt: -1 });
    if (!b) return res.status(200).json({ fecha: new Date().toLocaleDateString('es-AR'), cortes: [], titulo: 'ENERGÍA RESTITUIDA', activo: true });
    res.json(b);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const b = await Boletin.findOne({ activo: true }).sort({ createdAt: -1 });
    if (!b) return res.status(200).json({ fecha: new Date().toLocaleDateString('es-AR'), cortes: [], titulo: 'ENERGÍA RESTITUIDA', activo: true });
    res.json(b);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

const saveBoletin = async (req, res) => {
  try {
    let { fecha, cortes, titulo } = req.body;
    
    // FIX: Permite array vacio para ENERGÍA RESTITUIDA
    if (!Array.isArray(cortes)) {
      return res.status(400).json({ message: 'cortes debe ser array' });
    }
    
    if (!fecha) {
      fecha = new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
    }

    if (cortes.length === 0) {
      titulo = 'ENERGÍA RESTITUIDA';
    } else {
      titulo = titulo || 'CORTES PROGRAMADOS';
    }

    await Boletin.updateMany({}, { activo: false });
    const nuevo = await Boletin.create({ fecha, cortes, titulo, activo: true });
    res.status(201).json({ ok: true, data: nuevo, ...nuevo.toObject() });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteBoletin = async (req, res) => {
  try {
    await Boletin.updateMany({}, { activo: false });
    // Crea el vacio para que el front lea energia restituida
    const vacio = await Boletin.create({ 
      fecha: new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase(),
      cortes: [], 
      titulo: 'ENERGÍA RESTITUIDA', 
      activo: true 
    });
    res.status(200).json({ ok: true, message: 'Boletín borrado - Energía Restituida', data: vacio });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

router.post('/actual', authJwt, saveBoletin);
router.post('/', authJwt, saveBoletin);
router.put('/actual', authJwt, saveBoletin);
router.put('/', authJwt, saveBoletin);
router.delete('/actual', authJwt, deleteBoletin);
router.delete('/', authJwt, deleteBoletin);

export default router;