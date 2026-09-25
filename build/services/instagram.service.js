"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishIG = exports.listIG = exports.deleteIG = void 0;
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
var FRAMES = {
  feed_1350: 'VOX_FRAME_1080x1350_FEED',
  feed: 'VOX_FRAME_1080x1080_FEED',
  story: 'VOX_FRAME_1080x1920_STORY'
};
function getToken() {
  return _getToken.apply(this, arguments);
}
function _getToken() {
  _getToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var cfg;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return Config.findOne({
            key: 'IG_ACCESS_TOKEN'
          });
        case 1:
          cfg = _context2.v;
          return _context2.a(2, (cfg === null || cfg === void 0 ? void 0 : cfg.value) || process.env.IG_ACCESS_TOKEN);
      }
    }, _callee2);
  }));
  return _getToken.apply(this, arguments);
}
function buildFramedImageUrl(mediaUrl) {
  var frameType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'feed_1350';
  var frameId = FRAMES[frameType] || FRAMES.feed_1350;
  var W = 1080,
    H = 1350;
  if (frameType === 'feed') {
    W = 1080;
    H = 1080;
  }
  if (frameType === 'story') {
    W = 1080;
    H = 1920;
  }

  // URL CORRECTA PARA TU CLOUD ihytdbtw - probala en el navegador
  var encoded = encodeURIComponent(mediaUrl);
  // fetch de la foto de la nota + overlay del frame PNG
  return "https://res.cloudinary.com/".concat(CLOUD, "/image/fetch/c_fill,w_").concat(W, ",h_").concat(H, ",g_auto,q_auto:good,f_jpg/l_").concat(frameId, ",w_").concat(W, ",h_").concat(H, ",c_fill,g_center/fl_layer_apply,q_auto:good,f_jpg/").concat(encoded);
}
var listIG = exports.listIG = function listIG() {
  return _InstagramModel["default"].find().sort({
    createdAt: -1
  }).limit(50);
};
var deleteIG = exports.deleteIG = function deleteIG(id) {
  return _InstagramModel["default"].findByIdAndDelete(id);
};
var publishIG = exports.publishIG = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
    var mediaUrl, caption, _ref$type, type, entryRef, token, finalUrl, test, status, igMediaId, permalink, errorMsg, createRes, createJson, pubRes, pubJson, doc, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          mediaUrl = _ref.mediaUrl, caption = _ref.caption, _ref$type = _ref.type, type = _ref$type === void 0 ? 'feed_1350' : _ref$type, entryRef = _ref.entryRef;
          _context.n = 1;
          return getToken();
        case 1:
          token = _context.v;
          if (!(!IG_USER_ID || !token)) {
            _context.n = 2;
            break;
          }
          throw new Error('Falta IG_USER_ID o TOKEN en Koyeb');
        case 2:
          finalUrl = buildFramedImageUrl(mediaUrl, type);
          console.log('[IG] FINAL URL:', finalUrl);

          // Testea que Cloudinary si devuelva imagen
          _context.p = 3;
          _context.n = 4;
          return fetch(finalUrl, {
            method: 'HEAD'
          });
        case 4:
          test = _context.v;
          console.log('[IG] Cloudinary status:', test.status, test.headers.get('content-type'));
          if (test.ok) {
            _context.n = 5;
            break;
          }
          throw new Error("Cloudinary no devolvi\xF3 imagen: ".concat(test.status));
        case 5:
          _context.n = 7;
          break;
        case 6:
          _context.p = 6;
          _t = _context.v;
          console.error('[IG] Error probando Cloudinary:', _t.message);
        case 7:
          status = 'error', igMediaId = "error_".concat(Date.now()), permalink = '', errorMsg = null;
          _context.p = 8;
          _context.n = 9;
          return fetch("https://graph.facebook.com/v18.0/".concat(IG_USER_ID, "/media"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image_url: finalUrl,
              caption: caption,
              access_token: token
            })
          });
        case 9:
          createRes = _context.v;
          _context.n = 10;
          return createRes.json();
        case 10:
          createJson = _context.v;
          console.log('[IG] CREATE:', createJson);
          if (createJson.id) {
            _context.n = 11;
            break;
          }
          throw new Error("CREATE FAIL: ".concat(JSON.stringify(createJson)));
        case 11:
          _context.n = 12;
          return new Promise(function (r) {
            return setTimeout(r, 4000);
          });
        case 12:
          _context.n = 13;
          return fetch("https://graph.facebook.com/v18.0/".concat(IG_USER_ID, "/media_publish"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              creation_id: createJson.id,
              access_token: token
            })
          });
        case 13:
          pubRes = _context.v;
          _context.n = 14;
          return pubRes.json();
        case 14:
          pubJson = _context.v;
          console.log('[IG] PUBLISH:', pubJson);
          if (pubJson.id) {
            _context.n = 15;
            break;
          }
          throw new Error("PUBLISH FAIL: ".concat(JSON.stringify(pubJson)));
        case 15:
          status = 'published';
          igMediaId = pubJson.id;
          permalink = "https://www.instagram.com/p/".concat(pubJson.id, "/");
          _context.n = 17;
          break;
        case 16:
          _context.p = 16;
          _t2 = _context.v;
          errorMsg = _t2.message;
          console.error('[IG] ERROR:', errorMsg);
        case 17:
          _context.n = 18;
          return _InstagramModel["default"].create({
            mediaUrl: finalUrl,
            originalMediaUrl: mediaUrl,
            caption: caption,
            type: type,
            entryRef: entryRef,
            status: status,
            igMediaId: igMediaId,
            permalink: permalink,
            error: errorMsg
          });
        case 18:
          doc = _context.v;
          if (!(status === 'error')) {
            _context.n = 19;
            break;
          }
          throw new Error(errorMsg);
        case 19:
          return _context.a(2, {
            ok: true,
            data: doc,
            finalUrl: finalUrl
          });
      }
    }, _callee, null, [[8, 16], [3, 6]]);
  }));
  return function publishIG(_x) {
    return _ref2.apply(this, arguments);
  };
}();