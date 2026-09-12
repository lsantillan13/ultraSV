"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _voxController = require("../controllers/vox.controller.js");
var router = (0, _express.Router)();
router.get('/home', _voxController.getHomeFeed);
router.get('/carousel', _voxController.getCarousel);
router.get('/component', _voxController.getComponentFeed);
router.get('/boletin', _voxController.getBoletinVigente);
var _default = exports["default"] = router;