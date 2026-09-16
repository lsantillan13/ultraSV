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

// USA TU KEY - lee minuscula o mayuscula, la que tengas
var getKey = function getKey() {
  return process.env.openrouter_api_key || process.env.OPENROUTER_API_KEY || "";
};
var SYSTEM_PROMPT = "\nSos EDITOR JEFE de Ultravox Neuqu\xE9n, diario digital de Neuqu\xE9n capital.\n\nTAREA: Reescribir la noticia que te dan, manteniendo TODA la informaci\xF3n, sin resumir.\n\nREGLAS INQUEBRANTABLES - SI FALLAS UNA, FALLA TODO:\n\n1. LARGO PROPORCIONAL OBLIGATORIO:\n   - Cont\xE1 las palabras del texto original.\n   - Ten\xE9s que devolver EXACTAMENTE la misma cantidad o 10% m\xE1s.\n   - Si te mandan 200 palabras, devolv\xE9s 200. Si te mandan 800 palabras, devolv\xE9s 800.\n   - NUNCA resumas. Est\xE1 prohibido acortar.\n\n2. CERO ALUCINACI\xD3N:\n   - No inventes a\xF1os, fechas, montos, nombres, cargos, calles, organismos.\n   - Si el texto dice \"fin de a\xF1o\", dej\xE1 \"fin de a\xF1o\". No pongas 2024, 2025, 2026 si no est\xE1 escrito.\n   - Copi\xE1 nombres propios exactos como aparecen: funcionarios, calles, barrios, empresas.\n   - Copi\xE1 cifras exactas como aparecen: $30.000 millones, 70.000 veh\xEDculos, etc.\n\n3. CONSERVAR TODO:\n   - Manten\xE9 todas las declaraciones textuales entre comillas.\n   - Manten\xE9 todos los datos, todos los p\xE1rrafos, todos los subt\xEDtulos.\n   - Manten\xE9 el orden l\xF3gico de la noticia.\n\n4. FORMATO Y ESTILO:\n   - Us\xE1 HTML en contenido_mejorado: <p> para p\xE1rrafos (5 a 10 seg\xFAn el largo), <h2> para subt\xEDtulos si el original los tiene, <strong> para datos clave.\n   - Tono: Period\xEDstico profesional neuquino, calidad Clar\xEDn/La Naci\xF3n, objetivo, sin adjetivos militantes.\n   - T\xEDtulo: 60-75 caracteres, con verbo, atractivo.\n   - Bajada: 150-180 caracteres.\n\n5. SALIDA:\n   - Devolv\xE9 SOLO JSON v\xE1lido, sin texto antes ni despu\xE9s.\n   - Formato: {\"titulo\":\"\",\"bajada\":\"\",\"contenido_mejorado\":\"<p>...</p><h2>...</h2><p>...</p>\",\"palabras_clave\":[\"3 a 5\"],\"slug_seo\":\"slug-corto\",\"resumen_seo\":\"155 caracteres\"}\n\nSi no cumpl\xEDs con el largo proporcional, la respuesta ser\xE1 descartada.\n";
var FREE_MODELS = ["deepseek/deepseek-chat:free", "deepseek/deepseek-r1:free", "qwen/qwen-2.5-72b-instruct:free", "meta-llama/llama-3.3-70b-instruct:free", "google/gemma-2-9b-it:free", "mistralai/mistral-7b-instruct:free"];
function extractJSON(t) {
  var m = t.match(/\{[\s\S]*\}/);
  if (!m) throw new Error("Sin JSON");
  return JSON.parse(m[0]);
}
function callModel(_x, _x2, _x3) {
  return _callModel.apply(this, arguments);
}
function _callModel() {
  _callModel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(model, prompt, apiKey) {
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
              "Authorization": "Bearer ".concat(apiKey),
              "HTTP-Referer": "https://ultravox.com.ar",
              "X-Title": "Ultravox",
              "Content-Type": "application/json"
            },
            timeout: 40000
          });
        case 1:
          r = _context2.v;
          return _context2.a(2, extractJSON(r.data.choices[0].message.content));
      }
    }, _callee2);
  }));
  return _callModel.apply(this, arguments);
}
router.get("/", function (req, res) {
  var k = getKey();
  res.json({
    ok: true,
    endpoint: "/api/v2/vox-rewrite V6 FULL",
    has_key: !!k,
    key_var: k ? "tu openrouter_api_key OK" : "NO KEY"
  });
});
router.post("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var API_KEY, original, wordCount, contenido, prompt, errors, _i, _FREE_MODELS, model, data, outText, outWords, _e$response, msg, _e$response2, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          API_KEY = getKey();
          if (API_KEY) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(500).json({
            ok: false,
            error: "missing_api_key",
            detail: "No se encontró openrouter_api_key en Koyeb env vars"
          }));
        case 1:
          _context.p = 1;
          original = req.body.texto_original || req.body.contenido || "";
          if (!(!original || original.length < 50)) {
            _context.n = 2;
            break;
          }
          return _context.a(2, res.status(400).json({
            ok: false,
            error: "texto_original vacio"
          }));
        case 2:
          wordCount = original.trim().split(/\s+/).length;
          contenido = original.slice(0, 8000);
          prompt = "\nTEXTO ORIGINAL: ".concat(wordCount, " palabras.\nINSTRUCCI\xD3N: Ten\xE9s que devolver ").concat(wordCount, " palabras m\xEDnimo (no menos de ").concat(Math.floor(wordCount * 0.9), "). Es OBLIGATORIO que sea largo proporcional. No resumas. Reescrib\xED completo conservando todos los p\xE1rrafos, datos y declaraciones.\n\n").concat(contenido, "\n\nDevolv\xE9 JSON largo ahora.\n");
          errors = [];
          _i = 0, _FREE_MODELS = FREE_MODELS;
        case 3:
          if (!(_i < _FREE_MODELS.length)) {
            _context.n = 10;
            break;
          }
          model = _FREE_MODELS[_i];
          _context.p = 4;
          console.log("[vox] IN:".concat(wordCount, " -> ").concat(model));
          _context.n = 5;
          return callModel(model, prompt, API_KEY);
        case 5:
          data = _context.v;
          outText = (data.contenido_mejorado || "").replace(/<[^>]*>/g, " ");
          outWords = outText.split(/\s+/).filter(Boolean).length;
          console.log("[vox] OUT:".concat(outWords, " palabras"));

          // Validación proporcional
          if (!(outWords < wordCount * 0.7)) {
            _context.n = 6;
            break;
          }
          throw new Error("Resumen detectado: ".concat(outWords, " vs ").concat(wordCount, " originales"));
        case 6:
          return _context.a(2, res.json({
            ok: true,
            model: model,
            stats: {
              "in": wordCount,
              out: outWords
            },
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
        case 7:
          _context.p = 7;
          _t = _context.v;
          msg = ((_e$response = _t.response) === null || _e$response === void 0 || (_e$response = _e$response.data) === null || _e$response === void 0 || (_e$response = _e$response.error) === null || _e$response === void 0 ? void 0 : _e$response.message) || _t.message;
          console.log("[vox] Fail ".concat(model, ": ").concat(msg));
          errors.push({
            model: model,
            error: msg
          });
          if (!msg.includes("429")) {
            _context.n = 8;
            break;
          }
          _context.n = 8;
          return new Promise(function (r) {
            return setTimeout(r, 1500);
          });
        case 8:
          return _context.a(3, 9);
        case 9:
          _i++;
          _context.n = 3;
          break;
        case 10:
          return _context.a(2, res.status(500).json({
            ok: false,
            error: "all_models_saturated",
            errors: errors
          }));
        case 11:
          _context.p = 11;
          _t2 = _context.v;
          console.error("[vox] fatal", ((_e$response2 = _t2.response) === null || _e$response2 === void 0 ? void 0 : _e$response2.data) || _t2.message);
          res.status(500).json({
            ok: false,
            error: _t2.message
          });
        case 12:
          return _context.a(2);
      }
    }, _callee, null, [[4, 7], [1, 11]]);
  }));
  return function (_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;