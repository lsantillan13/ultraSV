"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var postsCtrl = _interopRequireWildcard(require("../controllers/posts.controllers.js"));
var _index = require("../middlewares/index.js");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var router = (0, _express.Router)();
// Middleware de cache para Cloudflare
var cacheList = function cacheList(req, res, next) {
  // Lista publica cache 1 min en edge
  res.set('Cache-Control', 'public, max-age=30, s-maxage=60');
  next();
};
var cacheSingle = function cacheSingle(req, res, next) {
  // Single post cache 5 min (lo usa el Worker OG de Facebook)
  res.set('Cache-Control', 'public, max-age=60, s-maxage=300');
  next();
};

/* REGULAR USER - OPTIMIZADOS */
// GET /api/posts?limit=20&page=1&category=Deportes
router.get('/', cacheList, postsCtrl.getPosts);

// GET /api/posts/:postId
router.get('/:postId', cacheSingle, postsCtrl.getPostById);

/* ADMIN && MODERATOR */
router.post('/', [_index.authJwt.verifyToken, _index.authJwt.isAdmin], postsCtrl.createPost);
router.put('/:postId', [_index.authJwt.verifyToken, _index.authJwt.isAdmin], postsCtrl.updatePostById);
router["delete"]('/:postId', [_index.authJwt.verifyToken, _index.authJwt.isAdmin], postsCtrl.deletePostById);
var _default = exports["default"] = router;