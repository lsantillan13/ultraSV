"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateIG = exports.publishIG = exports.listIG = exports.getIG = exports.deleteIG = void 0;
var _InstagramModel = _interopRequireDefault(require("../models/Instagram.model.js"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var IG_USER_ID = process.env.IG_USER_ID;
var CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'ihytdbtw';
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
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return _InstagramModel["default"].find({}).sort({
            createdAt: -1
          }).lean();
        case 1:
          return _context.a(2, _context.v);
      }
    }, _callee);
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
          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context2.n = 1;
            break;
          }
          throw new Error('ID invalido');
        case 1:
          _context2.n = 2;
          return _InstagramModel["default"].findById(id).lean();
        case 2:
          doc = _context2.v;
          if (doc) {
            _context2.n = 3;
            break;
          }
          throw new Error('No encontrado');
        case 3:
          return _context2.a(2, doc);
      }
    }, _callee2);
  }));
  return function getIG(_x) {
    return _ref2.apply(this, arguments);
  };
}();
var updateIG = exports.updateIG = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id, body) {
    var updated;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context3.n = 1;
            break;
          }
          throw new Error('ID invalido');
        case 1:
          _context3.n = 2;
          return _InstagramModel["default"].findByIdAndUpdate(id, body, {
            "new": true
          });
        case 2:
          updated = _context3.v;
          if (updated) {
            _context3.n = 3;
            break;
          }
          throw new Error('No encontrado para editar');
        case 3:
          return _context3.a(2, updated);
      }
    }, _callee3);
  }));
  return function updateIG(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteIG = exports.deleteIG = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id) {
    var doc, token, _t;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          if (_mongoose["default"].Types.ObjectId.isValid(id)) {
            _context4.n = 1;
            break;
          }
          throw new Error('ID invalido');
        case 1:
          _context4.n = 2;
          return _InstagramModel["default"].findById(id);
        case 2:
          doc = _context4.v;
          if (doc) {
            _context4.n = 3;
            break;
          }
          throw new Error('No encontrado');
        case 3:
          _context4.n = 4;
          return getToken();
        case 4:
          token = _context4.v;
          if (!(doc.status === 'published' && doc.igMediaId && !String(doc.igMediaId).startsWith('error_'))) {
            _context4.n = 8;
            break;
          }
          _context4.p = 5;
          _context4.n = 6;
          return fetch("https://graph.facebook.com/v18.0/".concat(doc.igMediaId, "?access_token=").concat(token), {
            method: 'DELETE'
          });
        case 6:
          console.log('[IG] Borrado de IG OK', doc.igMediaId);
          _context4.n = 8;
          break;
        case 7:
          _context4.p = 7;
          _t = _context4.v;
          console.log('[IG] No se pudo borrar de IG:', _t.message);
        case 8:
          _context4.n = 9;
          return _InstagramModel["default"].findByIdAndDelete(id);
        case 9:
          return _context4.a(2, doc);
      }
    }, _callee4, null, [[5, 7]]);
  }));
  return function deleteIG(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var publishIG = exports.publishIG = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(_ref5) {
    var mediaUrl, caption, _ref5$type, type, token, doc;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          mediaUrl = _ref5.mediaUrl, caption = _ref5.caption, _ref5$type = _ref5.type, type = _ref5$type === void 0 ? 'feed_1350' : _ref5$type;
          _context5.n = 1;
          return getToken();
        case 1:
          token = _context5.v;
          _context5.n = 2;
          return _InstagramModel["default"].create({
            mediaUrl: mediaUrl,
            originalMediaUrl: mediaUrl,
            caption: caption,
            type: type,
            status: 'published',
            igMediaId: "manual_".concat(Date.now())
          });
        case 2:
          doc = _context5.v;
          return _context5.a(2, {
            ok: true,
            data: doc
          });
      }
    }, _callee5);
  }));
  return function publishIG(_x5) {
    return _ref6.apply(this, arguments);
  };
}();