"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTechnologyPosts = exports.getStreaming = exports.getSportsPosts = exports.getSocialPosts = exports.getRelatedPost = exports.getPostById = exports.getPoliticalPosts = exports.getPolicePosts = exports.getNextEightPosts = exports.getLatestPostsByCategory = exports.getLastFivePosts = exports.getLast = exports.getEspectaculos = exports.getEmprender = exports.getEconomicPosts = void 0;
var _PostModel = _interopRequireDefault(require("../models/Post.model.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var HOME_FIELDS = '_id Entry_Title Entry_Resume Entry_Featured_Image Entry_Category createdAt';
var CATEGORY_FIELDS = '_id Entry_Title Entry_Resume Entry_Featured_Image Entry_Category createdAt';
var cache = new Map();
var CACHE_TTL = 60 * 1000;
function getFromCache(key) {
  var entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    cache["delete"](key);
    return null;
  }
  return entry.data;
}
function setCache(key, data) {
  cache.set(key, {
    data: data,
    ts: Date.now()
  });
}
function getWidget(_x) {
  return _getWidget.apply(this, arguments);
}
function _getWidget() {
  _getWidget = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(category) {
    var limit,
      cleanCategory,
      cacheKey,
      cached,
      posts,
      result,
      _args14 = arguments;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.n) {
        case 0:
          limit = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 3;
          cleanCategory = String(category || '').trim();
          cacheKey = "widget:".concat(cleanCategory, ":").concat(limit);
          cached = getFromCache(cacheKey);
          if (!cached) {
            _context14.n = 1;
            break;
          }
          return _context14.a(2, cached);
        case 1:
          _context14.n = 2;
          return _PostModel["default"].find({
            Entry_Category: cleanCategory
          }).select(CATEGORY_FIELDS).sort({
            createdAt: -1
          }).limit(limit).maxTimeMS(5000).lean();
        case 2:
          posts = _context14.v;
          result = {
            portada: posts[0] || null,
            noticias: posts.slice(1)
          };
          setCache(cacheKey, result);
          return _context14.a(2, result);
      }
    }, _callee14);
  }));
  return _getWidget.apply(this, arguments);
}
function getCategoryList(_x2) {
  return _getCategoryList.apply(this, arguments);
}
function _getCategoryList() {
  _getCategoryList = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(category) {
    var limit,
      cacheKey,
      cached,
      cleanCategory,
      posts,
      _args15 = arguments;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.n) {
        case 0:
          limit = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : 12;
          cacheKey = _args15.length > 2 ? _args15[2] : undefined;
          cached = getFromCache(cacheKey);
          if (!cached) {
            _context15.n = 1;
            break;
          }
          return _context15.a(2, cached);
        case 1:
          cleanCategory = String(category).trim();
          _context15.n = 2;
          return _PostModel["default"].find({
            Entry_Category: cleanCategory
          }).select(CATEGORY_FIELDS).sort({
            createdAt: -1
          }).limit(limit).maxTimeMS(5000).lean();
        case 2:
          posts = _context15.v;
          setCache(cacheKey, posts);
          return _context15.a(2, posts);
      }
    }, _callee15);
  }));
  return _getCategoryList.apply(this, arguments);
}
var getLastFivePosts = exports.getLastFivePosts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var key, cached, posts, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          key = 'carousel';
          cached = getFromCache(key);
          if (!cached) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.json(cached));
        case 1:
          _context.n = 2;
          return _PostModel["default"].find().select(HOME_FIELDS).sort({
            createdAt: -1
          }).limit(5).maxTimeMS(5000).lean();
        case 2:
          posts = _context.v;
          setCache(key, posts);
          res.json(posts);
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.error('[API] getLastFivePosts:', _t);
          res.status(500).json({
            message: _t.message
          });
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[0, 3]]);
  }));
  return function getLastFivePosts(_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var getNextEightPosts = exports.getNextEightPosts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var key, cached, posts, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          key = 'component';
          cached = getFromCache(key);
          if (!cached) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.json(cached));
        case 1:
          _context2.n = 2;
          return _PostModel["default"].find().select(HOME_FIELDS).sort({
            createdAt: -1
          }).skip(5).limit(8).maxTimeMS(5000).lean();
        case 2:
          posts = _context2.v;
          setCache(key, posts);
          res.json(posts);
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          console.error('[API] getNextEightPosts:', _t2);
          res.status(500).json({
            message: _t2.message
          });
        case 4:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 3]]);
  }));
  return function getNextEightPosts(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var getPoliticalPosts = exports.getPoliticalPosts = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var _t3, _t4;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _t3 = res;
          _context3.n = 1;
          return getWidget('Política', 3);
        case 1:
          _t3.json.call(_t3, _context3.v);
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t4 = _context3.v;
          console.error('[API] getPoliticalPosts:', _t4);
          res.status(500).json({
            message: _t4.message
          });
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function getPoliticalPosts(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
var getEconomicPosts = exports.getEconomicPosts = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _t5, _t6;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _t5 = res;
          _context4.n = 1;
          return getWidget('Economía', 3);
        case 1:
          _t5.json.call(_t5, _context4.v);
          _context4.n = 3;
          break;
        case 2:
          _context4.p = 2;
          _t6 = _context4.v;
          console.error('[API] getEconomicPosts:', _t6);
          res.status(500).json({
            message: _t6.message
          });
        case 3:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 2]]);
  }));
  return function getEconomicPosts(_x9, _x0) {
    return _ref4.apply(this, arguments);
  };
}();
var getSocialPosts = exports.getSocialPosts = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var _t7, _t8;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _t7 = res;
          _context5.n = 1;
          return getWidget('Sociedad', 3);
        case 1:
          _t7.json.call(_t7, _context5.v);
          _context5.n = 3;
          break;
        case 2:
          _context5.p = 2;
          _t8 = _context5.v;
          console.error('[API] getSocialPosts:', _t8);
          res.status(500).json({
            message: _t8.message
          });
        case 3:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return function getSocialPosts(_x1, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getPolicePosts = exports.getPolicePosts = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var _t9, _t0;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _t9 = res;
          _context6.n = 1;
          return getCategoryList('Policiales', 12, 'policiales');
        case 1:
          _t9.json.call(_t9, _context6.v);
          _context6.n = 3;
          break;
        case 2:
          _context6.p = 2;
          _t0 = _context6.v;
          console.error('[API] getPolicePosts:', _t0);
          res.status(500).json({
            message: _t0.message
          });
        case 3:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function getPolicePosts(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var getSportsPosts = exports.getSportsPosts = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var _t1, _t10;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          _t1 = res;
          _context7.n = 1;
          return getCategoryList('Deportes', 12, 'deportes');
        case 1:
          _t1.json.call(_t1, _context7.v);
          _context7.n = 3;
          break;
        case 2:
          _context7.p = 2;
          _t10 = _context7.v;
          console.error('[API] getSportsPosts:', _t10);
          res.status(500).json({
            message: _t10.message
          });
        case 3:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 2]]);
  }));
  return function getSportsPosts(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var getTechnologyPosts = exports.getTechnologyPosts = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var _t11, _t12;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          _t11 = res;
          _context8.n = 1;
          return getCategoryList('Tecnología', 12, 'tecnologia');
        case 1:
          _t11.json.call(_t11, _context8.v);
          _context8.n = 3;
          break;
        case 2:
          _context8.p = 2;
          _t12 = _context8.v;
          console.error('[API] getTechnologyPosts:', _t12);
          res.status(500).json({
            message: _t12.message
          });
        case 3:
          return _context8.a(2);
      }
    }, _callee8, null, [[0, 2]]);
  }));
  return function getTechnologyPosts(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var getLast = exports.getLast = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var key, cached, posts, _t13;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          key = 'last';
          cached = getFromCache(key);
          if (!cached) {
            _context9.n = 1;
            break;
          }
          return _context9.a(2, res.json(cached));
        case 1:
          _context9.n = 2;
          return _PostModel["default"].find().select(HOME_FIELDS).sort({
            createdAt: -1
          }).limit(16).maxTimeMS(5000).lean();
        case 2:
          posts = _context9.v;
          setCache(key, posts);
          res.json(posts);
          _context9.n = 4;
          break;
        case 3:
          _context9.p = 3;
          _t13 = _context9.v;
          console.error('[API] getLast:', _t13);
          res.status(500).json({
            message: _t13.message
          });
        case 4:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 3]]);
  }));
  return function getLast(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var getPostById = exports.getPostById = /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var id, post, _t14;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          id = req.params.id; // <-- FIX: sacamos solo el id
          if (!(!id || id.length < 10)) {
            _context0.n = 1;
            break;
          }
          return _context0.a(2, res.status(400).json({
            message: 'ID inválido'
          }));
        case 1:
          _context0.n = 2;
          return _PostModel["default"].findById(id).maxTimeMS(5000).lean();
        case 2:
          post = _context0.v;
          if (post) {
            _context0.n = 3;
            break;
          }
          return _context0.a(2, res.status(404).json({
            message: 'Post not found'
          }));
        case 3:
          res.json(post);
          _context0.n = 5;
          break;
        case 4:
          _context0.p = 4;
          _t14 = _context0.v;
          console.error('[API] getPostById:', _t14);
          res.status(500).json({
            message: _t14.message
          });
        case 5:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 4]]);
  }));
  return function getPostById(_x19, _x20) {
    return _ref0.apply(this, arguments);
  };
}();
var getLatestPostsByCategory = exports.getLatestPostsByCategory = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var category, cleanCategory, limit, cacheKey, cached, posts, _t15;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          category = req.params.category; // <-- FIX: req.params.category
          cleanCategory = String(category || '').trim();
          if (cleanCategory) {
            _context1.n = 1;
            break;
          }
          return _context1.a(2, res.status(400).json({
            message: 'Categoría requerida'
          }));
        case 1:
          limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
          cacheKey = "buscar:".concat(cleanCategory, ":").concat(limit);
          cached = getFromCache(cacheKey);
          if (!cached) {
            _context1.n = 2;
            break;
          }
          return _context1.a(2, res.json(cached));
        case 2:
          _context1.n = 3;
          return _PostModel["default"].find({
            Entry_Category: cleanCategory
          }).select(CATEGORY_FIELDS).sort({
            createdAt: -1
          }).limit(limit).maxTimeMS(5000).lean();
        case 3:
          posts = _context1.v;
          setCache(cacheKey, posts);
          res.json(posts);
          _context1.n = 5;
          break;
        case 4:
          _context1.p = 4;
          _t15 = _context1.v;
          console.error('[API] getLatestPostsByCategory:', _t15);
          res.status(500).json({
            message: _t15.message
          });
        case 5:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 4]]);
  }));
  return function getLatestPostsByCategory(_x21, _x22) {
    return _ref1.apply(this, arguments);
  };
}();
var getRelatedPost = exports.getRelatedPost = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
    var _req$params, category, postId, cleanCategory, cacheKey, cached, posts, _t16;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _context10.p = 0;
          _req$params = req.params, category = _req$params.category, postId = _req$params.postId; // <-- FIX: desestructuramos los 2 params
          cleanCategory = String(category || '').trim();
          if (!(!cleanCategory || !postId)) {
            _context10.n = 1;
            break;
          }
          return _context10.a(2, res.status(400).json({
            message: 'Parámetros inválidos'
          }));
        case 1:
          cacheKey = "related:".concat(cleanCategory, ":").concat(postId);
          cached = getFromCache(cacheKey);
          if (!cached) {
            _context10.n = 2;
            break;
          }
          return _context10.a(2, res.json(cached));
        case 2:
          _context10.n = 3;
          return _PostModel["default"].find({
            Entry_Category: cleanCategory,
            _id: {
              $ne: postId
            }
          }).select(CATEGORY_FIELDS).sort({
            createdAt: -1
          }).limit(4).maxTimeMS(5000).lean();
        case 3:
          posts = _context10.v;
          setCache(cacheKey, posts);
          res.json(posts);
          _context10.n = 5;
          break;
        case 4:
          _context10.p = 4;
          _t16 = _context10.v;
          console.error('[API] getRelatedPost:', _t16);
          res.status(500).json({
            message: _t16.message
          });
        case 5:
          return _context10.a(2);
      }
    }, _callee10, null, [[0, 4]]);
  }));
  return function getRelatedPost(_x23, _x24) {
    return _ref10.apply(this, arguments);
  };
}();
var getStreaming = exports.getStreaming = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
    var _t17, _t18;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          _t17 = res;
          _context11.n = 1;
          return getCategoryList('Streaming', 12, 'streaming');
        case 1:
          _t17.json.call(_t17, _context11.v);
          _context11.n = 3;
          break;
        case 2:
          _context11.p = 2;
          _t18 = _context11.v;
          console.error('[API] getStreaming:', _t18);
          res.status(500).json({
            message: _t18.message
          });
        case 3:
          return _context11.a(2);
      }
    }, _callee11, null, [[0, 2]]);
  }));
  return function getStreaming(_x25, _x26) {
    return _ref11.apply(this, arguments);
  };
}();
var getEmprender = exports.getEmprender = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
    var _t19, _t20;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _context12.p = 0;
          _t19 = res;
          _context12.n = 1;
          return getCategoryList('Emprender', 12, 'emprender');
        case 1:
          _t19.json.call(_t19, _context12.v);
          _context12.n = 3;
          break;
        case 2:
          _context12.p = 2;
          _t20 = _context12.v;
          console.error('[API] getEmprender:', _t20);
          res.status(500).json({
            message: _t20.message
          });
        case 3:
          return _context12.a(2);
      }
    }, _callee12, null, [[0, 2]]);
  }));
  return function getEmprender(_x27, _x28) {
    return _ref12.apply(this, arguments);
  };
}();
var getEspectaculos = exports.getEspectaculos = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
    var _t21, _t22;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          _context13.p = 0;
          _t21 = res;
          _context13.n = 1;
          return getCategoryList('Espectáculos', 12, 'espectaculos');
        case 1:
          _t21.json.call(_t21, _context13.v);
          _context13.n = 3;
          break;
        case 2:
          _context13.p = 2;
          _t22 = _context13.v;
          console.error('[API] getEspectaculos:', _t22);
          res.status(500).json({
            message: _t22.message
          });
        case 3:
          return _context13.a(2);
      }
    }, _callee13, null, [[0, 2]]);
  }));
  return function getEspectaculos(_x29, _x30) {
    return _ref13.apply(this, arguments);
  };
}();