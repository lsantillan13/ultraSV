"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateIG = exports.publishIG = exports.listIG = exports.getIG = exports.forceRefresh = exports.deleteIG = void 0;
var _InstagramModel = _interopRequireDefault(require("../models/Instagram.model.js"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _sharp = _interopRequireDefault(require("sharp"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var IG_USER_ID = process.env.IG_USER_ID || process.env.INSTAGRAM_USER_ID;
var IG_TOKEN = process.env.IG_ACCESS_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN;

// Config para guardar token refrescado
var ConfigSchema = new _mongoose["default"].Schema({
  key: String,
  value: String
}, {
  timestamps: true
});
var Config = _mongoose["default"].models.Config || _mongoose["default"].model('Config', ConfigSchema);

// TUS FRAMES DE CLOUDINARY - poné las URL directas .png con fondo transparente
var FRAMES = {
  story: process.env.VOX_FRAME_STORY || 'https://res.cloudinary.com/dxxx/image/upload/v1/VOX_FRAME_1080x1920_STORY.png',
  feed: process.env.VOX_FRAME_FEED || 'https://res.cloudinary.com/dxxx/image/upload/v1/VOX_FRAME_1080x1080_FEED.png',
  feed_1350: process.env.VOX_FRAME_FEED_1350 || 'https://res.cloudinary.com/dxxx/image/upload/v1/VOX_FRAME_1080x1350_FEED.png'
};
function getToken() {
  return _getToken.apply(this, arguments);
}
function _getToken() {
  _getToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var cfg;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return Config.findOne({
            key: 'IG_ACCESS_TOKEN'
          });
        case 1:
          cfg = _context4.v;
          return _context4.a(2, (cfg === null || cfg === void 0 ? void 0 : cfg.value) || IG_TOKEN);
      }
    }, _callee4);
  }));
  return _getToken.apply(this, arguments);
}
function refreshTokenIfNeeded() {
  return _refreshTokenIfNeeded.apply(this, arguments);
} // Esta es la que te arregla el 36003 y le pega el frame
function _refreshTokenIfNeeded() {
  _refreshTokenIfNeeded = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
    var token, res, json, _t2;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _context5.n = 1;
          return getToken();
        case 1:
          token = _context5.v;
          if (!(!token || !process.env.FB_APP_ID)) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2);
        case 2:
          _context5.n = 3;
          return fetch("https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=".concat(process.env.FB_APP_ID, "&client_secret=").concat(process.env.FB_APP_SECRET, "&fb_exchange_token=").concat(token));
        case 3:
          res = _context5.v;
          _context5.n = 4;
          return res.json();
        case 4:
          json = _context5.v;
          if (!json.access_token) {
            _context5.n = 6;
            break;
          }
          _context5.n = 5;
          return Config.findOneAndUpdate({
            key: 'IG_ACCESS_TOKEN'
          }, {
            value: json.access_token
          }, {
            upsert: true
          });
        case 5:
          console.log('[IG] Token refrescado');
        case 6:
          _context5.n = 8;
          break;
        case 7:
          _context5.p = 7;
          _t2 = _context5.v;
        case 8:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return _refreshTokenIfNeeded.apply(this, arguments);
}
function buildFramedImage(_x) {
  return _buildFramedImage.apply(this, arguments);
}
function _buildFramedImage() {
  _buildFramedImage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(mediaUrl) {
    var frameType,
      CLOUD,
      FRAME_IDS,
      frameId,
      finalW,
      finalH,
      encodedMedia,
      cloudinaryUrl,
      _CLOUD,
      _encodedMedia,
      _args6 = arguments,
      _t3;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          frameType = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 'feed_1350';
          _context6.p = 1;
          CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'dq...'; // poné tu cloud name
          // Public IDs de tus frames tal cual los tenés en cloudinary (sin.png)
          FRAME_IDS = {
            story: 'VOX_FRAME_1080x1920_STORY',
            feed: 'VOX_FRAME_1080x1080_FEED',
            feed_1350: 'VOX_FRAME_1080x1350_FEED'
          };
          frameId = FRAME_IDS[frameType] || FRAME_IDS.feed_1350;
          finalW = 1080, finalH = 1350;
          if (frameType === 'story') {
            finalW = 1080;
            finalH = 1920;
          }
          if (frameType === 'feed') {
            finalW = 1080;
            finalH = 1080;
          }

          // Transformación Cloudinary:
          // 1. hace fetch de tu foto de la noticia y la recorta a 1080x1350
          // 2. le pone encima tu frame PNG transparente
          encodedMedia = encodeURIComponent(mediaUrl);
          cloudinaryUrl = "https://res.cloudinary.com/".concat(CLOUD, "/image/fetch/w_").concat(finalW, ",h_").concat(finalH, ",c_fill,g_auto,q_auto:good/l_").concat(frameId, ",w_").concat(finalW, ",h_").concat(finalH, ",c_fill,g_center/fl_layer_apply,fl_relative/q_auto:good,f_jpg/").concat(encodedMedia);
          console.log("[IG] URL con frame Cloudinary: ".concat(cloudinaryUrl));
          return _context6.a(2, cloudinaryUrl);
        case 2:
          _context6.p = 2;
          _t3 = _context6.v;
          console.log('[IG] Error armando frame, uso resize simple', _t3.message);
          // Fallback que SIEMPRE funciona y arregla tu error 36003
          _CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
          _encodedMedia = encodeURIComponent(mediaUrl);
          return _context6.a(2, "https://res.cloudinary.com/".concat(_CLOUD, "/image/fetch/w_1080,h_1350,c_fill,g_auto,q_auto:good,f_jpg/").concat(_encodedMedia));
      }
    }, _callee6, null, [[1, 2]]);
  }));
  return _buildFramedImage.apply(this, arguments);
}
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
  return function deleteIG(_x2) {
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
    var mediaUrl, caption, _ref2$type, type, entryRef, token, status, igMediaId, permalink, errorMsg, finalUrl, createRes, createJson, pubRes, pubJson, doc, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          mediaUrl = _ref2.mediaUrl, caption = _ref2.caption, _ref2$type = _ref2.type, type = _ref2$type === void 0 ? 'feed_1350' : _ref2$type, entryRef = _ref2.entryRef;
          _context2.n = 1;
          return refreshTokenIfNeeded();
        case 1:
          _context2.n = 2;
          return getToken();
        case 2:
          token = _context2.v;
          status = 'mock', igMediaId = "mock_".concat(Date.now()), permalink = 'https://instagram.com/mock', errorMsg = null; // Arregla aspect ratio + pega frame
          _context2.n = 3;
          return buildFramedImage(mediaUrl, type);
        case 3:
          finalUrl = _context2.v;
          console.log("[IG] Publicando ".concat(type, " -> ").concat(finalUrl));
          if (!(IG_USER_ID && token)) {
            _context2.n = 13;
            break;
          }
          _context2.p = 4;
          _context2.n = 5;
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
        case 5:
          createRes = _context2.v;
          _context2.n = 6;
          return createRes.json();
        case 6:
          createJson = _context2.v;
          if (createJson.id) {
            _context2.n = 7;
            break;
          }
          throw new Error(JSON.stringify(createJson));
        case 7:
          _context2.n = 8;
          return new Promise(function (r) {
            return setTimeout(r, 2500);
          });
        case 8:
          _context2.n = 9;
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
        case 9:
          pubRes = _context2.v;
          _context2.n = 10;
          return pubRes.json();
        case 10:
          pubJson = _context2.v;
          if (pubJson.id) {
            _context2.n = 11;
            break;
          }
          throw new Error(JSON.stringify(pubJson));
        case 11:
          status = 'published';
          igMediaId = pubJson.id;
          permalink = "https://www.instagram.com/p/".concat(pubJson.id, "/");
          _context2.n = 13;
          break;
        case 12:
          _context2.p = 12;
          _t = _context2.v;
          console.error('IG REAL ERROR:', _t.message);
          status = 'error';
          errorMsg = _t.message;
        case 13:
          _context2.n = 14;
          return _InstagramModel["default"].create({
            mediaUrl: finalUrl,
            caption: caption,
            type: type,
            entryRef: entryRef,
            status: status,
            igMediaId: igMediaId,
            permalink: permalink,
            error: errorMsg
          });
        case 14:
          doc = _context2.v;
          if (!(status === 'error')) {
            _context2.n = 15;
            break;
          }
          throw new Error(errorMsg);
        case 15:
          return _context2.a(2, {
            ok: true,
            data: doc,
            status: status
          });
      }
    }, _callee2, null, [[4, 12]]);
  }));
  return function publishIG(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var forceRefresh = exports.forceRefresh = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return refreshTokenIfNeeded();
        case 1:
          return _context3.a(2, {
            ok: true
          });
      }
    }, _callee3);
  }));
  return function forceRefresh() {
    return _ref4.apply(this, arguments);
  };
}();