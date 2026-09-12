"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _nodeCache = _interopRequireDefault(require("node-cache"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var router = (0, _express.Router)();

// cache en memoria para no contar 2 veces la misma IP en 5 min
var ipCache = new _nodeCache["default"]({
  stdTTL: 300,
  checkperiod: 120
});
var getPostModel = function getPostModel() {
  return _mongoose["default"].models.Post || _mongoose["default"].model('Post');
};

// POST /api/v2/views/:slug/view - incrementa views real con anti-spam
router.post('/:slug/view', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$headers$xForwar, slug, ip, key, Post, result, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          slug = req.params.slug;
          if (slug) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            ok: false
          }));
        case 1:
          ip = ((_req$headers$xForwar = req.headers['x-forwarded-for']) === null || _req$headers$xForwar === void 0 || (_req$headers$xForwar = _req$headers$xForwar.split(',')[0]) === null || _req$headers$xForwar === void 0 ? void 0 : _req$headers$xForwar.trim()) || req.ip || 'unknown';
          key = "".concat(slug, ":").concat(ip);
          if (!ipCache.get(key)) {
            _context.n = 2;
            break;
          }
          return _context.a(2, res.json({
            ok: true,
            cached: true
          }));
        case 2:
          Post = getPostModel();
          _context.n = 3;
          return Post.updateOne({
            $or: [{
              Entry_Slug: slug
            }, {
              _id: _mongoose["default"].Types.ObjectId.isValid(slug) ? slug : null
            }]
          }, {
            $inc: {
              views: 1,
              views24h: 1,
              views7d: 1,
              trendingScore: 2
            },
            $set: {
              lastViewedAt: new Date()
            }
          });
        case 3:
          result = _context.v;
          ipCache.set(key, true);
          res.json({
            ok: true,
            modified: result.modifiedCount
          });
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          console.error('[VIEWS]', _t);
          res.status(500).json({
            ok: false,
            message: _t.message
          });
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[0, 4]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// GET /api/v2/views/trending - mas leidas reales (solo ultimas 72hs con views)
router.get('/trending', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var limit, Post, since, posts, fallback, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          limit = Math.min(parseInt(req.query.limit) || 10, 30);
          Post = getPostModel();
          since = new Date(Date.now() - 72 * 60 * 60 * 1000);
          _context2.n = 1;
          return Post.find({
            $or: [{
              lastViewedAt: {
                $gte: since
              }
            }, {
              createdAt: {
                $gte: since
              }
            }],
            views24h: {
              $gt: 0
            }
          }).sort({
            trendingScore: -1,
            views24h: -1
          }).limit(limit).select('Entry_Title Entry_Slug Entry_Featured_Image Entry_Category views views24h trendingScore createdAt lastViewedAt').lean();
        case 1:
          posts = _context2.v;
          if (!(posts.length === 0)) {
            _context2.n = 3;
            break;
          }
          _context2.n = 2;
          return Post.find({
            views: {
              $gt: 0
            }
          }).sort({
            views7d: -1,
            views: -1
          }).limit(limit).select('Entry_Title Entry_Slug Entry_Featured_Image Entry_Category views views24h trendingScore createdAt').lean();
        case 2:
          fallback = _context2.v;
          return _context2.a(2, res.json({
            data: fallback,
            fallback: true
          }));
        case 3:
          res.json({
            data: posts,
            fallback: false
          });
          _context2.n = 5;
          break;
        case 4:
          _context2.p = 4;
          _t2 = _context2.v;
          console.error('[TRENDING]', _t2);
          res.status(500).json({
            message: _t2.message
          });
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 4]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// GET /api/v2/views/stats/:slug - ver stats de una nota
router.get('/stats/:slug', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var Post, post, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          Post = getPostModel();
          _context3.n = 1;
          return Post.findOne({
            Entry_Slug: req.params.slug
          }).select('Entry_Title views views24h views7d trendingScore lastViewedAt').lean();
        case 1:
          post = _context3.v;
          if (post) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2, res.status(404).json({
            message: 'No encontrado'
          }));
        case 2:
          res.json({
            data: post
          });
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t3 = _context3.v;
          res.status(500).json({
            message: _t3.message
          });
        case 4:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 3]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;