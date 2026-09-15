// routes/boletin.js - FIX V2
const express = require('express');
const router = express.Router();
const Boletin = require('../models/Boletin'); // o como lo tengas
const auth = require('../middleware/auth'); // tu middleware de token

// GET - ya lo tenés, dejalo
router.get('/actual', async (req, res) => {
  try {
    const boletin = await Boletin.findOne().sort({ createdAt: -1 });
    if (!boletin) return res.status(404).json({ message: 'No hay boletin' });
    res.json(boletin);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// POST - ESTE ES EL QUE TE FALTA - con /actual y sin /
const saveBoletin = async (req, res) => {
  try {
    // NO hagas JSON.parse(req.body) - req.body ya es objeto
    const { fecha, cortes, titulo } = req.body;
    
    if (!fecha || !cortes || !cortes.length) {
      return res.status(400).json({ message: 'Falta fecha o cortes' });
    }

    const nuevo = await Boletin.create({
      fecha,
      cortes,
      titulo: titulo || "CORTES PROGRAMADOS",
      createdAt: new Date()
    });

    res.json(nuevo);
  } catch (e) {
    console.error("ERROR BOLETIN:", e);
    res.status(500).json({ message: e.message });
  }
};

router.post('/actual', auth, saveBoletin);
router.post('/', auth, saveBoletin); // fallback para tu ruta vieja

module.exports = router;