"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateIG = exports.publishIG = exports.listIG = exports.getIG = exports.deleteIG = void 0;
var _InstagramModel = _interopRequireDefault(require("../models/Instagram.model.js"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var IG_USER_ID = process.env.INSTAGRAM_USER_ID;
var IG_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
var listIG = exports.listIG = function listIG() {
  return _InstagramModel["default"].find().sort({
    createdAt: -1
  }).limit(50);
};
var getIG = exports.getIG = function getIG(id) {
  return _InstagramModel["default"].findById(id);
};
var deleteIG = exports.deleteIG = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(id) {
    var doc;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return _InstagramModel["default"].findById(id);
        case 1:
          doc = _context.v;
          if (doc) {
            _context.n = 2;
            break;
          }
          throw new Error('No encontrado');
        case 2:
          _context.n = 3;
          return _InstagramModel["default"].findByIdAndDelete(id);
        case 3:
          return _context.a(2, doc);
      }
    }, _callee);
  }));
  return function deleteIG(_x) {
    return _ref.apply(this, arguments);
  };
}();
var updateIG = exports.updateIG = function updateIG(id, data) {
  return _InstagramModel["default"].findByIdAndUpdate(id, data, {
    "new": true
  });
};
var publishIG = exports.publishIG = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref2) {
    var mediaUrl, caption, type, entryRef, status, igMediaId, permalink, createRes, createJson, pubRes, pubJson, doc, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          mediaUrl = _ref2.mediaUrl, caption = _ref2.caption, type = _ref2.type, entryRef = _ref2.entryRef;
          status = 'mock', igMediaId = "mock_".concat(Date.now()), permalink = 'https://instagram.com/mock';
          if (!(IG_USER_ID && IG_TOKEN)) {
            _context2.n = 9;
            break;
          }
          _context2.p = 1;
          _context2.n = 2;
          return (0, _nodeFetch["default"])("https://graph.facebook.com/v18.0/".concat(IG_USER_ID, "/media"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image_url: mediaUrl,
              caption: caption,
              access_token: IG_TOKEN
            })
          });
        case 2:
          createRes = _context2.v;
          _context2.n = 3;
          return createRes.json();
        case 3:
          createJson = _context2.v;
          if (createJson.id) {
            _context2.n = 4;
            break;
          }
          throw new Error(JSON.stringify(createJson));
        case 4:
          _context2.n = 5;
          return (0, _nodeFetch["default"])("https://graph.facebook.com/v18.0/".concat(IG_USER_ID, "/media_publish"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              creation_id: createJson.id,
              access_token: IG_TOKEN
            })
          });
        case 5:
          pubRes = _context2.v;
          _context2.n = 6;
          return pubRes.json();
        case 6:
          pubJson = _context2.v;
          if (pubJson.id) {
            _context2.n = 7;
            break;
          }
          throw new Error(JSON.stringify(pubJson));
        case 7:
          status = 'published';
          igMediaId = pubJson.id;
          permalink = "https://instagram.com/p/".concat(pubJson.id); // IG devuelve el permalink en otro call, este es placeholder
          _context2.n = 9;
          break;
        case 8:
          _context2.p = 8;
          _t = _context2.v;
          status = 'error';
          console.error('IG REAL ERROR:', _t.message);
          // No tiramos error, lo guardamos como mock con error para que veas el log
          igMediaId = "error_".concat(Date.now());
        case 9:
          _context2.n = 10;
          return _InstagramModel["default"].create({
            mediaUrl: mediaUrl,
            caption: caption,
            type: type,
            entryRef: entryRef,
            status: status,
            igMediaId: igMediaId,
            permalink: permalink
          });
        case 10:
          doc = _context2.v;
          return _context2.a(2, {
            ok: true,
            data: doc,
            status: status
          });
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return function publishIG(_x2) {
    return _ref3.apply(this, arguments);
  };
}();