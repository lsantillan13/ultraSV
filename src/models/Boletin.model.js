import { Schema, model } from 'mongoose';

const corteSchema = new Schema({
  horario: String, // De 07:00 a 14:00 h
  desde: String,
  hasta: String,
  zona: String,
  detalle: String,
  autorizado: { type: Boolean, default: true }
}, { _id: false });

const boletinSchema = new Schema({
  fecha: { type: String, required: true },
  titulo: { type: String, default: 'CORTES PROGRAMADOS' },
  cortes: [corteSchema],
  imagenUrl: String,
  activo: { type: Boolean, default: true }
}, { timestamps: true });

export default model('Boletin', boletinSchema);