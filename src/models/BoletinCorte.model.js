import mongoose from 'mongoose';

const BoletinCorteSchema = new mongoose.Schema({
  fechaTexto: { type: String, required: true },
  titulo: { type: String, default: 'CORTES PROGRAMADOS' },
  horario: { type: String, required: true },
  zonas: { type: [String], required: true },
  motivo: { type: String, default: 'Mantenimiento y modernización de la red' },
  estado: { type: String, enum: ['vigente','archivado'], default: 'vigente' },
  fecha: { type: Date, default: Date.now }
}, {
  collection: 'boletines_cortes',
  timestamps: true
});

const BoletinCorte = mongoose.models.BoletinCorte || mongoose.model('BoletinCorte', BoletinCorteSchema);
export default BoletinCorte;