"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = void 0;
var _UserModel = _interopRequireDefault(require("./../models/User.model.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config.js"));
var _RoleModel = _interopRequireDefault(require("../models/Role.model.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var signUp = exports.signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, username, email, password, roles, newUser, foundRoles, role, savedUser, token, _t, _t2, _t3, _t4, _t5;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, roles = _req$body.roles; //const userFound = User.find({email});
          _t = _UserModel["default"];
          _t2 = username;
          _t3 = email;
          _context.n = 1;
          return _UserModel["default"].encryptPassword(password);
        case 1:
          _t4 = _context.v;
          _t5 = {
            username: _t2,
            email: _t3,
            password: _t4
          };
          newUser = new _t(_t5);
          if (!roles) {
            _context.n = 3;
            break;
          }
          _context.n = 2;
          return _RoleModel["default"].find({
            name: {
              $in: roles
            }
          });
        case 2:
          foundRoles = _context.v;
          newUser.roles = foundRoles.map(function (role) {
            return role._id;
          });
          _context.n = 5;
          break;
        case 3:
          _context.n = 4;
          return _RoleModel["default"].findOne({
            name: "user"
          });
        case 4:
          role = _context.v;
          newUser.roles = [role._id];
        case 5:
          _context.n = 6;
          return newUser.save();
        case 6:
          savedUser = _context.v;
          console.log(savedUser);
          token = _jsonwebtoken["default"].sign({
            id: savedUser._id
          }, _config["default"].SECRET, {
            expiresIn: 86400 //24 Hours
          });
          res.status(200).json({
            token: token
          });
        case 7:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var signIn = exports.signIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var userFound, matchPassword, token;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return _UserModel["default"].findOne({
            email: req.body.email
          }).populate("roles");
        case 1:
          userFound = _context2.v;
          if (userFound) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, res.status(400).json({
            message: "User not found"
          }));
        case 2:
          _context2.n = 3;
          return _UserModel["default"].comparePassword(req.body.password, userFound.password);
        case 3:
          matchPassword = _context2.v;
          if (matchPassword) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, res.status(401).json({
            token: null,
            message: "Invalid password"
          }));
        case 4:
          token = _jsonwebtoken["default"].sign({
            id: userFound._id
          }, _config["default"].SECRET, {
            expiresIn: 86400
          });
          res.json({
            userData: userFound,
            token: token
          });
        case 5:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();