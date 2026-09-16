"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var router = _express["default"].Router();
var SYSTEM_PROMPT = "\nSos EDITOR JEFE de un diario digital argentino.\n\nTAREA: Reescribir la noticia que te dan, manteniendo TODA la informaci\xF3n.\n\nREGLAS OBLIGATORIAS:\n1. LARGO PROPORCIONAL: Cont\xE1 las palabras del texto original. Devolv\xE9 la MISMA cantidad de palabras o un poco m\xE1s (90% a 110%). Si el original tiene 200 palabras, devolv\xE9s 200. Si tiene 800, devolv\xE9s 800. NUNCA resumas.\n2. PROHIBIDO INVENTAR: No inventes fechas, a\xF1os, nombres, montos, lugares, cargos, estad\xEDsticas. Copi\xE1 exactamente lo que dice el texto original. Si dice \"fin de a\xF1o\", dej\xE1 \"fin de a\xF1o\". No agregues el a\xF1o si no est\xE1.\n3. CONSERVAR TODO: Manten\xE9 todas las declaraciones textuales, todos los nombres propios, todos los n\xFAmeros, todas las calles/barrios/organismos.\n4. FORMATO: Us\xE1 HTML para contenido_mejorado: <p> para p\xE1rrafos, <h2> para cada subt\xEDtulo que ya exista en el original, <strong> para datos clave. 5 a 10 p\xE1rrafos seg\xFAn el largo original.\n5. Tono: Profesional, objetivo, argentino.\n\nDevolv\xE9 SOLO JSON v\xE1lido:\n{\"titulo\":\"60-75 caracteres, atractivo\",\"bajada\":\"150-180 caracteres\",\"contenido_mejorado\":\"HTML largo y proporcional\",\"palabras_clave\":[\"3 a 5 keywords\"],\"slug_seo\":\"slug-seo-corto\",\"resumen_seo\":\"155 caracteres\"}\n";
var MODELS_FREE = ["deepseek/deepseek-chat:free", "deepseek/deepseek-r1:free", "qwen/qwen-2.5-72b-instruct:free", "meta-llama/llama-3.3-70b-instruct:free"];
function extractJSON(t) {
  var m = t.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("No JSON en respuesta");
  return JSON.parse(m[0]);
}
function callOR(_x, _x2) {
  return _callOR.apply(this, arguments);
}
function _callOR() {
  _callOR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(model, prompt) {
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
            temperature: 0.15,
            max_tokens: 4000
          }, {
            headers: {
              "Authorization": "Bearer ".concat(process.env.OPENROUTER_API_KEY),
              "HTTP-Referer": "https://ultravox.com.ar",
              "X-Title": "Ultravox"
            },
            timeout: 45000
          });
        case 1:
          r = _context2.v;
          return _context2.a(2, extractJSON(r.data.choices[0].message.content));
      }
    }, _callee2);
  }));
  return _callOR.apply(this, arguments);
}
router.post("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var original, wordCount, contenido, prompt, _i, _MODELS_FREE, model, data, outWords, _e$response, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          original = req.body.texto_original || req.body.contenido || "";
          if (!(!original || original.length < 50)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            ok: false,
            error: "Texto muy corto"
          }));
        case 1:
          wordCount = original.trim().split(/\s+/).length;
          contenido = original.slice(0, 8000);
          prompt = "TEXTO ORIGINAL: ".concat(wordCount, " palabras. Ten\xE9s que devolver ").concat(wordCount, " palabras aprox, no menos de ").concat(Math.floor(wordCount * 0.9), ". No resumas, reescrib\xED completo conservando todo.\n\n").concat(contenido, "\n\nDevolv\xE9 JSON largo ahora.");
          _i = 0, _MODELS_FREE = MODELS_FREE;
        case 2:
          if (!(_i < _MODELS_FREE.length)) {
            _context.n = 8;
            break;
          }
          model = _MODELS_FREE[_i];
          _context.p = 3;
          console.log("[vox] IN: ".concat(wordCount, " palabras -> ").concat(model));
          _context.n = 4;
          return callOR(model, prompt);
        case 4:
          data = _context.v;
          outWords = (data.contenido_mejorado || "").replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
          console.log("[vox] OUT: ".concat(outWords, " palabras"));

          // Validación proporcional genérica
          if (!(outWords < wordCount * 0.7)) {
            _context.n = 5;
            break;
          }
          throw new Error("Resumen detectado: ".concat(outWords, " palabras vs ").concat(wordCount, " originales. Reintento."));
        case 5:
          return _context.a(2, res.json(_objectSpread(_objectSpread({
            ok: true,
            model: model,
            stats: {
              "in": wordCount,
              out: outWords
            }
          }, data), {}, {
            data: {
              Entry_Title: data.titulo,
              Entry_Bajada: data.bajada,
              Entry_Content: data.contenido_mejorado
            }
          })));
        case 6:
          _context.p = 6;
          _t = _context.v;
          console.log("[vox] Fall\xF3 ".concat(model, ": ").concat(_t.message));
          return _context.a(3, 7);
        case 7:
          _i++;
          _context.n = 2;
          break;
        case 8:
          return _context.a(2, res.status(500).json({
            ok: false,
            error: "all_free_models_failed"
          }));
        case 9:
          _context.p = 9;
          _t2 = _context.v;
          console.error(((_e$response = _t2.response) === null || _e$response === void 0 ? void 0 : _e$response.data) || _t2.message);
          res.status(500).json({
            ok: false,
            error: _t2.message
          });
        case 10:
          return _context.a(2);
      }
    }, _callee, null, [[3, 6], [0, 9]]);
  }));
  return function (_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;