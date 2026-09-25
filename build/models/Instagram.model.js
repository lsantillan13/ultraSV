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
    "enum": ['solo_ig', 'teaser_web'],
    "default": 'solo_ig'
  },
  status: {
    type: String,
    "enum": ['pending', 'published', 'failed', 'mock'],
    "default": 'pending'
  },
  igMediaId: {
    type: String
  },
  permalink: {
    type: String
  },
  error: {
    type: String
  },
  entryRef: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Entry',
    "default": null
  }
}, {
  timestamps: true
});
var _default = exports["default"] = _mongoose["default"].model('InstagramPost', InstagramSchema);