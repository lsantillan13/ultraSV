"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTTS = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var getPostModel = function getPostModel() {
  return _mongoose["default"].models.Post || _mongoose["default"].model('Post');
};
var AUDIO_DIR = _path["default"].join(process.cwd(), 'public', 'audio');
if (!_fs["default"].existsSync(AUDIO_DIR)) _fs["default"].mkdirSync(AUDIO_DIR, {
  recursive: true
});
var cleanForTTS = function cleanForTTS(text) {
  return text.replace(/https?:\/\/\S+/g, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

// Google TTS gratis - parte el texto en chunks de 200 chars
function generateWithGoogle(_x, _x2) {
  return _generateWithGoogle.apply(this, arguments);
}
function _generateWithGoogle() {
  _generateWithGoogle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(text, filePath) {
    var chunks, i, chunk, lastDot, buffers, _i, _chunks, _chunk, url, res, _t6, _t7;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          chunks = [];
          i = 0;
          while (i < text.length) {
            chunk = text.slice(i, i + 200);
            lastDot = chunk.lastIndexOf('.');
            if (lastDot > 100 && i + 200 < text.length) {
              chunk = chunk.slice(0, lastDot + 1);
              i += lastDot + 1;
            } else {
              i += 200;
            }
            chunks.push(chunk);
          }
          buffers = [];
          _i = 0, _chunks = chunks;
        case 1:
          if (!(_i < _chunks.length)) {
            _context2.n = 6;
            break;
          }
          _chunk = _chunks[_i];
          url = "https://translate.google.com/translate_tts?ie=UTF-8&q=".concat(encodeURIComponent(_chunk), "&tl=es-AR&client=tw-ob&ttsspeed=1");
          _context2.n = 2;
          return fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0',
              'Referer': 'https://translate.google.com/'
            }
          });
        case 2:
          res = _context2.v;
          if (res.ok) {
            _context2.n = 3;
            break;
          }
          throw new Error("Google TTS ".concat(res.status));
        case 3:
          _t6 = buffers;
          _t7 = Buffer;
          _context2.n = 4;
          return res.arrayBuffer();
        case 4:
          _t6.push.call(_t6, _t7.from.call(_t7, _context2.v));
          _context2.n = 5;
          return new Promise(function (r) {
            return setTimeout(r, 100);
          });
        case 5:
          _i++;
          _context2.n = 1;
          break;
        case 6:
          _fs["default"].writeFileSync(filePath, Buffer.concat(buffers));
          return _context2.a(2, filePath);
      }
    }, _callee2);
  }));
  return _generateWithGoogle.apply(this, arguments);
}
var generateTTS = exports.generateTTS = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(slugOrId) {
    var Post, query, post, textToRead, cleanText, fileName, filePath, publicUrl, res, _t, _t2, _t3, _t4, _t5;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          Post = getPostModel();
          query = _mongoose["default"].Types.ObjectId.isValid(slugOrId) ? {
            _id: slugOrId
          } : {
            Entry_Slug: slugOrId
          };
          _context.n = 1;
          return Post.findOne(query);
        case 1:
          post = _context.v;
          if (post) {
            _context.n = 2;
            break;
          }
          throw new Error('Post no encontrado');
        case 2:
          // LEE Entry_Body_Plain OBLIGATORIO
          textToRead = post.Entry_Body_Plain; // fallback si por X motivo Body_Plain está vacío
          if (!textToRead || textToRead.trim().length < 100) {
            textToRead = post.Entry_Body_Resume_Plain || post.Entry_Resume || post.Entry_Title;
          }
          cleanText = cleanForTTS(textToRead).substring(0, 8000);
          if (cleanText) {
            _context.n = 3;
            break;
          }
          throw new Error('Texto vacío');
        case 3:
          fileName = "".concat(post._id, ".mp3");
          filePath = _path["default"].join(AUDIO_DIR, fileName);
          publicUrl = "/public/audio/".concat(fileName);
          if (!_fs["default"].existsSync(filePath)) {
            _context.n = 4;
            break;
          }
          return _context.a(2, {
            audioUrl: publicUrl,
            url: publicUrl,
            cached: true,
            engine: 'cache',
            chars: cleanText.length
          });
        case 4:
          if (!process.env.ELEVENLABS_API_KEY) {
            _context.n = 9;
            break;
          }
          console.log("[TTS] ElevenLabs leyendo ".concat(cleanText.length, " chars de Entry_Body_Plain..."));
          _context.n = 5;
          return fetch("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", {
            method: 'POST',
            headers: {
              'xi-api-key': process.env.ELEVENLABS_API_KEY,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              text: cleanText,
              model_id: 'eleven_multilingual_v2'
            })
          });
        case 5:
          res = _context.v;
          if (res.ok) {
            _context.n = 7;
            break;
          }
          _t = Error;
          _context.n = 6;
          return res.text();
        case 6:
          _t2 = _context.v;
          throw new _t(_t2);
        case 7:
          _t3 = _fs["default"];
          _t4 = filePath;
          _t5 = Buffer;
          _context.n = 8;
          return res.arrayBuffer();
        case 8:
          _t3.writeFileSync.call(_t3, _t4, _t5.from.call(_t5, _context.v));
          _context.n = 10;
          break;
        case 9:
          console.log("[TTS] Google gratis leyendo ".concat(cleanText.length, " chars de Entry_Body_Plain..."));
          _context.n = 10;
          return generateWithGoogle(cleanText, filePath);
        case 10:
          post.ttsAudioUrl = publicUrl;
          post.ttsGeneratedAt = new Date();
          post.readingTime = Math.ceil(cleanText.split(' ').length / 160);
          _context.n = 11;
          return post.save();
        case 11:
          return _context.a(2, {
            audioUrl: publicUrl,
            url: publicUrl,
            cached: false,
            engine: process.env.ELEVENLABS_API_KEY ? 'eleven' : 'google-free',
            chars: cleanText.length
          });
      }
    }, _callee);
  }));
  return function generateTTS(_x3) {
    return _ref.apply(this, arguments);
  };
}();