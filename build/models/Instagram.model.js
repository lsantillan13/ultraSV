"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var InstagramSchema = new _mongoose["default"].Schema({
  mediaUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  type: {
    type: String,
    "default": 'solo_ig'
  },
  status: {
    type: String,
    "enum": ['mock', 'published', 'error', 'deleted'],
    "default": 'mock'
  },
  igMediaId: {
    type: String,
    "default": null
  },
  permalink: {
    type: String,
    "default": null
  },
  entryRef: {
    type: String,
    "default": null
  }
}, {
  timestamps: true
});
var _default = exports["default"] = _mongoose["default"].model('Instagram', InstagramSchema);