"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var corteSchema = new _mongoose.Schema({
  horario: String,
  // De 07:00 a 14:00 h
  zona: String,
  detalle: String,
  autorizado: {
    type: Boolean,
    "default": true
  }
}, {
  _id: false
});
var boletinSchema = new _mongoose.Schema({
  fecha: {
    type: String,
    required: true
  },
  // DOMINGO 13 DE SEPTIEMBRE
  titulo: {
    type: String,
    "default": 'CORTES PROGRAMADOS'
  },
  cortes: [corteSchema],
  // <--- N cortes, 1, 5, 12, lo que venga
  imagenUrl: String,
  activo: {
    type: Boolean,
    "default": true
  }
}, {
  timestamps: true
});
var _default = exports["default"] = (0, _mongoose.model)('Boletin', boletinSchema);