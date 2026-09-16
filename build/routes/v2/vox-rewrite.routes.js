"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var router = _express["default"].Router();
var SYSTEM_PROMPT = "Sos EDITOR JEFE de Ultravox Neuqu\xE9n. Reescrib\xED notas con calidad Clar\xEDn.\nNUNCA inventes datos. Tono neuquino profesional.\nDevolv\xE9 SOLO JSON:\n{\"titulo\":\"60-75c\",\"bajada\":\"140-160c\",\"contenido_mejorado\":\"HTML <p><h2><strong>\",\"palabras_clave\":[\"neuquen\"],\"slug_seo\":\"slug\",\"resumen_seo\":\"155c\"}";
var OPENROUTER_MODELS_FREE = ["deepseek/deepseek-chat:free", "deepseek/deepseek-r1:free", "meta-llama/llama-3.3-70b-instruct:free", "qwen/qwen-2.5-72b-instruct:free", "google/gemini-flash-1.5-8b:free"];
var GROQ_MODELS_FREE = ["deepseek-r1-distill-llama-70b", "llama-3.3-70b-versatile", "llama-3.1-8b-instant"];
function extractJSON(t) {
  var m = t.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("No JSON");
  return JSON.parse(m[0]);
}
function callOpenRouter(_x, _x2) {
  return _callOpenRouter.apply(this, arguments);
}
function _callOpenRouter() {
  _callOpenRouter = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(model, prompt) {
    var r;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return _axios["default"].post("https://openrouter.ai/api/v1/chat/completions", {
            model: model,
            messages: [{
              role: "system",
              content: SYSTEM_PROMPT
            }, {
              role: "user",
              content: prompt
            }],
            temperature: 0.4,
            max_tokens: 1200
          }, {
            headers: {
              "Authorization": "Bearer ".concat(process.env.OPENROUTER_API_KEY),
              "HTTP-Referer": "https://ultravox.com.ar",
              "X-Title": "Ultravox"
            },
            timeout: 25000
          });
        case 1:
          r = _context2.v;
          return _context2.a(2, extractJSON(r.data.choices[0].message.content));
      }
    }, _callee2);
  }));
  return _callOpenRouter.apply(this, arguments);
}
function callGroq(_x3, _x4) {
  return _callGroq.apply(this, arguments);
}
function _callGroq() {
  _callGroq = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(model, prompt) {
    var r;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return _axios["default"].post("https://api.groq.com/openai/v1/chat/completions", {
            model: model,
            messages: [{
              role: "system",
              content: SYSTEM_PROMPT
            }, {
              role: "user",
              content: prompt
            }],
            temperature: 0.4,
            max_tokens: 1200
          }, {
            headers: {
              Authorization: "Bearer ".concat(process.env.GROQ_API_KEY)
            },
            timeout: 20000
          });
        case 1:
          r = _context3.v;
          return _context3.a(2, extractJSON(r.data.choices[0].message.content));
      }
    }, _callee3);
  }));
  return _callGroq.apply(this, arguments);
}
router.post("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var original, contenido, prompt, _i, _OPENROUTER_MODELS_FR, model, data, _e$response, _i2, _GROQ_MODELS_FREE, _model, _data, _e$response2, _e$response3, _t, _t2, _t3;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          original = req.body.texto_original || req.body.contenido || "";
          if (original) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            ok: false,
            error: "Falta contenido"
          }));
        case 1:
          contenido = original.slice(0, 3000);
          prompt = "MODO:".concat(req.body.modo || "simple", " FUENTE:").concat(req.body.fuente1 || "", "\n").concat(contenido, "\nSolo JSON.");
          console.log("[vox] ".concat(original.length, " -> ").concat(contenido.length));
          _i = 0, _OPENROUTER_MODELS_FR = OPENROUTER_MODELS_FREE;
        case 2:
          if (!(_i < _OPENROUTER_MODELS_FR.length)) {
            _context.n = 7;
            break;
          }
          model = _OPENROUTER_MODELS_FR[_i];
          _context.p = 3;
          console.log("[vox] OR ".concat(model));
          _context.n = 4;
          return callOpenRouter(model, prompt);
        case 4:
          data = _context.v;
          return _context.a(2, res.json({
            ok: true,
            model: model,
            titulo: data.titulo,
            bajada: data.bajada,
            contenido_mejorado: data.contenido_mejorado,
            palabras_clave: data.palabras_clave,
            slug_seo: data.slug_seo,
            resumen_seo: data.resumen_seo,
            data: {
              Entry_Title: data.titulo,
              Entry_Bajada: data.bajada,
              Entry_Content: data.contenido_mejorado
            }
          }));
        case 5:
          _context.p = 5;
          _t = _context.v;
          console.log("Fallo ".concat(model, ": ").concat(((_e$response = _t.response) === null || _e$response === void 0 || (_e$response = _e$response.data) === null || _e$response === void 0 || (_e$response = _e$response.error) === null || _e$response === void 0 ? void 0 : _e$response.message) || _t.message));
          return _context.a(3, 6);
        case 6:
          _i++;
          _context.n = 2;
          break;
        case 7:
          _i2 = 0, _GROQ_MODELS_FREE = GROQ_MODELS_FREE;
        case 8:
          if (!(_i2 < _GROQ_MODELS_FREE.length)) {
            _context.n = 14;
            break;
          }
          _model = _GROQ_MODELS_FREE[_i2];
          _context.p = 9;
          console.log("[vox] Groq ".concat(_model));
          _context.n = 10;
          return callGroq(_model, prompt);
        case 10:
          _data = _context.v;
          return _context.a(2, res.json({
            ok: true,
            model: _model,
            titulo: _data.titulo,
            bajada: _data.bajada,
            contenido_mejorado: _data.contenido_mejorado,
            palabras_clave: _data.palabras_clave,
            slug_seo: _data.slug_seo,
            resumen_seo: _data.resumen_seo,
            data: {
              Entry_Title: _data.titulo,
              Entry_Bajada: _data.bajada,
              Entry_Content: _data.contenido_mejorado
            }
          }));
        case 11:
          _context.p = 11;
          _t2 = _context.v;
          if (!(((_e$response2 = _t2.response) === null || _e$response2 === void 0 || (_e$response2 = _e$response2.data) === null || _e$response2 === void 0 || (_e$response2 = _e$response2.error) === null || _e$response2 === void 0 ? void 0 : _e$response2.code) === "rate_limit_exceeded")) {
            _context.n = 12;
            break;
          }
          _context.n = 12;
          return new Promise(function (r) {
            return setTimeout(r, 2000);
          });
        case 12:
          return _context.a(3, 13);
        case 13:
          _i2++;
          _context.n = 8;
          break;
        case 14:
          return _context.a(2, res.status(429).json({
            ok: false,
            error: "rate_limited_all_free"
          }));
        case 15:
          _context.p = 15;
          _t3 = _context.v;
          console.error(((_e$response3 = _t3.response) === null || _e$response3 === void 0 ? void 0 : _e$response3.data) || _t3.message);
          res.status(500).json({
            ok: false,
            error: _t3.message
          });
        case 16:
          return _context.a(2);
      }
    }, _callee, null, [[9, 11], [3, 5], [0, 15]]);
  }));
  return function (_x5, _x6) {
    return _ref.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;