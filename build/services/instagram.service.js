"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateIG = exports.publishIG = exports.listIG = exports.getIG = exports.deleteIG = void 0;
var _InstagramModel = _interopRequireDefault(require("../models/Instagram.model.js"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // src/services/instagram.service.js - DEFINITIVO
var ConfigSchema = new _mongoose["default"].Schema({
  key: String,
  value: String
}, {
  timestamps: true
});
var Config = _mongoose["default"].models.Config || _mongoose["default"].model('Config', ConfigSchema);
function getToken() {
  return _getToken.apply(this, arguments);
}
function _getToken() {
  _getToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
    var cfg;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.n = 1;
          return Config.findOne({
            key: 'IG_ACCESS_TOKEN'
          });
        case 1:
          cfg = _context6.v;
          return _context6.a(2, (cfg === null || cfg === void 0 ? void 0 : cfg.value) || process.env.IG_ACCESS_TOKEN);
      }
    }, _callee6);
  }));
  return _getToken.apply(this, arguments);
}
var listIG = exports.listIG = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var dbDocs, token, IG_USER_ID, r, j, igAsDocs, existingIds, merged, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.n = 1;
          return _InstagramModel["default"].find({}).sort({
            createdAt: -1
          }).lean();
        case 1:
          dbDocs = _context.v;
          _context.p = 2;
          _context.n = 3;
          return getToken();
        case 3:
          token = _context.v;
          IG_USER_ID = process.env.IG_USER_ID;
          _context.n = 4;
          return fetch("https://graph.facebook.com/v18.0/".concat(IG_USER_ID, "/media?fields=id,caption,media_url,permalink,timestamp,media_type&limit=50&access_token=").concat(token));
        case 4:
          r = _context.v;
          _context.n = 5;
          return r.json();
        case 5:
          j = _context.v;
          if (!j.data) {
            _context.n = 6;
            break;
          }
          // Transformo las 3 de IG a tu formato de DB para que el Ui.jsx las entienda
          igAsDocs = j.data.map(function (m) {
            return {
              _id: m.id,
              // uso el id de IG como _id para poder borrarlo
              mediaUrl: m.media_url,
              originalMediaUrl: m.media_url,
              caption: m.caption || '',
              type: 'feed_1350',
              status: 'published',
              igMediaId: m.id,
              permalink: m.permalink || "https://instagram.com/p/".concat(m.id),
              createdAt: m.timestamp,
              updatedAt: m.timestamp,
              isRealIG: true
            };
          }); // Merge sin duplicar
          existingIds = new Set(dbDocs.map(function (d) {
            return d.igMediaId;
          }));
          merged = [].concat(_toConsumableArray(dbDocs), _toConsumableArray(igAsDocs.filter(function (x) {
            return !existingIds.has(x.igMediaId);
          })));
          console.log("[IG LIST BLINDADO] DB:".concat(dbDocs.length, " + IG:").concat(igAsDocs.length, " = ").concat(merged.length));
          return _context.a(2, merged);
        case 6:
          _context.n = 8;
          break;
        case 7:
          _context.p = 7;
          _t = _context.v;
          console.error('[IG LIST]', _t.message);
        case 8:
          return _context.a(2, dbDocs);
      }
    }, _callee, null, [[2, 7]]);
  }));
  return function listIG() {
    return _ref.apply(this, arguments);
  };
}();
var getIG = exports.getIG = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id) {
    var doc;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          if (!_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context2.n = 2;
            break;
          }
          _context2.n = 1;
          return _InstagramModel["default"].findById(id).lean();
        case 1:
          doc = _context2.v;
          if (!doc) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, doc);
        case 2:
          return _context2.a(2, {
            _id: id,
            igMediaId: id,
            status: 'published',
            isRealIG: true
          });
      }
    }, _callee2);
  }));
  return function getIG(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var updateIG = exports.updateIG = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id, body) {
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context3.n = 1;
            break;
          }
          throw new Error('No se puede editar una publi de IG directa, solo las de la DB');
        case 1:
          _context3.n = 2;
          return _InstagramModel["default"].findByIdAndUpdate(id, body, {
            "new": true
          });
        case 2:
          return _context3.a(2, _context3.v);
      }
    }, _callee3);
  }));
  return function updateIG(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteIG = exports.deleteIG = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id) {
    var _yield$Instagram$find;
    var token, igId, targetId, del, j, _t2, _t3, _t4, _t5;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return getToken();
        case 1:
          token = _context4.v;
          // Si me pasás un ID de IG (como 18081176357709020) lo borro directo de IG
          igId = _mongoose["default"].Types.ObjectId.isValid(id) ? null : id;
          _t2 = igId;
          if (_t2) {
            _context4.n = 6;
            break;
          }
          _context4.n = 2;
          return _InstagramModel["default"].findById(id);
        case 2:
          _t4 = _yield$Instagram$find = _context4.v;
          _t3 = _t4 === null;
          if (_t3) {
            _context4.n = 3;
            break;
          }
          _t3 = _yield$Instagram$find === void 0;
        case 3:
          if (!_t3) {
            _context4.n = 4;
            break;
          }
          _t5 = void 0;
          _context4.n = 5;
          break;
        case 4:
          _t5 = _yield$Instagram$find.igMediaId;
        case 5:
          _t2 = _t5;
        case 6:
          targetId = _t2;
          if (!targetId) {
            _context4.n = 9;
            break;
          }
          _context4.n = 7;
          return fetch("https://graph.facebook.com/v18.0/".concat(targetId, "?access_token=").concat(token), {
            method: 'DELETE'
          });
        case 7:
          del = _context4.v;
          _context4.n = 8;
          return del.json()["catch"](function () {
            return {};
          });
        case 8:
          j = _context4.v;
          console.log('[IG DELETE]', targetId, j);
        case 9:
          if (!_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context4.n = 11;
            break;
          }
          _context4.n = 10;
          return _InstagramModel["default"].findByIdAndDelete(id);
        case 10:
          _context4.n = 12;
          break;
        case 11:
          _context4.n = 12;
          return _InstagramModel["default"].deleteOne({
            igMediaId: id
          });
        case 12:
          return _context4.a(2, {
            _id: id,
            deleted: true
          });
      }
    }, _callee4);
  }));
  return function deleteIG(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var publishIG = exports.publishIG = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(body) {
    var doc;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.n = 1;
          return _InstagramModel["default"].create(_objectSpread(_objectSpread({}, body), {}, {
            originalMediaUrl: body.mediaUrl,
            status: 'published',
            igMediaId: "manual_".concat(Date.now())
          }));
        case 1:
          doc = _context5.v;
          return _context5.a(2, {
            ok: true,
            data: doc
          });
      }
    }, _callee5);
  }));
  return function publishIG(_x5) {
    return _ref5.apply(this, arguments);
  };
}();