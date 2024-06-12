"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var contentCtrl = _interopRequireWildcard(require("../controllers/content.controllers"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var router = (0, _express.Router)();
/*===== Rutas de Usuarios Regulares =====*/
/*First Section && Carousel */
router.get('/carousel', contentCtrl.getLastFivePosts);
router.get('/component', contentCtrl.getNextEightPosts);
/* Widget */
router.get('/widgetP', contentCtrl.getPoliticalPosts);
router.get('/widgetE', contentCtrl.getEconomicPosts);
router.get('/widgetS', contentCtrl.getSocialPosts);
/* Widget */
router.get('/policiales', contentCtrl.getPolicePosts);
router.get('/deportes', contentCtrl.getSportsPosts);
router.get('/tecnologia', contentCtrl.getTechnologyPosts);
/* últimas noticias */
router.get('/last', contentCtrl.getLast);
/* Get by Id */
router.get('/:id', contentCtrl.getPostById);
/* Categorías */
router.get('/buscar/:category', contentCtrl.getLatestPostsByCategory);

/*===== Publicaciones Relacionadas =====*/

/*Same Category*/
router.get('/:category/related-post/:postId', contentCtrl.getRelatedPost);
/*Streaming*/
router.get('/getStreaming', contentCtrl.getStreaming);
/*Emprender*/
router.get('/getEmprender', contentCtrl.getEmprender);
/*Espectáculos*/
router.get('/getEspectaculos', contentCtrl.getEspectaculos);
var _default = router;
exports["default"] = _default;