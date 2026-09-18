"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var slugify = function slugify() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').substring(0, 110);
};
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
          if (req.query.portada === 'true') filter.Entry_Is_Portada = true;
          if (req.query.destacada === 'true') filter.destacada = true;
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
            if (filter.Entry_Is_Portada) delete filter.$or; // si es portada=true, prioriza eso
          }
          _context.n = 1;
          return Promise.all([Post.find(filter).sort({
            updatedAt: -1,
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
router.get('/carousel', cacheV2, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var Post, main, sides, _main, excludeIds, faltan, autoSides, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          Post = getPostModel();
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
          res.json({
            data: [main].concat(_toConsumableArray(sides)).filter(Boolean),
            posts: [main].concat(_toConsumableArray(sides)).filter(Boolean),
            main: main,
            sides: sides,
            version: 'v2'
          });
          _context4.n = 10;
          break;
        case 9:
          _context4.p = 9;
          _t4 = _context4.v;
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

// FIX: ahora portada devuelve 5 como carousel para el admin
router.get('/portada', cacheV2, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var Post, main, sides, _main2, excludeIds, auto, all, _t5;
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
          main = _context5.v;
          if (main) {
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
          main = _context5.v;
        case 3:
          _context5.n = 4;
          return Post.find({
            carouselSide: true
          }).sort({
            carouselOrder: 1,
            carouselSideAt: -1
          }).limit(4).lean();
        case 4:
          sides = _context5.v;
          if (main) {
            _context5.n = 6;
            break;
          }
          _context5.n = 5;
          return Post.find({}).sort({
            createdAt: -1
          }).limit(1).lean().then(function (r) {
            return r[0];
          });
        case 5:
          main = _context5.v;
        case 6:
          if (!(sides.length < 4)) {
            _context5.n = 8;
            break;
          }
          excludeIds = [(_main2 = main) === null || _main2 === void 0 ? void 0 : _main2._id].concat(_toConsumableArray(sides.map(function (s) {
            return s._id;
          }))).filter(Boolean);
          _context5.n = 7;
          return Post.find({
            _id: {
              $nin: excludeIds
            }
          }).sort({
            createdAt: -1
          }).limit(4 - sides.length).lean();
        case 7:
          auto = _context5.v;
          sides = [].concat(_toConsumableArray(sides), _toConsumableArray(auto));
        case 8:
          all = [main].concat(_toConsumableArray(sides)).filter(Boolean);
          res.json({
            data: all,
            posts: all,
            main: main,
            sides: sides,
            version: 'v2'
          });
          _context5.n = 10;
          break;
        case 9:
          _context5.p = 9;
          _t5 = _context5.v;
          res.status(500).json({
            message: _t5.message
          });
        case 10:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}());
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
            destacada: true
          }).sort({
            destacadaAt: -1
          }).lean();
        case 1:
          post = _context6.v;
          if (post) {
            _context6.n = 3;
            break;
          }
          _context6.n = 2;
          return Post.findOne({}).sort({
            createdAt: -1
          }).lean();
        case 2:
          post = _context6.v;
        case 3:
          res.json({
            data: post,
            version: 'v2'
          });
          _context6.n = 5;
          break;
        case 4:
          _context6.p = 4;
          _t6 = _context6.v;
          res.status(500).json({
            message: _t6.message
          });
        case 5:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 4]]);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}());
router.get('/destacadas', cacheV2, /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var Post, posts, exclude, auto, _t7;
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
            destacadaAt: -1
          }).limit(5).lean();
        case 1:
          posts = _context7.v;
          if (posts.length) {
            _context7.n = 3;
            break;
          }
          _context7.n = 2;
          return Post.find({}).sort({
            createdAt: -1
          }).limit(5).lean();
        case 2:
          posts = _context7.v;
        case 3:
          if (!(posts.length < 5)) {
            _context7.n = 5;
            break;
          }
          exclude = posts.map(function (p) {
            return p._id;
          });
          _context7.n = 4;
          return Post.find({
            _id: {
              $nin: exclude
            }
          }).sort({
            createdAt: -1
          }).limit(5 - posts.length).lean();
        case 4:
          auto = _context7.v;
          posts = [].concat(_toConsumableArray(posts), _toConsumableArray(auto));
        case 5:
          res.json({
            data: posts,
            posts: posts,
            total: posts.length
          });
          _context7.n = 7;
          break;
        case 6:
          _context7.p = 6;
          _t7 = _context7.v;
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
    var Post, posts, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          Post = getPostModel();
          _context8.n = 1;
          return Post.find({}).sort({
            createdAt: -1
          }).limit(Math.min(parseInt(req.query.limit) || 12, 30)).lean();
        case 1:
          posts = _context8.v;
          res.json({
            data: posts,
            posts: posts
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
    var Post, sort, posts, _t9;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          Post = getPostModel();
          sort = Post.schema.path('views') ? {
            views: -1,
            createdAt: -1
          } : {
            createdAt: -1
          };
          _context9.n = 1;
          return Post.find({}).sort(sort).limit(Math.min(parseInt(req.query.limit) || 5, 10)).lean();
        case 1:
          posts = _context9.v;
          res.json({
            data: posts,
            posts: posts
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
router.patch('/:id/portada', /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var Post, _t1;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          Post = getPostModel();
          console.log("[PATCH portada] ".concat(req.params.id, " active=").concat(req.body.active));
          if (!req.body.active) {
            _context1.n = 3;
            break;
          }
          _context1.n = 1;
          return Post.updateMany({}, {
            $set: {
              Entry_Is_Portada: false,
              carouselMain: false
            }
          });
        case 1:
          _context1.n = 2;
          return Post.findByIdAndUpdate(req.params.id, {
            Entry_Is_Portada: true,
            Entry_Portada_At: new Date(),
            carouselMain: true,
            carouselMainAt: new Date(),
            portada: true
          });
        case 2:
          _context1.n = 4;
          break;
        case 3:
          _context1.n = 4;
          return Post.findByIdAndUpdate(req.params.id, {
            Entry_Is_Portada: false,
            carouselMain: false,
            portada: false
          });
        case 4:
          res.json({
            ok: true
          });
          _context1.n = 6;
          break;
        case 5:
          _context1.p = 5;
          _t1 = _context1.v;
          res.status(500).json({
            message: _t1.message
          });
        case 6:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 5]]);
  }));
  return function (_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}());
router.patch('/:id/carousel-main', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
    var Post, _t10;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _context10.p = 0;
          Post = getPostModel();
          if (!req.body.active) {
            _context10.n = 3;
            break;
          }
          _context10.n = 1;
          return Post.updateMany({}, {
            $set: {
              carouselMain: false,
              Entry_Is_Portada: false
            }
          });
        case 1:
          _context10.n = 2;
          return Post.findByIdAndUpdate(req.params.id, {
            carouselMain: true,
            carouselMainAt: new Date(),
            Entry_Is_Portada: true,
            Entry_Portada_At: new Date()
          });
        case 2:
          _context10.n = 4;
          break;
        case 3:
          _context10.n = 4;
          return Post.findByIdAndUpdate(req.params.id, {
            carouselMain: false,
            Entry_Is_Portada: false
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
    var Post, update, _t11;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          Post = getPostModel();
          update = {
            carouselSide: !!req.body.active
          };
          if (typeof req.body.order === 'number') update.carouselOrder = req.body.order;
          if (req.body.active) update.carouselSideAt = new Date();else {
            update.carouselOrder = null;
          }
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
    var Post, update, _t12;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _context12.p = 0;
          Post = getPostModel();
          update = {
            destacada: !!req.body.active
          };
          if (typeof req.body.order === 'number') update.destacadaOrder = req.body.order;
          if (req.body.active) update.destacadaAt = new Date();
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
router.get('/slug/:slug', cacheV2, /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
    var Post, post, _t13;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          _context13.p = 0;
          Post = getPostModel();
          _context13.n = 1;
          return Post.findOne({
            Entry_Slug: req.params.slug
          }).lean();
        case 1:
          post = _context13.v;
          if (post) {
            _context13.n = 2;
            break;
          }
          return _context13.a(2, res.status(404).json({
            message: 'No encontrado'
          }));
        case 2:
          res.json({
            data: post,
            post: post
          });
          _context13.n = 4;
          break;
        case 3:
          _context13.p = 3;
          _t13 = _context13.v;
          res.status(500).json({
            message: _t13.message
          });
        case 4:
          return _context13.a(2);
      }
    }, _callee13, null, [[0, 3]]);
  }));
  return function (_x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}());
router.put('/:id', /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
    var Post, existing, body, oldSlug, parts, last, hasShortId, base, updated, _t14;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.p = _context14.n) {
        case 0:
          _context14.p = 0;
          Post = getPostModel();
          _context14.n = 1;
          return Post.findById(req.params.id).lean();
        case 1:
          existing = _context14.v;
          if (existing) {
            _context14.n = 2;
            break;
          }
          return _context14.a(2, res.status(404).json({
            message: 'No encontrado'
          }));
        case 2:
          body = _objectSpread({}, req.body);
          oldSlug = existing.Entry_Slug || '';
          parts = oldSlug.split('-');
          last = parts[parts.length - 1] || '';
          hasShortId = /^[a-z0-9]{6,10}$/.test(last) && oldSlug.includes('-');
          base = '';
          if (body.Entry_Slug && String(body.Entry_Slug).trim() && String(body.Entry_Slug) !== 'undefined') {
            base = slugify(body.Entry_Slug);
          } else if (body.Entry_Title) {
            base = slugify(body.Entry_Title);
          } else {
            base = slugify(existing.Entry_Title);
          }
          base = base.replace(/-[a-z0-9]{6,10}$/, '');
          if (hasShortId) {
            body.Entry_Slug = "".concat(base, "-").concat(last);
          } else {
            body.Entry_Slug = "".concat(base, "-").concat(req.params.id.slice(-6).toLowerCase());
          }
          _context14.n = 3;
          return Post.findByIdAndUpdate(req.params.id, body, {
            "new": true
          });
        case 3:
          updated = _context14.v;
          res.json({
            data: updated,
            post: updated
          });
          _context14.n = 5;
          break;
        case 4:
          _context14.p = 4;
          _t14 = _context14.v;
          console.error('[PUT v2]', _t14);
          res.status(500).json({
            message: _t14.message
          });
        case 5:
          return _context14.a(2);
      }
    }, _callee14, null, [[0, 4]]);
  }));
  return function (_x29, _x30) {
    return _ref14.apply(this, arguments);
  };
}());
router["delete"]('/:id', /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
    var Post, id, deleted, _t15, _t16;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          _context15.p = 0;
          Post = getPostModel();
          id = req.params.id;
          if (!_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context15.n = 2;
            break;
          }
          _context15.n = 1;
          return Post.findByIdAndDelete(id);
        case 1:
          _t15 = _context15.v;
          _context15.n = 4;
          break;
        case 2:
          _context15.n = 3;
          return Post.findOneAndDelete({
            Entry_Slug: id
          });
        case 3:
          _t15 = _context15.v;
        case 4:
          deleted = _t15;
          if (deleted) {
            _context15.n = 5;
            break;
          }
          return _context15.a(2, res.status(404).json({
            status: 404,
            message: 'ID no existe',
            path: req.originalUrl
          }));
        case 5:
          res.json({
            ok: true,
            message: 'Borrado V2',
            id: id
          });
          _context15.n = 7;
          break;
        case 6:
          _context15.p = 6;
          _t16 = _context15.v;
          res.status(500).json({
            message: _t16.message
          });
        case 7:
          return _context15.a(2);
      }
    }, _callee15, null, [[0, 6]]);
  }));
  return function (_x31, _x32) {
    return _ref15.apply(this, arguments);
  };
}());
router.get('/:id', /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
    var id, Post, post, _t17, _t18;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.p = _context16.n) {
        case 0:
          _context16.p = 0;
          id = req.params.id;
          if (!['search', 'last', 'destacada', 'destacadas', 'portada', 'carousel', 'ultimas', 'mas-leidas', 'slugs', 'slug'].includes(id)) {
            _context16.n = 1;
            break;
          }
          return _context16.a(2, res.status(404).json({
            message: 'Ruta no encontrada'
          }));
        case 1:
          Post = getPostModel();
          if (!_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context16.n = 3;
            break;
          }
          _context16.n = 2;
          return Post.findById(id).lean();
        case 2:
          _t17 = _context16.v;
          _context16.n = 4;
          break;
        case 3:
          _t17 = null;
        case 4:
          post = _t17;
          if (post) {
            _context16.n = 6;
            break;
          }
          _context16.n = 5;
          return Post.findOne({
            Entry_Slug: id
          }).lean();
        case 5:
          post = _context16.v;
        case 6:
          if (!(!post && /^[a-z0-9]{6,10}$/.test(id))) {
            _context16.n = 8;
            break;
          }
          _context16.n = 7;
          return Post.findOne({
            Entry_Slug: {
              $regex: "-".concat(id, "$")
            }
          }).lean();
        case 7:
          post = _context16.v;
        case 8:
          if (post) {
            _context16.n = 9;
            break;
          }
          return _context16.a(2, res.status(404).json({
            message: 'No encontrado'
          }));
        case 9:
          res.json({
            data: post,
            post: post
          });
          _context16.n = 11;
          break;
        case 10:
          _context16.p = 10;
          _t18 = _context16.v;
          res.status(500).json({
            message: _t18.message
          });
        case 11:
          return _context16.a(2);
      }
    }, _callee16, null, [[0, 10]]);
  }));
  return function (_x33, _x34) {
    return _ref16.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;