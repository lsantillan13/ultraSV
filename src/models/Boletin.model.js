import { Schema, model } from 'mongoose';

const corteSchema = new Schema({
  horario: String, // De 07:00 a 14:00 h
  zona: String,
  detalle: String,
  autorizado: { type: Boolean, default: true }
}, { _id: false });

const boletinSchema = new Schema({
  fecha: { type: String, required: true }, // DOMINGO 13 DE SEPTIEMBRE
  titulo: { type: String, default: 'CORTES PROGRAMADOS' },
  cortes: [corteSchema], // <--- N cortes, 1, 5, 12, lo que venga
  imagenUrl: String,
  activo: { type: Boolean, default: true }
}, { timestamps: true });

export default model('Boletin', boletinSchema);