"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var router = (0, _express.Router)();
var cacheV2 = function cacheV2(req, res, next) {
  res.set('Cache-Control', 'public, max-age=30, s-maxage=120');
  next();
};
var getPostModel = function getPostModel() {
  return _mongoose["default"].models.Post || _mongoose["default"].models.post || _mongoose["default"].model('Post');
};

// ==========================
// 1. LISTADO - /admin
// GET /api/v2/posts?page=1&limit=50&search=neuquen
// ==========================
router.get('/', cacheV2, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var Post, page, limit, search, skip, filter, regex, _yield$Promise$all, _yield$Promise$all2, posts, total, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          Post = getPostModel();
          page = Math.max(parseInt(req.query.page) || 1, 1);
          limit = Math.min(parseInt(req.query.limit) || 20, 100);
          search = req.query.search || req.query.q || '';
          skip = (page - 1) * limit;
          filter = {};
          if (search && search.length >= 2) {
            regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
            filter.$or = [{
              Entry_Title: regex
            }, {
              Entry_Resume: regex
            }, {
              Entry_Tags: regex
            }, {
              Entry_Category: regex
            }];
          }
          _context.n = 1;
          return Promise.all([Post.find(filter).sort({
            createdAt: -1
          }).skip(skip).limit(limit).lean(), Post.countDocuments(filter)]);
        case 1:
          _yield$Promise$all = _context.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          posts = _yield$Promise$all2[0];
          total = _yield$Promise$all2[1];
          res.json({
            data: posts,
            posts: posts,
            total: total,
            page: page,
            pages: Math.ceil(total / limit),
            version: 'v2'
          });
          _context.n = 3;
          break;
        case 2:
          _context.p = 2;
          _t = _context.v;
          console.error('[v2 posts /]', _t);
          res.status(500).json({
            message: _t.message
          });
        case 3:
          return _context.a(2);
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// ==========================
// 2. SEARCH
// ==========================
router.get('/search', cacheV2, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var Post, _req$query, q, search, _req$query$limit, limit, query, l, regex, posts, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          Post = getPostModel();
          _req$query = req.query, q = _req$query.q, search = _req$query.search, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 12 : _req$query$limit;
          query = q || search;
          if (!(!query || query.length < 2)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.json({
            data: [],
            posts: [],
            q: query
          }));
        case 1:
          l = Math.min(parseInt(limit), 30);
          regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
          _context2.n = 2;
          return Post.find({
            $or: [{
              Entry_Title: regex
            }, {
              Entry_Resume: regex
            }, {
              Entry_Tags: regex
            }, {
              Entry_Category: regex
            }]
          }).sort({
            createdAt: -1
          }).limit(l).lean();
        case 2:
          posts = _context2.v;
          res.json({
            data: posts,
            posts: posts,
            q: query,
            count: posts.length
          });
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          res.status(500).json({
            message: _t2.message
          });
        case 4:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 3]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/last', cacheV2, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var Post, limit, posts, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          Post = getPostModel();
          limit = Math.min(parseInt(req.query.limit) || 1, 10);
          _context3.n = 1;
          return Post.find({}).sort({
            createdAt: -1
          }).limit(limit).lean();
        case 1:
          posts = _context3.v;
          res.json({
            data: limit === 1 ? posts[0] : posts,
            posts: posts,
            version: 'v2'
          });
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t3 = _context3.v;
          res.status(500).json({
            message: _t3.message
          });
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// ==========================
// 3. CAROUSEL OPCIONAL - 1 GRANDE + 4 CHICAS
// Si no hay nada elegido, cae por fecha (tu idea de portada fija)
// GET /api/v2/posts/carousel
// ==========================
router.get('/carousel', cacheV2, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var Post, main, sides, _main, excludeIds, faltan, autoSides, carousel, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          Post = getPostModel(); // intenta traer elegidos manualmente
          _context4.n = 1;
          return Post.findOne({
            carouselMain: true
          }).sort({
            carouselMainAt: -1,
            updatedAt: -1
          }).lean();
        case 1:
          main = _context4.v;
          if (main) {
            _context4.n = 3;
            break;
          }
          _context4.n = 2;
          return Post.findOne({
            Entry_Is_Portada: true
          }).sort({
            Entry_Portada_At: -1,
            updatedAt: -1
          }).lean();
        case 2:
          main = _context4.v;
        case 3:
          _context4.n = 4;
          return Post.find({
            carouselSide: true
          }).sort({
            carouselOrder: 1,
            carouselSideAt: -1,
            updatedAt: -1
          }).limit(4).lean();
        case 4:
          sides = _context4.v;
          if (main) {
            _context4.n = 6;
            break;
          }
          _context4.n = 5;
          return Post.find({}).sort({
            createdAt: -1
          }).limit(1).lean().then(function (r) {
            return r[0];
          });
        case 5:
          main = _context4.v;
        case 6:
          if (!(sides.length < 4)) {
            _context4.n = 8;
            break;
          }
          excludeIds = [(_main = main) === null || _main === void 0 ? void 0 : _main._id].concat(_toConsumableArray(sides.map(function (s) {
            return s._id;
          }))).filter(Boolean);
          faltan = 4 - sides.length;
          _context4.n = 7;
          return Post.find({
            _id: {
              $nin: excludeIds
            }
          }).sort({
            createdAt: -1
          }).limit(faltan).lean();
        case 7:
          autoSides = _context4.v;
          sides = [].concat(_toConsumableArray(sides), _toConsumableArray(autoSides));
        case 8:
          carousel = [main].concat(_toConsumableArray(sides)).filter(Boolean);
          res.json({
            data: carousel,
            posts: carousel,
            main: main,
            sides: sides,
            version: 'v2-carousel-opcional'
          });
          _context4.n = 10;
          break;
        case 9:
          _context4.p = 9;
          _t4 = _context4.v;
          console.error('[carousel]', _t4);
          res.status(500).json({
            message: _t4.message
          });
        case 10:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// ==========================
// 4. PORTADA SOLA - por si querés dejarla fija
// GET /api/v2/posts/portada
// ==========================
router.get('/portada', cacheV2, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var Post, post, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          Post = getPostModel();
          _context5.n = 1;
          return Post.findOne({
            carouselMain: true
          }).sort({
            carouselMainAt: -1
          }).lean();
        case 1:
          post = _context5.v;
          if (post) {
            _context5.n = 3;
            break;
          }
          _context5.n = 2;
          return Post.findOne({
            Entry_Is_Portada: true
          }).sort({
            Entry_Portada_At: -1
          }).lean();
        case 2:
          post = _context5.v;
        case 3:
          if (post) {
            _context5.n = 5;
            break;
          }
          _context5.n = 4;
          return Post.findOne({}).sort({
            createdAt: -1
          }).lean();
        case 4:
          post = _context5.v;
        case 5:
          res.json({
            data: post,
            post: post,
            version: 'v2'
          });
          _context5.n = 7;
          break;
        case 6:
          _context5.p = 6;
          _t5 = _context5.v;
          res.status(500).json({
            message: _t5.message
          });
        case 7:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 6]]);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}());

// Para compatibilidad con tu código viejo que usaba /destacada singular
router.get('/destacada', cacheV2, /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var Post, post, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          Post = getPostModel();
          _context6.n = 1;
          return Post.findOne({
            carouselMain: true
          }).sort({
            carouselMainAt: -1
          }).lean();
        case 1:
          post = _context6.v;
          if (post) {
            _context6.n = 3;
            break;
          }
          _context6.n = 2;
          return Post.findOne({
            Entry_Is_Portada: true
          }).sort({
            Entry_Portada_At: -1
          }).lean();
        case 2:
          post = _context6.v;
        case 3:
          if (post) {
            _context6.n = 5;
            break;
          }
          _context6.n = 4;
          return Post.findOne({}).sort({
            createdAt: -1
          }).lean();
        case 4:
          post = _context6.v;
        case 5:
          res.json({
            data: post,
            version: 'v2'
          });
          _context6.n = 7;
          break;
        case 6:
          _context6.p = 6;
          _t6 = _context6.v;
          res.status(500).json({
            message: _t6.message
          });
        case 7:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 6]]);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}());

// ==========================
// 5. 5 DESTACADAS A ELECCIÓN - OPCIONAL
// GET /api/v2/posts/destacadas
// Si no elegís, trae mas-leidas o últimas
// ==========================
router.get('/destacadas', cacheV2, /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var Post, posts, sort, exclude, faltan, auto, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          Post = getPostModel();
          _context7.n = 1;
          return Post.find({
            destacada: true
          }).sort({
            destacadaOrder: 1,
            destacadaAt: -1,
            updatedAt: -1
          }).limit(5).lean();
        case 1:
          posts = _context7.v;
          if (!(posts.length === 0)) {
            _context7.n = 3;
            break;
          }
          sort = Post.schema.path('views') ? {
            views: -1,
            createdAt: -1
          } : {
            createdAt: -1
          };
          _context7.n = 2;
          return Post.find({}).sort(sort).limit(5).lean();
        case 2:
          posts = _context7.v;
        case 3:
          if (!(posts.length > 0 && posts.length < 5)) {
            _context7.n = 5;
            break;
          }
          exclude = posts.map(function (p) {
            return p._id;
          });
          faltan = 5 - posts.length;
          _context7.n = 4;
          return Post.find({
            _id: {
              $nin: exclude
            }
          }).sort({
            createdAt: -1
          }).limit(faltan).lean();
        case 4:
          auto = _context7.v;
          posts = [].concat(_toConsumableArray(posts), _toConsumableArray(auto));
        case 5:
          res.json({
            data: posts,
            posts: posts,
            version: 'v2-destacadas-opcional',
            total: posts.length
          });
          _context7.n = 7;
          break;
        case 6:
          _context7.p = 6;
          _t7 = _context7.v;
          console.error('[destacadas]', _t7);
          res.status(500).json({
            message: _t7.message
          });
        case 7:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 6]]);
  }));
  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}());
router.get('/ultimas', cacheV2, /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var limit, Post, posts, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          limit = Math.min(parseInt(req.query.limit) || 12, 30);
          Post = getPostModel();
          _context8.n = 1;
          return Post.find({}).sort({
            createdAt: -1
          }).limit(limit).lean();
        case 1:
          posts = _context8.v;
          res.json({
            data: posts,
            posts: posts,
            version: 'v2'
          });
          _context8.n = 3;
          break;
        case 2:
          _context8.p = 2;
          _t8 = _context8.v;
          res.status(500).json({
            message: _t8.message
          });
        case 3:
          return _context8.a(2);
      }
    }, _callee8, null, [[0, 2]]);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}());
router.get('/mas-leidas', cacheV2, /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var limit, Post, sort, posts, _t9;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          limit = Math.min(parseInt(req.query.limit) || 5, 10);
          Post = getPostModel();
          sort = Post.schema.path('views') ? {
            views: -1,
            createdAt: -1
          } : {
            createdAt: -1
          };
          _context9.n = 1;
          return Post.find({}).sort(sort).limit(limit).lean();
        case 1:
          posts = _context9.v;
          res.json({
            data: posts,
            posts: posts,
            version: 'v2',
            total: posts.length
          });
          _context9.n = 3;
          break;
        case 2:
          _context9.p = 2;
          _t9 = _context9.v;
          res.status(500).json({
            message: _t9.message
          });
        case 3:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 2]]);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}());
router.get('/slugs', cacheV2, /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var Post, posts, _t0;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          Post = getPostModel();
          _context0.n = 1;
          return Post.find({}).select('Entry_Title Entry_Slug').sort({
            createdAt: -1
          }).limit(20).lean();
        case 1:
          posts = _context0.v;
          res.json(posts);
          _context0.n = 3;
          break;
        case 2:
          _context0.p = 2;
          _t0 = _context0.v;
          res.status(500).json({
            message: _t0.message
          });
        case 3:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 2]]);
  }));
  return function (_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}());

// ==========================
// 6. ADMIN PATCH - NO SE PISAN ENTRE SÍ
// ==========================
router.patch('/:id/portada', /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var Post, active, _t1;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          Post = getPostModel();
          active = req.body.active;
          if (!active) {
            _context1.n = 4;
            break;
          }
          _context1.n = 1;
          return Post.updateMany({}, {
            $set: {
              Entry_Is_Portada: false
            }
          });
        case 1:
          _context1.n = 2;
          return Post.updateMany({}, {
            $set: {
              carouselMain: false
            }
          });
        case 2:
          _context1.n = 3;
          return Post.findByIdAndUpdate(req.params.id, {
            Entry_Is_Portada: true,
            Entry_Portada_At: new Date(),
            carouselMain: true,
            carouselMainAt: new Date()
          });
        case 3:
          _context1.n = 5;
          break;
        case 4:
          _context1.n = 5;
          return Post.findByIdAndUpdate(req.params.id, {
            Entry_Is_Portada: false,
            carouselMain: false
          });
        case 5:
          res.json({
            ok: true
          });
          _context1.n = 7;
          break;
        case 6:
          _context1.p = 6;
          _t1 = _context1.v;
          res.status(500).json({
            message: _t1.message
          });
        case 7:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 6]]);
  }));
  return function (_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}());
router.patch('/:id/carousel-main', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
    var Post, active, _t10;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _context10.p = 0;
          Post = getPostModel();
          active = req.body.active;
          if (!active) {
            _context10.n = 3;
            break;
          }
          _context10.n = 1;
          return Post.updateMany({}, {
            $set: {
              carouselMain: false
            }
          });
        case 1:
          _context10.n = 2;
          return Post.findByIdAndUpdate(req.params.id, {
            carouselMain: true,
            carouselMainAt: new Date()
          });
        case 2:
          _context10.n = 4;
          break;
        case 3:
          _context10.n = 4;
          return Post.findByIdAndUpdate(req.params.id, {
            carouselMain: false
          });
        case 4:
          res.json({
            ok: true
          });
          _context10.n = 6;
          break;
        case 5:
          _context10.p = 5;
          _t10 = _context10.v;
          res.status(500).json({
            message: _t10.message
          });
        case 6:
          return _context10.a(2);
      }
    }, _callee10, null, [[0, 5]]);
  }));
  return function (_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}());
router.patch('/:id/carousel-side', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
    var Post, _req$body, active, order, update, _t11;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          Post = getPostModel();
          _req$body = req.body, active = _req$body.active, order = _req$body.order;
          update = {
            carouselSide: !!active
          };
          if (typeof order === 'number') update.carouselOrder = order;
          if (active) update.carouselSideAt = new Date();
          _context11.n = 1;
          return Post.findByIdAndUpdate(req.params.id, update);
        case 1:
          res.json({
            ok: true
          });
          _context11.n = 3;
          break;
        case 2:
          _context11.p = 2;
          _t11 = _context11.v;
          res.status(500).json({
            message: _t11.message
          });
        case 3:
          return _context11.a(2);
      }
    }, _callee11, null, [[0, 2]]);
  }));
  return function (_x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}());
router.patch('/:id/destacada', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
    var Post, _req$body2, active, order, update, _t12;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _context12.p = 0;
          Post = getPostModel();
          _req$body2 = req.body, active = _req$body2.active, order = _req$body2.order;
          update = {
            destacada: !!active
          };
          if (typeof order === 'number') update.destacadaOrder = order;
          if (active) update.destacadaAt = new Date();
          _context12.n = 1;
          return Post.findByIdAndUpdate(req.params.id, update);
        case 1:
          res.json({
            ok: true
          });
          _context12.n = 3;
          break;
        case 2:
          _context12.p = 2;
          _t12 = _context12.v;
          res.status(500).json({
            message: _t12.message
          });
        case 3:
          return _context12.a(2);
      }
    }, _callee12, null, [[0, 2]]);
  }));
  return function (_x25, _x26) {
    return _ref12.apply(this, arguments);
  };
}());

// ESTE SIEMPRE ULTIMO
router.get('/:id', /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
    var id, Post, post, _t13;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          _context13.p = 0;
          id = req.params.id;
          if (!['search', 'last', 'destacada', 'destacadas', 'portada', 'carousel', 'ultimas', 'mas-leidas', 'slugs'].includes(id)) {
            _context13.n = 1;
            break;
          }
          return _context13.a(2, res.status(404).json({
            message: 'Ruta no encontrada'
          }));
        case 1:
          Post = getPostModel();
          post = null;
          if (!_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context13.n = 3;
            break;
          }
          _context13.n = 2;
          return Post.findById(id).lean();
        case 2:
          post = _context13.v;
        case 3:
          if (post) {
            _context13.n = 5;
            break;
          }
          _context13.n = 4;
          return Post.findOne({
            Entry_Slug: id
          }).lean();
        case 4:
          post = _context13.v;
        case 5:
          if (post) {
            _context13.n = 6;
            break;
          }
          return _context13.a(2, res.status(404).json({
            message: 'No encontrado'
          }));
        case 6:
          res.json({
            data: post,
            post: post
          });
          _context13.n = 8;
          break;
        case 7:
          _context13.p = 7;
          _t13 = _context13.v;
          res.status(500).json({
            message: _t13.message
          });
        case 8:
          return _context13.a(2);
      }
    }, _callee13, null, [[0, 7]]);
  }));
  return function (_x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;