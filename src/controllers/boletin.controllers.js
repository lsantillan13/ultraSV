import Boletin from '../models/Boletin.model.js';

export const crearBoletin = async (req, res) => {
  try {
    const { fecha, cortes } = req.body;
    // cortes viene como JSON string: '[{"horario":"...","zona":"...","detalle":"..."}]'
    const cortesArray = JSON.parse(cortes || '[]');

    await Boletin.updateMany({ activo: true }, { activo: false });

    const nuevo = await Boletin.create({
      fecha,
      titulo: 'CORTES PROGRAMADOS',
      cortes: cortesArray, // puede ser 1 o 20
      imagenUrl: req.file? `/uploads/${req.file.filename}` : null,
      activo: true
    });

    res.json(nuevo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

export const getBoletinActual = async (req, res) => {
  const b = await Boletin.findOne({ activo: true }).sort({ createdAt: -1 }).lean();
  res.json(b || null);
};