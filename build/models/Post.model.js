"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var newSchema = new _mongoose.Schema({
  //Entry
  Entry_Title: String,
  Entry_Resume: String,
  Entry_Body: String,
  Entry_Featured_Image: String,
  Entry_Category: String
}, {
  timestamps: true,
  versionKey: false
});
var _default = (0, _mongoose.model)('Post', newSchema);
exports["default"] = _default;