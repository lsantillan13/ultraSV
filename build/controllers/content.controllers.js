"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPortada = exports.removePortada = exports.getViajes = exports.getTecnologia = exports.getTechnologyPosts = exports.getStreaming = exports.getSportsPosts = exports.getSocialPosts = exports.getSalud = exports.getRelatedPost = exports.getPostById = exports.getPoliticalPosts = exports.getPolitica = exports.getPolicePosts = exports.getNextEightPosts = exports.getLatestPostsByCategory = exports.getLastFivePosts = exports.getLast = exports.getGastronomia = exports.getEspectaculos = exports.getEmprender = exports.getEducacion = exports.getEconomicPosts = exports.getDeportes = exports.getCultura = void 0;
var _PostModel = _interopRequireDefault(require("../models/Post.model.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var HOME_FIELDS = '_id Entry_Title Entry_Resume Entry_Featured_Image Entry_Category createdAt Entry_Is_Portada Entry_Portada_At';
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
function clearHomeCache() {
  cache["delete"]('carousel');
  cache["delete"]('component');
}
function getWidget(_x) {
  return _getWidget.apply(this, arguments);
}
function _getWidget() {
  _getWidget = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(category) {
    var limit,
      cleanCategory,
      cacheKey,
      cached,
      posts,
      result,
      _args24 = arguments;
    return _regenerator().w(function (_context24) {
      while (1) switch (_context24.n) {
        case 0:
          limit = _args24.length > 1 && _args24[1] !== undefined ? _args24[1] : 3;
          cleanCategory = String(category || '').trim();
          cacheKey = "widget:".concat(cleanCategory, ":").concat(limit);
          cached = getFromCache(cacheKey);
          if (!cached) {
            _context24.n = 1;
            break;
          }
          return _context24.a(2, cached);
        case 1:
          _context24.n = 2;
          return _PostModel["default"].find({
            Entry_Category: cleanCategory
          }).select(CATEGORY_FIELDS).sort({
            createdAt: -1
          }).limit(limit).maxTimeMS(5000).lean();
        case 2:
          posts = _context24.v;
          result = {
            portada: posts[0] || null,
            noticias: posts.slice(1)
          };
          setCache(cacheKey, result);
          return _context24.a(2, result);
      }
    }, _callee24);
  }));
  return _getWidget.apply(this, arguments);
}
function getCategoryList(_x2) {
  return _getCategoryList.apply(this, arguments);
} // --- HOME: CAROUSEL CON PORTADA FIJA ---
function _getCategoryList() {
  _getCategoryList = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(category) {
    var limit,
      cacheKey,
      cached,
      cleanCategory,
      posts,
      _args25 = arguments;
    return _regenerator().w(function (_context25) {
      while (1) switch (_context25.n) {
        case 0:
          limit = _args25.length > 1 && _args25[1] !== undefined ? _args25[1] : 12;
          cacheKey = _args25.length > 2 ? _args25[2] : undefined;
          cached = getFromCache(cacheKey);
          if (!cached) {
            _context25.n = 1;
            break;
          }
          return _context25.a(2, cached);
        case 1:
          cleanCategory = String(category).trim();
          _context25.n = 2;
          return _PostModel["default"].find({
            Entry_Category: cleanCategory
          }).select(CATEGORY_FIELDS).sort({
            createdAt: -1
          }).limit(limit).maxTimeMS(5000).lean();
        case 2:
          posts = _context25.v;
          setCache(cacheKey, posts);
          return _context25.a(2, posts);
      }
    }, _callee25);
  }));
  return _getCategoryList.apply(this, arguments);
}
var getLastFivePosts = exports.getLastFivePosts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var key, cached, portada, excludeIds, limitRest, rest, _final, _t;
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
          return _PostModel["default"].findOne({
            Entry_Is_Portada: true
          }).select(HOME_FIELDS).sort({
            Entry_Portada_At: -1
          }).lean();
        case 2:
          portada = _context.v;
          // 2. busca el resto excluyendo portada
          excludeIds = portada ? [portada._id] : [];
          limitRest = portada ? 4 : 5;
          _context.n = 3;
          return _PostModel["default"].find({
            _id: {
              $nin: excludeIds
            }
          }).select(HOME_FIELDS).sort({
            createdAt: -1
          }).limit(limitRest).maxTimeMS(5000).lean();
        case 3:
          rest = _context.v;
          _final = portada ? [portada].concat(_toConsumableArray(rest)) : rest;
          setCache(key, _final);
          res.json(_final);
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          console.error('[API] getLastFivePosts:', _t);
          res.status(500).json({
            message: _t.message
          });
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[0, 4]]);
  }));
  return function getLastFivePosts(_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

// --- HOME: ULTIMAS EXCLUYENDO CAROUSEL ---
var getNextEightPosts = exports.getNextEightPosts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var key, cached, portada, restIds, carouselIds, posts, _t2;
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
          return _PostModel["default"].findOne({
            Entry_Is_Portada: true
          }).select('_id').lean();
        case 2:
          portada = _context2.v;
          _context2.n = 3;
          return _PostModel["default"].find({
            _id: {
              $nin: portada ? [portada._id] : []
            }
          }).sort({
            createdAt: -1
          }).limit(portada ? 4 : 5).select('_id').lean();
        case 3:
          restIds = _context2.v;
          carouselIds = [].concat(_toConsumableArray(portada ? [portada._id] : []), _toConsumableArray(restIds.map(function (r) {
            return r._id;
          })));
          _context2.n = 4;
          return _PostModel["default"].find({
            _id: {
              $nin: carouselIds
            }
          }).select(HOME_FIELDS).sort({
            createdAt: -1
          }).limit(8).maxTimeMS(5000).lean();
        case 4:
          posts = _context2.v;
          setCache(key, posts);
          res.json(posts);
          _context2.n = 6;
          break;
        case 5:
          _context2.p = 5;
          _t2 = _context2.v;
          console.error('[API] getNextEightPosts:', _t2);
          res.status(500).json({
            message: _t2.message
          });
        case 6:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return function getNextEightPosts(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

// --- ADMIN: SETEAR PORTADA ---
var setPortada = exports.setPortada = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var id, updated, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          id = req.params.id; // saca todas las portadas anteriores (solo 1 a la vez)
          _context3.n = 1;
          return _PostModel["default"].updateMany({
            Entry_Is_Portada: true
          }, {
            $set: {
              Entry_Is_Portada: false,
              Entry_Portada_At: null
            }
          });
        case 1:
          _context3.n = 2;
          return _PostModel["default"].findByIdAndUpdate(id, {
            $set: {
              Entry_Is_Portada: true,
              Entry_Portada_At: new Date()
            }
          }, {
            "new": true
          }).select(HOME_FIELDS);
        case 2:
          updated = _context3.v;
          if (updated) {
            _context3.n = 3;
            break;
          }
          return _context3.a(2, res.status(404).json({
            message: 'Post not found'
          }));
        case 3:
          clearHomeCache();
          res.json({
            message: 'Portada actualizada',
            post: updated
          });
          _context3.n = 5;
          break;
        case 4:
          _context3.p = 4;
          _t3 = _context3.v;
          console.error('[API] setPortada:', _t3);
          res.status(500).json({
            message: _t3.message
          });
        case 5:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 4]]);
  }));
  return function setPortada(_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
var removePortada = exports.removePortada = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return _PostModel["default"].updateMany({
            Entry_Is_Portada: true
          }, {
            $set: {
              Entry_Is_Portada: false,
              Entry_Portada_At: null
            }
          });
        case 1:
          clearHomeCache();
          res.json({
            message: 'Portada removida, vuelve a modo automático'
          });
          _context4.n = 3;
          break;
        case 2:
          _context4.p = 2;
          _t4 = _context4.v;
          res.status(500).json({
            message: _t4.message
          });
        case 3:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 2]]);
  }));
  return function removePortada(_x9, _x0) {
    return _ref4.apply(this, arguments);
  };
}();

// --- RESTO DE TUS CONTROLLERS (igual que tenías) ---
var getPoliticalPosts = exports.getPoliticalPosts = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var _t5, _t6;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _t5 = res;
          _context5.n = 1;
          return getWidget('Política', 3);
        case 1:
          _t5.json.call(_t5, _context5.v);
          _context5.n = 3;
          break;
        case 2:
          _context5.p = 2;
          _t6 = _context5.v;
          console.error('[API] getPoliticalPosts:', _t6);
          res.status(500).json({
            message: _t6.message
          });
        case 3:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return function getPoliticalPosts(_x1, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getEconomicPosts = exports.getEconomicPosts = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var _t7, _t8;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _t7 = res;
          _context6.n = 1;
          return getWidget('Economía', 3);
        case 1:
          _t7.json.call(_t7, _context6.v);
          _context6.n = 3;
          break;
        case 2:
          _context6.p = 2;
          _t8 = _context6.v;
          console.error('[API] getEconomicPosts:', _t8);
          res.status(500).json({
            message: _t8.message
          });
        case 3:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function getEconomicPosts(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var getSocialPosts = exports.getSocialPosts = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var _t9, _t0;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          _t9 = res;
          _context7.n = 1;
          return getWidget('Sociedad', 3);
        case 1:
          _t9.json.call(_t9, _context7.v);
          _context7.n = 3;
          break;
        case 2:
          _context7.p = 2;
          _t0 = _context7.v;
          console.error('[API] getSocialPosts:', _t0);
          res.status(500).json({
            message: _t0.message
          });
        case 3:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 2]]);
  }));
  return function getSocialPosts(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var getPolicePosts = exports.getPolicePosts = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var _t1, _t10;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          _t1 = res;
          _context8.n = 1;
          return getCategoryList('Policiales', 12, 'policiales');
        case 1:
          _t1.json.call(_t1, _context8.v);
          _context8.n = 3;
          break;
        case 2:
          _context8.p = 2;
          _t10 = _context8.v;
          console.error('[API] getPolicePosts:', _t10);
          res.status(500).json({
            message: _t10.message
          });
        case 3:
          return _context8.a(2);
      }
    }, _callee8, null, [[0, 2]]);
  }));
  return function getPolicePosts(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var getSportsPosts = exports.getSportsPosts = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var _t11, _t12;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          _t11 = res;
          _context9.n = 1;
          return getCategoryList('Deportes', 12, 'deportes');
        case 1:
          _t11.json.call(_t11, _context9.v);
          _context9.n = 3;
          break;
        case 2:
          _context9.p = 2;
          _t12 = _context9.v;
          console.error('[API] getSportsPosts:', _t12);
          res.status(500).json({
            message: _t12.message
          });
        case 3:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 2]]);
  }));
  return function getSportsPosts(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var getTechnologyPosts = exports.getTechnologyPosts = /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var _t13, _t14;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          _t13 = res;
          _context0.n = 1;
          return getCategoryList('Tecnología', 12, 'tecnologia');
        case 1:
          _t13.json.call(_t13, _context0.v);
          _context0.n = 3;
          break;
        case 2:
          _context0.p = 2;
          _t14 = _context0.v;
          console.error('[API] getTechnologyPosts:', _t14);
          res.status(500).json({
            message: _t14.message
          });
        case 3:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 2]]);
  }));
  return function getTechnologyPosts(_x19, _x20) {
    return _ref0.apply(this, arguments);
  };
}();
var getLast = exports.getLast = /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var key, cached, posts, _t15;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          key = 'last';
          cached = getFromCache(key);
          if (!cached) {
            _context1.n = 1;
            break;
          }
          return _context1.a(2, res.json(cached));
        case 1:
          _context1.n = 2;
          return _PostModel["default"].find().select(HOME_FIELDS).sort({
            createdAt: -1
          }).limit(16).maxTimeMS(5000).lean();
        case 2:
          posts = _context1.v;
          setCache(key, posts);
          res.json(posts);
          _context1.n = 4;
          break;
        case 3:
          _context1.p = 3;
          _t15 = _context1.v;
          console.error('[API] getLast:', _t15);
          res.status(500).json({
            message: _t15.message
          });
        case 4:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 3]]);
  }));
  return function getLast(_x21, _x22) {
    return _ref1.apply(this, arguments);
  };
}();
var getPostById = exports.getPostById = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
    var id, post, _t16;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _context10.p = 0;
          id = req.params.id;
          if (!(!id || id.length < 10)) {
            _context10.n = 1;
            break;
          }
          return _context10.a(2, res.status(400).json({
            message: 'ID inválido'
          }));
        case 1:
          _context10.n = 2;
          return _PostModel["default"].findById(id).maxTimeMS(5000).lean();
        case 2:
          post = _context10.v;
          if (post) {
            _context10.n = 3;
            break;
          }
          return _context10.a(2, res.status(404).json({
            message: 'Post not found'
          }));
        case 3:
          res.json(post);
          _context10.n = 5;
          break;
        case 4:
          _context10.p = 4;
          _t16 = _context10.v;
          console.error('[API] getPostById:', _t16);
          res.status(500).json({
            message: _t16.message
          });
        case 5:
          return _context10.a(2);
      }
    }, _callee10, null, [[0, 4]]);
  }));
  return function getPostById(_x23, _x24) {
    return _ref10.apply(this, arguments);
  };
}();
var getLatestPostsByCategory = exports.getLatestPostsByCategory = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
    var category, cleanCategory, limit, cacheKey, cached, posts, _t17;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          category = req.params.category;
          cleanCategory = String(category || '').trim();
          if (cleanCategory) {
            _context11.n = 1;
            break;
          }
          return _context11.a(2, res.status(400).json({
            message: 'Categoría requerida'
          }));
        case 1:
          limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
          cacheKey = "buscar:".concat(cleanCategory, ":").concat(limit);
          cached = getFromCache(cacheKey);
          if (!cached) {
            _context11.n = 2;
            break;
          }
          return _context11.a(2, res.json(cached));
        case 2:
          _context11.n = 3;
          return _PostModel["default"].find({
            Entry_Category: cleanCategory
          }).select(CATEGORY_FIELDS).sort({
            createdAt: -1
          }).limit(limit).maxTimeMS(5000).lean();
        case 3:
          posts = _context11.v;
          setCache(cacheKey, posts);
          res.json(posts);
          _context11.n = 5;
          break;
        case 4:
          _context11.p = 4;
          _t17 = _context11.v;
          console.error('[API] getLatestPostsByCategory:', _t17);
          res.status(500).json({
            message: _t17.message
          });
        case 5:
          return _context11.a(2);
      }
    }, _callee11, null, [[0, 4]]);
  }));
  return function getLatestPostsByCategory(_x25, _x26) {
    return _ref11.apply(this, arguments);
  };
}();
var getRelatedPost = exports.getRelatedPost = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
    var _req$params, category, postId, cleanCategory, cacheKey, cached, posts, _t18;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _context12.p = 0;
          _req$params = req.params, category = _req$params.category, postId = _req$params.postId;
          cleanCategory = String(category || '').trim();
          if (!(!cleanCategory || !postId)) {
            _context12.n = 1;
            break;
          }
          return _context12.a(2, res.status(400).json({
            message: 'Parámetros inválidos'
          }));
        case 1:
          cacheKey = "related:".concat(cleanCategory, ":").concat(postId);
          cached = getFromCache(cacheKey);
          if (!cached) {
            _context12.n = 2;
            break;
          }
          return _context12.a(2, res.json(cached));
        case 2:
          _context12.n = 3;
          return _PostModel["default"].find({
            Entry_Category: cleanCategory,
            _id: {
              $ne: postId
            }
          }).select(CATEGORY_FIELDS).sort({
            createdAt: -1
          }).limit(4).maxTimeMS(5000).lean();
        case 3:
          posts = _context12.v;
          setCache(cacheKey, posts);
          res.json(posts);
          _context12.n = 5;
          break;
        case 4:
          _context12.p = 4;
          _t18 = _context12.v;
          console.error('[API] getRelatedPost:', _t18);
          res.status(500).json({
            message: _t18.message
          });
        case 5:
          return _context12.a(2);
      }
    }, _callee12, null, [[0, 4]]);
  }));
  return function getRelatedPost(_x27, _x28) {
    return _ref12.apply(this, arguments);
  };
}();
var getStreaming = exports.getStreaming = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
    var _t19, _t20;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          _context13.p = 0;
          _t19 = res;
          _context13.n = 1;
          return getCategoryList('Streaming', 12, 'streaming');
        case 1:
          _t19.json.call(_t19, _context13.v);
          _context13.n = 3;
          break;
        case 2:
          _context13.p = 2;
          _t20 = _context13.v;
          console.error('[API] getStreaming:', _t20);
          res.status(500).json({
            message: _t20.message
          });
        case 3:
          return _context13.a(2);
      }
    }, _callee13, null, [[0, 2]]);
  }));
  return function getStreaming(_x29, _x30) {
    return _ref13.apply(this, arguments);
  };
}();
var getEmprender = exports.getEmprender = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
    var _t21, _t22;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.p = _context14.n) {
        case 0:
          _context14.p = 0;
          _t21 = res;
          _context14.n = 1;
          return getCategoryList('Emprender', 12, 'emprender');
        case 1:
          _t21.json.call(_t21, _context14.v);
          _context14.n = 3;
          break;
        case 2:
          _context14.p = 2;
          _t22 = _context14.v;
          console.error('[API] getEmprender:', _t22);
          res.status(500).json({
            message: _t22.message
          });
        case 3:
          return _context14.a(2);
      }
    }, _callee14, null, [[0, 2]]);
  }));
  return function getEmprender(_x31, _x32) {
    return _ref14.apply(this, arguments);
  };
}();
var getEspectaculos = exports.getEspectaculos = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
    var _t23, _t24;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          _context15.p = 0;
          _t23 = res;
          _context15.n = 1;
          return getCategoryList('Espectáculos', 12, 'espectaculos');
        case 1:
          _t23.json.call(_t23, _context15.v);
          _context15.n = 3;
          break;
        case 2:
          _context15.p = 2;
          _t24 = _context15.v;
          console.error('[API] getEspectaculos:', _t24);
          res.status(500).json({
            message: _t24.message
          });
        case 3:
          return _context15.a(2);
      }
    }, _callee15, null, [[0, 2]]);
  }));
  return function getEspectaculos(_x33, _x34) {
    return _ref15.apply(this, arguments);
  };
}();
var getDeportes = exports.getDeportes = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
    var _t25, _t26;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.p = _context16.n) {
        case 0:
          _context16.p = 0;
          _t25 = res;
          _context16.n = 1;
          return getCategoryList('Deportes', 12, 'deportes');
        case 1:
          _t25.json.call(_t25, _context16.v);
          _context16.n = 3;
          break;
        case 2:
          _context16.p = 2;
          _t26 = _context16.v;
          console.error('[API] getDeportes:', _t26);
          res.status(500).json({
            message: _t26.message
          });
        case 3:
          return _context16.a(2);
      }
    }, _callee16, null, [[0, 2]]);
  }));
  return function getDeportes(_x35, _x36) {
    return _ref16.apply(this, arguments);
  };
}();
var getTecnologia = exports.getTecnologia = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
    var _t27, _t28;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.p = _context17.n) {
        case 0:
          _context17.p = 0;
          _t27 = res;
          _context17.n = 1;
          return getCategoryList('Tecnología', 12, 'tecnologia');
        case 1:
          _t27.json.call(_t27, _context17.v);
          _context17.n = 3;
          break;
        case 2:
          _context17.p = 2;
          _t28 = _context17.v;
          console.error('[API] getTecnologia:', _t28);
          res.status(500).json({
            message: _t28.message
          });
        case 3:
          return _context17.a(2);
      }
    }, _callee17, null, [[0, 2]]);
  }));
  return function getTecnologia(_x37, _x38) {
    return _ref17.apply(this, arguments);
  };
}();
var getCultura = exports.getCultura = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res) {
    var _t29, _t30;
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.p = _context18.n) {
        case 0:
          _context18.p = 0;
          _t29 = res;
          _context18.n = 1;
          return getCategoryList('Cultura', 12, 'cultura');
        case 1:
          _t29.json.call(_t29, _context18.v);
          _context18.n = 3;
          break;
        case 2:
          _context18.p = 2;
          _t30 = _context18.v;
          console.error('[API] getCultura:', _t30);
          res.status(500).json({
            message: _t30.message
          });
        case 3:
          return _context18.a(2);
      }
    }, _callee18, null, [[0, 2]]);
  }));
  return function getCultura(_x39, _x40) {
    return _ref18.apply(this, arguments);
  };
}();
var getPolitica = exports.getPolitica = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(req, res) {
    var _t31, _t32;
    return _regenerator().w(function (_context19) {
      while (1) switch (_context19.p = _context19.n) {
        case 0:
          _context19.p = 0;
          _t31 = res;
          _context19.n = 1;
          return getCategoryList('Política', 12, 'politica');
        case 1:
          _t31.json.call(_t31, _context19.v);
          _context19.n = 3;
          break;
        case 2:
          _context19.p = 2;
          _t32 = _context19.v;
          console.error('[API] getPolitica:', _t32);
          res.status(500).json({
            message: _t32.message
          });
        case 3:
          return _context19.a(2);
      }
    }, _callee19, null, [[0, 2]]);
  }));
  return function getPolitica(_x41, _x42) {
    return _ref19.apply(this, arguments);
  };
}();
var getSalud = exports.getSalud = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(req, res) {
    var _t33, _t34;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.p = _context20.n) {
        case 0:
          _context20.p = 0;
          _t33 = res;
          _context20.n = 1;
          return getCategoryList('Salud', 12, 'salud');
        case 1:
          _t33.json.call(_t33, _context20.v);
          _context20.n = 3;
          break;
        case 2:
          _context20.p = 2;
          _t34 = _context20.v;
          console.error('[API] getSalud:', _t34);
          res.status(500).json({
            message: _t34.message
          });
        case 3:
          return _context20.a(2);
      }
    }, _callee20, null, [[0, 2]]);
  }));
  return function getSalud(_x43, _x44) {
    return _ref20.apply(this, arguments);
  };
}();
var getEducacion = exports.getEducacion = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(req, res) {
    var _t35, _t36;
    return _regenerator().w(function (_context21) {
      while (1) switch (_context21.p = _context21.n) {
        case 0:
          _context21.p = 0;
          _t35 = res;
          _context21.n = 1;
          return getCategoryList('Educación', 12, 'educacion');
        case 1:
          _t35.json.call(_t35, _context21.v);
          _context21.n = 3;
          break;
        case 2:
          _context21.p = 2;
          _t36 = _context21.v;
          console.error('[API] getEducacion:', _t36);
          res.status(500).json({
            message: _t36.message
          });
        case 3:
          return _context21.a(2);
      }
    }, _callee21, null, [[0, 2]]);
  }));
  return function getEducacion(_x45, _x46) {
    return _ref21.apply(this, arguments);
  };
}();
var getViajes = exports.getViajes = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(req, res) {
    var _t37, _t38;
    return _regenerator().w(function (_context22) {
      while (1) switch (_context22.p = _context22.n) {
        case 0:
          _context22.p = 0;
          _t37 = res;
          _context22.n = 1;
          return getCategoryList('Viajes', 12, 'viajes');
        case 1:
          _t37.json.call(_t37, _context22.v);
          _context22.n = 3;
          break;
        case 2:
          _context22.p = 2;
          _t38 = _context22.v;
          console.error('[API] getViajes:', _t38);
          res.status(500).json({
            message: _t38.message
          });
        case 3:
          return _context22.a(2);
      }
    }, _callee22, null, [[0, 2]]);
  }));
  return function getViajes(_x47, _x48) {
    return _ref22.apply(this, arguments);
  };
}();
var getGastronomia = exports.getGastronomia = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(req, res) {
    var _t39, _t40;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.p = _context23.n) {
        case 0:
          _context23.p = 0;
          _t39 = res;
          _context23.n = 1;
          return getCategoryList('Gastronomía', 12, 'gastronomia');
        case 1:
          _t39.json.call(_t39, _context23.v);
          _context23.n = 3;
          break;
        case 2:
          _context23.p = 2;
          _t40 = _context23.v;
          console.error('[API] getGastronomia:', _t40);
          res.status(500).json({
            message: _t40.message
          });
        case 3:
          return _context23.a(2);
      }
    }, _callee23, null, [[0, 2]]);
  }));
  return function getGastronomia(_x49, _x50) {
    return _ref23.apply(this, arguments);
  };
}();