"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.isModerator = exports.isAdmin = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config"));
var _UserModel = _interopRequireDefault(require("../models/User.model.js"));
var _RoleModel = _interopRequireDefault(require("../models/Role.model.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var verifyToken = exports.verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res, next) {
    var token, decoded, user, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          token = req.headers["x-access-token"];
          if (token) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(403).json({
            message: "No token provided"
          }));
        case 1:
          decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
          req.userId = decoded.id;
          _context.n = 2;
          return _UserModel["default"].findById(req.userId, {
            password: 0
          });
        case 2:
          user = _context.v;
          if (user) {
            _context.n = 3;
            break;
          }
          return _context.a(2, res.status(404).json({
            message: 'no user found'
          }));
        case 3:
          next();
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          return _context.a(2, res.status(401).json({
            message: 'Unauthorized',
            err: _t
          }));
        case 5:
          ;
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[0, 4]]);
  }));
  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var isModerator = exports.isModerator = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res, next) {
    var user, roles, i;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return _UserModel["default"].findById(req.userId);
        case 1:
          user = _context2.v;
          _context2.n = 2;
          return _RoleModel["default"].find({
            _id: {
              $in: user.roles
            }
          });
        case 2:
          roles = _context2.v;
          i = 0;
        case 3:
          if (!(i < roles.length)) {
            _context2.n = 5;
            break;
          }
          if (!(roles[i].name === "moderator")) {
            _context2.n = 4;
            break;
          }
          next();
          return _context2.a(2);
        case 4:
          i++;
          _context2.n = 3;
          break;
        case 5:
          return _context2.a(2, res.status(403).json({
            message: 'Require Moderator role'
          }));
      }
    }, _callee2);
  }));
  return function isModerator(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var isAdmin = exports.isAdmin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res, next) {
    var user, roles, i;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return _UserModel["default"].findById(req.userId);
        case 1:
          user = _context3.v;
          _context3.n = 2;
          return _RoleModel["default"].find({
            _id: {
              $in: user.roles
            }
          });
        case 2:
          roles = _context3.v;
          i = 0;
        case 3:
          if (!(i < roles.length)) {
            _context3.n = 5;
            break;
          }
          if (!(roles[i].name === "admin")) {
            _context3.n = 4;
            break;
          }
          next();
          return _context3.a(2);
        case 4:
          i++;
          _context3.n = 3;
          break;
        case 5:
          return _context3.a(2, res.status(403).json({
            message: 'Require Admin role'
          }));
      }
    }, _callee3);
  }));
  return function isAdmin(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();