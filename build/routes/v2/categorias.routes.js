"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var router = (0, _express.Router)();
var getPostModel = function getPostModel() {
  return _mongoose["default"].models.Post || _mongoose["default"].model('Post');
};
var normalize = function normalize() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return decodeURIComponent(str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').trim();
};

// MAPEO REAL -> como está en tu DB o como queremos buscarlo
var CATEGORIAS_CONFIG = {
  'politica': {
    type: 'category',
    value: 'Política',
    search: 'politica'
  },
  'infraestructura': {
    type: 'tag_or_search',
    value: 'infraestructura',
    search: 'infraestructura'
  },
  'sociedad': {
    type: 'category',
    value: 'Sociedad',
    search: 'sociedad'
  },
  'economia': {
    type: 'category',
    value: 'Economía',
    search: 'economia'
  },
  'vaca-muerta': {
    type: 'tag_or_search',
    value: 'vaca muerta',
    search: 'vaca muerta'
  },
  'federal-a': {
    type: 'tag_or_search',
    value: 'federal a',
    search: 'federal a'
  },
  'lifune': {
    type: 'tag_or_search',
    value: 'lifune',
    search: 'lifune'
  },
  'rugby': {
    type: 'tag_or_search',
    value: 'rugby',
    search: 'rugby'
  },
  'voley': {
    type: 'tag_or_search',
    value: 'voley',
    search: 'voley'
  },
  'policiales': {
    type: 'category',
    value: 'Policiales',
    search: 'policiales'
  },
  'deportes': {
    type: 'category',
    value: 'Deportes',
    search: 'deportes'
  }
};
var buildFilter = function buildFilter(config) {
  if (config.type === 'category') {
    // Con collation strength 1, esto matchea Politica, Política, politica, POLITICA
    return {
      Entry_Category: config.search
    };
  }
  // tag_or_search -> busca en tags, titulo y categoria
  if (config.type === 'tag_or_search') {
    var v = config.search;
    return {
      $or: [{
        Entry_Tags: {
          $regex: v,
          $options: 'i'
        }
      }, {
        Entry_Category: {
          $regex: v,
          $options: 'i'
        }
      }, {
        Entry_Title: {
          $regex: v,
          $options: 'i'
        }
      }]
    };
  }
  return {};
};

// GET /api/v2/categorias -> debug, te dice cuantas tenes por cada una MERGEADO
router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var Post, distinctCats, all, merged, _iterator, _step, _step$value, _id, count, slug, current, counts, _t, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          Post = getPostModel(); // distinct real
          _context2.n = 1;
          return Post.distinct('Entry_Category');
        case 1:
          distinctCats = _context2.v;
          _context2.n = 2;
          return Post.aggregate([{
            $group: {
              _id: "$Entry_Category",
              count: {
                $sum: 1
              }
            }
          }]);
        case 2:
          all = _context2.v;
          merged = new Map();
          _iterator = _createForOfIteratorHelper(all);
          _context2.p = 3;
          _iterator.s();
        case 4:
          if ((_step = _iterator.n()).done) {
            _context2.n = 7;
            break;
          }
          _step$value = _step.value, _id = _step$value._id, count = _step$value.count;
          if (_id) {
            _context2.n = 5;
            break;
          }
          return _context2.a(3, 6);
        case 5:
          slug = normalize(_id);
          current = merged.get(slug) || {
            slug: slug,
            count: 0,
            queries: []
          };
          current.count += count;
          current.queries.push(_id);
          merged.set(slug, current);
        case 6:
          _context2.n = 4;
          break;
        case 7:
          _context2.n = 9;
          break;
        case 8:
          _context2.p = 8;
          _t = _context2.v;
          _iterator.e(_t);
        case 9:
          _context2.p = 9;
          _iterator.f();
          return _context2.f(9);
        case 10:
          _context2.n = 11;
          return Promise.all(Object.entries(CATEGORIAS_CONFIG).map(/*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref2) {
              var _ref4, slug, cfg, c;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    _ref4 = _slicedToArray(_ref2, 2), slug = _ref4[0], cfg = _ref4[1];
                    _context.n = 1;
                    return Post.countDocuments(buildFilter(cfg)).collation({
                      locale: 'es',
                      strength: 1
                    });
                  case 1:
                    c = _context.v;
                    return _context.a(2, {
                      slug: slug,
                      query: cfg.value,
                      count: c
                    });
                }
              }, _callee);
            }));
            return function (_x3) {
              return _ref3.apply(this, arguments);
            };
          }()));
        case 11:
          counts = _context2.v;
          res.json({
            counts: counts.sort(function (a, b) {
              return b.count - a.count;
            }),
            distinctCats: distinctCats,
            merged: Array.from(merged.values())
          });
          _context2.n = 13;
          break;
        case 12:
          _context2.p = 12;
          _t2 = _context2.v;
          res.status(500).json({
            message: _t2.message
          });
        case 13:
          return _context2.a(2);
      }
    }, _callee2, null, [[3, 8, 9, 10], [0, 12]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// GET /api/v2/categorias/:slug -> trae 20 de esa categoria
router.get('/:slug', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var Post, rawSlug, limit, key, config, filter, posts, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          Post = getPostModel();
          rawSlug = req.params.slug;
          limit = Math.min(parseInt(req.query.limit) || 20, 50); // ESTO ARREGLA /política -> /politica
          key = normalize(rawSlug);
          config = CATEGORIAS_CONFIG[key];
          if (config) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, res.status(404).json({
            message: "Categoria ".concat(rawSlug, " (").concat(key, ") no configurada"),
            disponibles: Object.keys(CATEGORIAS_CONFIG)
          }));
        case 1:
          filter = buildFilter(config);
          _context3.n = 2;
          return Post.find(filter).collation({
            locale: 'es',
            strength: 1
          }) // ignora tildes y mayusculas
          .sort({
            createdAt: -1
          }).limit(limit).select('Entry_Title Entry_Slug Entry_Category Entry_Featured_Image Entry_Resume Entry_ID Entry_Tags createdAt').lean();
        case 2:
          posts = _context3.v;
          res.json({
            category: key,
            // siempre sin tilde
            realQuery: config.value,
            // con tilde para mostrar en front
            count: posts.length,
            data: posts
          });
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t3 = _context3.v;
          console.error('[CATEGORIAS]', _t3);
          res.status(500).json({
            message: _t3.message
          });
        case 4:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 3]]);
  }));
  return function (_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;