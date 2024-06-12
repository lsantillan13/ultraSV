"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var newSchema = new _mongoose.Schema({
  //Entry
  title: String,
  id: String,
  url: String
}, {
  timestamps: true,
  versionKey: false
});
var _default = (0, _mongoose.model)('Corte', newSchema);
exports["default"] = _default;