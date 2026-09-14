"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var router = (0, _express.Router)();
var getPostModel = function getPostModel() {
  return _mongoose["default"].models.Post || _mongoose["default"].model('Post');
};
var CATEGORIAS = [{
  slug: 'anticipacion-politica',
  label: 'Anticipación Política',
  grupo: 'POLÍTICA Y ACTUALIDAD'
}, {
  slug: 'politica',
  label: 'Política',
  grupo: 'POLÍTICA Y ACTUALIDAD'
}, {
  slug: 'internacionales',
  label: 'Internacionales',
  grupo: 'POLÍTICA Y ACTUALIDAD'
}, {
  slug: 'policiales',
  label: 'Policiales',
  grupo: 'POLICIAL / JUDICIAL'
}, {
  slug: 'judiciales',
  label: 'Judiciales',
  grupo: 'POLICIAL / JUDICIAL'
}, {
  slug: 'seguridad',
  label: 'Seguridad',
  grupo: 'POLICIAL / JUDICIAL'
}, {
  slug: 'sociedad',
  label: 'Sociedad',
  grupo: 'NEUQUÉN'
}, {
  slug: 'ciudad',
  label: 'Ciudad',
  grupo: 'NEUQUÉN'
}, {
  slug: 'region',
  label: 'Región',
  grupo: 'NEUQUÉN'
}, {
  slug: 'infraestructura',
  label: 'Infraestructura',
  grupo: 'NEUQUÉN'
}, {
  slug: 'obras',
  label: 'Obras',
  grupo: 'NEUQUÉN'
}, {
  slug: 'rutas',
  label: 'Rutas',
  grupo: 'NEUQUÉN'
}, {
  slug: 'transito-y-transporte',
  label: 'Tránsito y Transporte',
  grupo: 'NEUQUÉN'
}, {
  slug: 'clima',
  label: 'Clima',
  grupo: 'NEUQUÉN'
}, {
  slug: 'cooperativas',
  label: 'Cooperativas',
  grupo: 'NEUQUÉN'
}, {
  slug: 'vivienda-y-habitat',
  label: 'Vivienda y Hábitat',
  grupo: 'NEUQUÉN'
}, {
  slug: 'inmobiliarias',
  label: 'Inmobiliarias',
  grupo: 'NEUQUÉN'
}, {
  slug: 'economia',
  label: 'Economía',
  grupo: 'ECONOMÍA'
}, {
  slug: 'emprender',
  label: 'Emprender',
  grupo: 'ECONOMÍA'
}, {
  slug: 'vaca-muerta',
  label: 'Vaca Muerta',
  grupo: 'ECONOMÍA'
}, {
  slug: 'energia',
  label: 'Energía',
  grupo: 'ECONOMÍA'
}, {
  slug: 'campo-y-produccion',
  label: 'Campo y Producción',
  grupo: 'ECONOMÍA'
}, {
  slug: 'trabajo',
  label: 'Trabajo',
  grupo: 'ECONOMÍA'
}, {
  slug: 'gremiales',
  label: 'Gremiales',
  grupo: 'ECONOMÍA'
}, {
  slug: 'jubilados-y-anses',
  label: 'Jubilados y ANSES',
  grupo: 'ECONOMÍA'
}, {
  slug: 'salud',
  label: 'Salud',
  grupo: 'SERVICIO'
}, {
  slug: 'educacion',
  label: 'Educación',
  grupo: 'SERVICIO'
}, {
  slug: 'ciencia-y-tecnologia',
  label: 'Ciencia y Tecnología',
  grupo: 'SERVICIO'
}, {
  slug: 'tecnologia',
  label: 'Tecnología',
  grupo: 'SERVICIO'
}, {
  slug: 'servicio-feriados',
  label: 'Servicio / Feriados',
  grupo: 'SERVICIO'
}, {
  slug: 'loteria-y-quiniela',
  label: 'Lotería y Quiniela',
  grupo: 'SERVICIO'
}, {
  slug: 'deportes',
  label: 'Deportes',
  grupo: 'DEPORTES'
}, {
  slug: 'deporte-local',
  label: 'Deporte Local',
  grupo: 'DEPORTES'
}, {
  slug: 'gaming-y-esports',
  label: 'Gaming y Esports',
  grupo: 'DEPORTES'
}, {
  slug: 'espectaculos',
  label: 'Espectáculos',
  grupo: 'CULTURA Y SHOW'
}, {
  slug: 'los40',
  label: 'Los40',
  grupo: 'CULTURA Y SHOW'
}, {
  slug: 'streaming',
  label: 'Streaming',
  grupo: 'CULTURA Y SHOW'
}, {
  slug: 'cultura',
  label: 'Cultura',
  grupo: 'CULTURA Y SHOW'
}, {
  slug: 'redes',
  label: 'Redes',
  grupo: 'CULTURA Y SHOW'
}, {
  slug: 'agenda',
  label: 'Agenda',
  grupo: 'CULTURA Y SHOW'
}, {
  slug: 'lifestyle',
  label: 'Lifestyle',
  grupo: 'ESTILO DE VIDA'
}, {
  slug: 'gastronomia',
  label: 'Gastronomía',
  grupo: 'ESTILO DE VIDA'
}, {
  slug: 'turismo',
  label: 'Turismo',
  grupo: 'ESTILO DE VIDA'
}, {
  slug: 'ambiente',
  label: 'Ambiente',
  grupo: 'ESTILO DE VIDA'
}, {
  slug: 'mascotas',
  label: 'Mascotas',
  grupo: 'ESTILO DE VIDA'
}, {
  slug: 'genero-y-diversidad',
  label: 'Género y Diversidad',
  grupo: 'ESTILO DE VIDA'
}, {
  slug: 'institucional',
  label: 'Institucional',
  grupo: 'INSTITUCIONAL'
}];
router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var Post, counts, mapCount, data, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          Post = getPostModel();
          _context.n = 1;
          return Post.aggregate([{
            $group: {
              _id: "$Entry_Category",
              total: {
                $sum: 1
              }
            }
          }]);
        case 1:
          counts = _context.v;
          mapCount = Object.fromEntries(counts.map(function (c) {
            return [c._id, c.total];
          }));
          data = CATEGORIAS.map(function (cat) {
            return _objectSpread(_objectSpread({}, cat), {}, {
              total: mapCount[cat.slug] || 0,
              value: cat.slug
            });
          });
          res.set('Cache-Control', 'public, max-age=60, s-maxage=300');
          res.json({
            data: data
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
router.get('/:slug', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var Post, slug, cat, limit, page, _yield$Promise$all, _yield$Promise$all2, posts, total, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          Post = getPostModel();
          slug = req.params.slug.toLowerCase();
          cat = CATEGORIAS.find(function (c) {
            return c.slug === slug;
          });
          if (cat) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.status(404).json({
            message: 'Categoria no existe',
            disponibles: CATEGORIAS.map(function (c) {
              return c.slug;
            })
          }));
        case 1:
          limit = Math.min(parseInt(req.query.limit) || 20, 50);
          page = Math.max(parseInt(req.query.page) || 1, 1);
          _context2.n = 2;
          return Promise.all([Post.find({
            Entry_Category: slug
          }).sort({
            createdAt: -1
          }).skip((page - 1) * limit).limit(limit).select('Entry_Title Entry_Slug Entry_Category Entry_Featured_Image Entry_Resume Entry_ID createdAt views trendingScore').lean(), Post.countDocuments({
            Entry_Category: slug
          })]);
        case 2:
          _yield$Promise$all = _context2.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          posts = _yield$Promise$all2[0];
          total = _yield$Promise$all2[1];
          res.set('Cache-Control', 'public, max-age=30, s-maxage=120');
          res.json({
            categoria: cat,
            data: posts,
            pagination: {
              page: page,
              limit: limit,
              total: total,
              pages: Math.ceil(total / limit)
            }
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
var _default = exports["default"] = router;