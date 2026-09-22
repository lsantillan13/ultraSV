"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setListeners = exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// Estado en memoria, liviano, no usa Mongo
var currentListeners = 0;
router.get('/status', function (req, res) {
  res.json({
    onAir: currentListeners > 0 ? true : false,
    listeners: currentListeners
  });
});

// lo usamos desde el socket para actualizar
var setListeners = exports.setListeners = function setListeners(n) {
  return currentListeners = n;
};
var _default = exports["default"] = router;