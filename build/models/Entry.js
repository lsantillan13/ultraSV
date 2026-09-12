"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var EntrySchema = new _mongoose["default"].Schema({
  Entry_Title: {
    type: String,
    required: true,
    trim: true
  },
  Entry_Resume: {
    type: String,
    "default": ''
  },
  Entry_Content: {
    type: String,
    "default": ''
  },
  Entry_Featured_Image: {
    type: String,
    required: true
  },
  Entry_Category: {
    type: String,
    "default": 'ciudad',
    lowercase: true
  },
  Entry_Status: {
    type: String,
    "enum": ['draft', 'published', 'archived'],
    "default": 'published',
    index: true
  },
  Entry_Author: {
    type: String,
    "default": 'Ultravox'
  },
  Entry_Slug: {
    type: String,
    unique: true,
    sparse: true
  },
  Entry_Tags: {
    type: [String],
    "default": []
  },
  Entry_Views: {
    type: Number,
    "default": 0
  }
}, {
  collection: 'entries',
  timestamps: true // crea createdAt y updatedAt
});

// Índices para que /carousel y /component vuelen
EntrySchema.index({
  Entry_Status: 1,
  createdAt: -1
});

// Virtual para Entry_Time que usa VoxUltimasNeuquen
EntrySchema.virtual('Entry_Time').get(function () {
  if (!this.createdAt) return 'Hace instantes';
  var diff = Date.now() - this.createdAt.getTime();
  var mins = Math.floor(diff / 60000);
  if (mins < 60) return "Hace ".concat(mins, " min");
  var hours = Math.floor(mins / 60);
  if (hours < 24) return "Hace ".concat(hours, " h");
  var days = Math.floor(hours / 24);
  return "Hace ".concat(days, " d");
});
EntrySchema.set('toJSON', {
  virtuals: true
});
EntrySchema.set('toObject', {
  virtuals: true
});
var Entry = _mongoose["default"].models.Entry || _mongoose["default"].model('Entry', EntrySchema);
var _default = exports["default"] = Entry;