"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _multer = _interopRequireDefault(require("multer"));
var _boletinControllers = require("../controllers/boletin.controllers.js");
var _authJwt = require("../middlewares/authJwt.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var upload = (0, _multer["default"])({
  dest: 'uploads/'
});
var router = (0, _express.Router)();
router.get('/actual', _boletinControllers.getBoletinActual);
router.post('/', _authJwt.verifyToken, _authJwt.isAdmin, upload.single('foto'), _boletinControllers.crearBoletin);
var _default = exports["default"] = router;