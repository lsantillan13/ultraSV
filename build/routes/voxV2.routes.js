"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _BoletinCorteModel = _interopRequireDefault(require("../models/BoletinCorte.model.js"));
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
var router = _express["default"].Router();
var SECCIONES_ALIAS = {
  'que-hacer-en-neuquen': ['que-hacer-en-neuquen', 'que-hacer', 'turismo', 'cultura'],
  'deporte-local': ['deporte-local', 'deportes', 'deporte', 'futbol'],
  'infraestructura': ['infraestructura', 'obras', 'urbanismo'],
  'economia': ['economia', 'economía', 'negocios'],
  'vaca-muerta': ['vaca-muerta', 'vaca muerta', 'energia', 'energía', 'economia'],
  'ciudad': ['ciudad', 'neuquen', 'neuquén']
};
function getEntriesCollection() {
  var _mongoose$connection;
  if ((_mongoose$connection = _mongoose["default"].connection) !== null && _mongoose$connection !== void 0 && _mongoose$connection.db) return _mongoose["default"].connection.db.collection('entries');
  throw new Error('Mongo no conectado');
}
var cacheFarm = {
  data: null,
  ts: 0
};
var cacheRutas = {
  data: null,
  ts: 0
};
var TTL = 30 * 60 * 1000;

// SECTION
router.get('/section/:slug', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var slug, _req$query, _req$query$limit, limit, _req$query$page, page, _req$query$excludeIds, excludeIds, entriesCol, cats, query, ids, lim, pg, _yield$Promise$all, _yield$Promise$all2, data, total, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          slug = req.params.slug;
          _req$query = req.query, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 12 : _req$query$limit, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$excludeIds = _req$query.excludeIds, excludeIds = _req$query$excludeIds === void 0 ? '' : _req$query$excludeIds;
          entriesCol = getEntriesCollection();
          cats = SECCIONES_ALIAS[slug] || [slug];
          query = {
            $and: [{
              $or: [{
                Entry_Category: {
                  $in: cats
                }
              }, {
                Entry_Category: {
                  $in: cats.map(function (c) {
                    return c.toUpperCase();
                  })
                }
              }]
            }, {
              Entry_Status: {
                $ne: 'draft'
              }
            }]
          };
          if (excludeIds) {
            ids = excludeIds.split(',').filter(Boolean).map(function (id) {
              try {
                return new _mongoose["default"].Types.ObjectId(id);
              } catch (_unused) {
                return null;
              }
            }).filter(Boolean);
            if (ids.length) query.$and.push({
              _id: {
                $nin: ids
              }
            });
          }
          lim = Math.min(parseInt(limit) || 12, 30);
          pg = Math.max(parseInt(page) || 1, 1);
          _context.n = 1;
          return Promise.all([entriesCol.find(query).sort({
            Entry_Published_At: -1,
            _id: -1
          }).skip((pg - 1) * lim).limit(lim).toArray(), entriesCol.countDocuments(query)]);
        case 1:
          _yield$Promise$all = _context.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          data = _yield$Promise$all2[0];
          total = _yield$Promise$all2[1];
          res.json({
            section: slug,
            aliases: cats,
            data: data,
            total: total,
            page: pg,
            hasMore: total > pg * lim
          });
          _context.n = 3;
          break;
        case 2:
          _context.p = 2;
          _t = _context.v;
          res.status(500).json({
            error: _t.message
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

// HOME - con boletin REAL
router.get('/home', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var entriesCol, analyticsCol, carousel, excludeIds, ultimas, masLeidas, topViews, ids, secciones, _i, _arr, sec, cats, boletin, _t2, _t3, _t4;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          entriesCol = getEntriesCollection();
          analyticsCol = _mongoose["default"].connection.db.collection('analytics_views');
          _context2.n = 1;
          return entriesCol.find({
            Entry_Status: {
              $ne: 'draft'
            }
          }).sort({
            Entry_Published_At: -1,
            _id: -1
          }).limit(5).toArray();
        case 1:
          carousel = _context2.v;
          excludeIds = carousel.map(function (c) {
            return c._id;
          });
          _context2.n = 2;
          return entriesCol.find({
            _id: {
              $nin: excludeIds
            },
            Entry_Status: {
              $ne: 'draft'
            }
          }).sort({
            Entry_Published_At: -1
          }).limit(6).toArray();
        case 2:
          ultimas = _context2.v;
          masLeidas = [];
          _context2.p = 3;
          _context2.n = 4;
          return analyticsCol.aggregate([{
            $match: {
              timestamp: {
                $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              }
            }
          }, {
            $group: {
              _id: "$entryId",
              total: {
                $sum: 1
              }
            }
          }, {
            $sort: {
              total: -1
            }
          }, {
            $limit: 5
          }]).toArray();
        case 4:
          topViews = _context2.v;
          if (!(topViews.length > 0)) {
            _context2.n = 6;
            break;
          }
          ids = topViews.map(function (v) {
            try {
              return new _mongoose["default"].Types.ObjectId(v._id);
            } catch (_unused2) {
              return null;
            }
          }).filter(Boolean);
          _context2.n = 5;
          return entriesCol.find({
            _id: {
              $in: ids
            }
          }).toArray();
        case 5:
          masLeidas = _context2.v;
          _context2.n = 8;
          break;
        case 6:
          _context2.n = 7;
          return entriesCol.find({}).sort({
            Entry_Published_At: -1
          }).limit(5).toArray();
        case 7:
          masLeidas = _context2.v;
        case 8:
          _context2.n = 11;
          break;
        case 9:
          _context2.p = 9;
          _t2 = _context2.v;
          _context2.n = 10;
          return entriesCol.find({}).sort({
            Entry_Published_At: -1
          }).limit(5).toArray();
        case 10:
          masLeidas = _context2.v;
        case 11:
          secciones = {};
          _i = 0, _arr = ['que-hacer-en-neuquen', 'deporte-local', 'infraestructura', 'vaca-muerta'];
        case 12:
          if (!(_i < _arr.length)) {
            _context2.n = 15;
            break;
          }
          sec = _arr[_i];
          cats = SECCIONES_ALIAS[sec] || [sec];
          _context2.n = 13;
          return entriesCol.find({
            Entry_Category: {
              $in: [].concat(_toConsumableArray(cats), _toConsumableArray(cats.map(function (c) {
                return c.toUpperCase();
              })))
            }
          }).sort({
            Entry_Published_At: -1
          }).limit(4).toArray();
        case 13:
          secciones[sec] = _context2.v;
        case 14:
          _i++;
          _context2.n = 12;
          break;
        case 15:
          boletin = null;
          _context2.p = 16;
          _context2.n = 17;
          return _BoletinCorteModel["default"].findOne({
            estado: 'vigente'
          }).sort({
            createdAt: -1
          }).lean();
        case 17:
          boletin = _context2.v;
          _context2.n = 19;
          break;
        case 18:
          _context2.p = 18;
          _t3 = _context2.v;
        case 19:
          res.json({
            carousel: carousel,
            ultimas: ultimas,
            masLeidas: masLeidas,
            secciones: secciones,
            boletin: boletin,
            timestamp: new Date()
          });
          _context2.n = 21;
          break;
        case 20:
          _context2.p = 20;
          _t4 = _context2.v;
          res.status(500).json({
            error: _t4.message
          });
        case 21:
          return _context2.a(2);
      }
    }, _callee2, null, [[16, 18], [3, 9], [0, 20]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// SERVICIOS - FASE 2
router.get('/servicios/cortes', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var data;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return _BoletinCorteModel["default"].find({
            estado: 'vigente'
          }).sort({
            createdAt: -1
          }).limit(5).lean();
        case 1:
          data = _context3.v;
          res.json(data);
        case 2:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post('/admin/cortes', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _req$body, fechaTexto, horario, zonas, motivo, titulo, doc;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _req$body = req.body, fechaTexto = _req$body.fechaTexto, horario = _req$body.horario, zonas = _req$body.zonas, motivo = _req$body.motivo, titulo = _req$body.titulo;
          if (!(!fechaTexto || !horario || !zonas)) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2, res.status(400).json({
            error: 'faltan fechaTexto, horario, zonas'
          }));
        case 1:
          _context4.n = 2;
          return _BoletinCorteModel["default"].create({
            fechaTexto: fechaTexto,
            horario: horario,
            zonas: zonas,
            motivo: motivo,
            titulo: titulo
          });
        case 2:
          doc = _context4.v;
          res.json({
            ok: true,
            data: doc
          });
        case 3:
          return _context4.a(2);
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]('/admin/cortes/:id', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.n = 1;
          return _BoletinCorteModel["default"].findByIdAndUpdate(req.params.id, {
            estado: 'archivado'
          });
        case 1:
          res.json({
            ok: true
          });
        case 2:
          return _context5.a(2);
      }
    }, _callee5);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}());
router.get('/servicios/farmacias', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var farmacias, result;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          if (!(cacheFarm.data && Date.now() - cacheFarm.ts < TTL)) {
            _context6.n = 1;
            break;
          }
          return _context6.a(2, res.json(cacheFarm.data));
        case 1:
          farmacias = [{
            nombre: 'Farmacia Del Pueblo',
            direccion: 'Av. Argentina 123',
            telefono: '299 442-1234',
            barrio: 'Centro',
            turno: '24hs'
          }, {
            nombre: 'Farmacia Pasteur',
            direccion: 'Sarmiento 456',
            telefono: '299 443-5678',
            barrio: 'Centro Este',
            turno: 'Hasta 22hs'
          }, {
            nombre: 'Farmacia Norte',
            direccion: 'Ruta 22 Km 5',
            telefono: '299 444-9012',
            barrio: 'Alta Barda',
            turno: '24hs'
          }];
          result = {
            fecha: new Date().toISOString().split('T')[0],
            fuente: 'Col. Farm. NQN',
            farmacias: farmacias,
            total: farmacias.length
          };
          cacheFarm = {
            data: result,
            ts: Date.now()
          };
          res.json(result);
        case 2:
          return _context6.a(2);
      }
    }, _callee6);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}());
router.get('/servicios/rutas', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var rutas, result;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          if (!(cacheRutas.data && Date.now() - cacheRutas.ts < TTL)) {
            _context7.n = 1;
            break;
          }
          return _context7.a(2, res.json(cacheRutas.data));
        case 1:
          rutas = [{
            ruta: 'RN 22',
            tramo: 'Neuquén - Plottier',
            estado: 'Transitable',
            observacion: 'Obra km 1235, desvío señalizado'
          }, {
            ruta: 'RN 40',
            tramo: 'Zapala - Junín',
            estado: 'Transitable con precaución',
            observacion: 'Viento fuerte'
          }, {
            ruta: 'RN 237',
            tramo: 'Piedra del Águila',
            estado: 'Transitable',
            observacion: 'Normal'
          }];
          result = {
            actualizacion: new Date(),
            fuente: 'Vialidad',
            rutas: rutas,
            total: rutas.length
          };
          cacheRutas = {
            data: result,
            ts: Date.now()
          };
          res.json(result);
        case 2:
          return _context7.a(2);
      }
    }, _callee7);
  }));
  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}());
router.post('/newsletter/subscribe', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var _req$body$email;
    var email, col;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.n) {
        case 0:
          email = (_req$body$email = req.body.email) === null || _req$body$email === void 0 ? void 0 : _req$body$email.toLowerCase();
          if (email !== null && email !== void 0 && email.includes('@')) {
            _context8.n = 1;
            break;
          }
          return _context8.a(2, res.status(400).json({
            error: 'email inválido'
          }));
        case 1:
          col = _mongoose["default"].connection.db.collection('newsletter_subs');
          _context8.n = 2;
          return col.updateOne({
            email: email
          }, {
            $set: {
              email: email,
              estado: 'activo',
              createdAt: new Date()
            }
          }, {
            upsert: true
          });
        case 2:
          res.json({
            ok: true
          });
        case 3:
          return _context8.a(2);
      }
    }, _callee8);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}());
router.post('/analytics/view/:id', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var _t5;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          _context9.n = 1;
          return _mongoose["default"].connection.db.collection('analytics_views').insertOne({
            entryId: req.params.id,
            timestamp: new Date(),
            ip: req.ip
          });
        case 1:
          res.json({
            ok: true
          });
          _context9.n = 3;
          break;
        case 2:
          _context9.p = 2;
          _t5 = _context9.v;
          res.status(500).json({
            error: _t5.message
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
router.get('/sections', function (req, res) {
  res.json({
    sections: Object.keys(SECCIONES_ALIAS).map(function (slug) {
      return {
        slug: slug,
        alias: SECCIONES_ALIAS[slug]
      };
    })
  });
});
var _default = exports["default"] = router;