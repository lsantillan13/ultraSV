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

// Modelos válidos HOY en Groq - en orden de preferencia
var MODELS = ["llama-3.3-70b-versatile", "llama-3.1-70b-versatile", "llama3-8b-8192", "mixtral-8x7b-32768", "gemma2-9b-it"];
router.post('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, texto_original, fuente1, modo, prompt, lastError, _i, _MODELS, model, r, content, data, _e$response, _detalle$error, _detalle$error2, _e$response2, _e$response3, detalle, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _req$body = req.body, texto_original = _req$body.texto_original, fuente1 = _req$body.fuente1, modo = _req$body.modo;
          console.log("LLEGÓ REQUEST", {
            largo: texto_original === null || texto_original === void 0 ? void 0 : texto_original.length,
            fuente1: fuente1,
            modo: modo,
            tieneKey: !!process.env.GROQ_API_KEY
          });
          if (texto_original) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            error: "Falta texto_original"
          }));
        case 1:
          if (process.env.GROQ_API_KEY) {
            _context.n = 2;
            break;
          }
          return _context.a(2, res.status(500).json({
            error: "Falta GROQ_API_KEY",
            keyExiste: false
          }));
        case 2:
          prompt = "\nSos editor de VoxDiario Neuqu\xE9n. Modo: ".concat(modo || 'neutral', " Fuente: ").concat(fuente1 || 'generica', ".\nReescrib\xED 100% original, sin copiar frases, tono neuquino informativo.\n\nDevolv\xE9 SOLO JSON v\xE1lido, sin markdown, con esta forma exacta:\n{ \"Entry_Title\": \"\", \"Entry_Bajada\": \"\", \"Entry_Content\": \"<p>...</p><p>...</p>\", \"Entry_Slug\": \"titulo-en-kebab-case\", \"Entry_Category\": \"general\" }\n\nTexto original:\n").concat(texto_original, "\n  ").trim();
          lastError = null;
          _i = 0, _MODELS = MODELS;
        case 3:
          if (!(_i < _MODELS.length)) {
            _context.n = 9;
            break;
          }
          model = _MODELS[_i];
          _context.p = 4;
          console.log("[vox-rewrite] probando ".concat(model));
          _context.n = 5;
          return _axios["default"].post("https://api.groq.com/openai/v1/chat/completions", {
            model: model,
            messages: [{
              role: "user",
              content: prompt
            }],
            temperature: 0.5,
            response_format: {
              type: "json_object"
            }
          }, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer ".concat(process.env.GROQ_API_KEY)
            },
            timeout: 30000
          });
        case 5:
          r = _context.v;
          console.log("RESPUESTA GROQ OK con", model, ":", r.data.choices[0].message.content.slice(0, 120));
          content = r.data.choices[0].message.content;
          data = JSON.parse(content);
          return _context.a(2, res.json({
            data: data,
            model_usado: model,
            keyExiste: true
          }));
        case 6:
          _context.p = 6;
          _t = _context.v;
          detalle = ((_e$response = _t.response) === null || _e$response === void 0 ? void 0 : _e$response.data) || _t.message;
          console.log("FALL\xD3 ".concat(model, ":"), detalle);
          lastError = detalle;
          // si es error de modelo, probá el siguiente
          if (!((detalle === null || detalle === void 0 || (_detalle$error = detalle.error) === null || _detalle$error === void 0 ? void 0 : _detalle$error.code) === 'model_not_found' || (detalle === null || detalle === void 0 || (_detalle$error2 = detalle.error) === null || _detalle$error2 === void 0 ? void 0 : _detalle$error2.code) === 'model_decommissioned')) {
            _context.n = 7;
            break;
          }
          return _context.a(3, 8);
        case 7:
          if (!(((_e$response2 = _t.response) === null || _e$response2 === void 0 ? void 0 : _e$response2.status) === 401 || ((_e$response3 = _t.response) === null || _e$response3 === void 0 ? void 0 : _e$response3.status) === 429)) {
            _context.n = 8;
            break;
          }
          return _context.a(3, 9);
        case 8:
          _i++;
          _context.n = 3;
          break;
        case 9:
          console.log("ERROR GROQ COMPLETO:", lastError);
          return _context.a(2, res.status(500).json({
            error: "Groq falló",
            detalle: lastError,
            keyExiste: !!process.env.GROQ_API_KEY
          }));
      }
    }, _callee, null, [[4, 6]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;