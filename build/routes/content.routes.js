"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var contentCtrl = _interopRequireWildcard(require("../controllers/content.controllers"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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
var _default = exports["default"] = router;