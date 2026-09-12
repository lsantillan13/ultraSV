"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var BoletinCorteSchema = new _mongoose["default"].Schema({
  fechaTexto: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    "default": 'CORTES PROGRAMADOS'
  },
  horario: {
    type: String,
    required: true
  },
  zonas: {
    type: [String],
    required: true
  },
  motivo: {
    type: String,
    "default": 'Mantenimiento y modernización de la red'
  },
  estado: {
    type: String,
    "enum": ['vigente', 'archivado'],
    "default": 'vigente'
  },
  fecha: {
    type: Date,
    "default": Date.now
  }
}, {
  collection: 'boletines_cortes',
  timestamps: true
});
var BoletinCorte = _mongoose["default"].models.BoletinCorte || _mongoose["default"].model('BoletinCorte', BoletinCorteSchema);
var _default = exports["default"] = BoletinCorte;