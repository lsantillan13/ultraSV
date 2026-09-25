"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _instagramControllers = require("../../controllers/instagram.controllers.js");
var router = (0, _express.Router)();

// GET /api/v2/instagram -> historial
router.get('/', _instagramControllers.listController);

// POST /api/v2/instagram/publish -> publicar
router.post('/publish', _instagramControllers.publishController);
var _default = exports["default"] = router;