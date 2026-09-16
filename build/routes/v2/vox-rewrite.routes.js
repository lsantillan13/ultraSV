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
var MODELS = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "meta-llama/llama-4-maverick-17b-128e-instruct"];

// EL MEJOR PROMPT - SEO + NEUQUÉN + ANTI-ALUCINACIÓN - INTACTO
var SYSTEM_PROMPT = "\nSos el EDITOR JEFE de Ultravox, el diario digital #1 de Neuqu\xE9n Capital.\nTu trabajo es reescribir notas para web con calidad Clar\xEDn + Infobae.\n\nREGLAS INQUEBRANTABLES:\n1. NUNCA inventes datos, nombres, fechas, montos o lugares. Si no est\xE1 en el original, no lo agregues.\n2. Manten\xE9 la informaci\xF3n factual 100% intacta.\n3. Mejor\xE1 redacci\xF3n, ortograf\xEDa, fluidez y SEO.\n4. Tono: period\xEDstico neuquino, profesional, cercano, sin sensacionalismo berreta.\n5. NO uses clickbait. Titular informativo pero atractivo.\n\nFORMATO DE SALIDA - JSON V\xC1LIDO OBLIGATORIO:\n{\n  \"titulo\": \"60-75 caracteres, con palabra clave principal al inicio, ej: 'Neuqu\xE9n: ...'\",\n  \"bajada\": \"140-160 caracteres, resumen que incite a leer, con 1 dato clave\",\n  \"contenido_mejorado\": \"HTML limpio con <p>, <h2>, <strong>. 3 a 5 p\xE1rrafos. Primer p\xE1rrafo con lo m\xE1s importante. Us\xE1 <h2> para subt\xEDtulos si la nota es larga. Negrita para datos clave. Lenguaje claro.\",\n  \"palabras_clave\": [\"neuquen\", \"palabra2\", \"palabra3\"],\n  \"slug_seo\": \"titulo-en-minusculas-con-guiones\",\n  \"resumen_seo\": \"155 caracteres para meta description\"\n}\n\nESTILO NEUQU\xC9N:\n- Dec\xED \"Neuqu\xE9n capital\" no solo \"Neuqu\xE9n\" cuando sea de la ciudad\n- Us\xE1 referencias locales si aplica (Av Argentina, Paseo Costero, CALF, etc)\n- Evit\xE1 porte\xF1ismos\n\nSi el contenido original es malo o corto, mejoralo igual sin inventar.\nSi no pod\xE9s mejorar, devolv\xE9 el original pulido.\n";
router.post("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body$texto_origi, titulo, bajada, contenido, tono, apiKey, userPrompt, lastError, _i, _MODELS, model, r, raw, data, _err$response, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          // Compatibilidad con tu CRM que manda texto_original / fuente1
          titulo = req.body.titulo || ((_req$body$texto_origi = req.body.texto_original) === null || _req$body$texto_origi === void 0 ? void 0 : _req$body$texto_origi.slice(0, 200)) || "";
          bajada = req.body.bajada || req.body.texto_secundario || "";
          contenido = req.body.contenido || req.body.texto_original || "";
          tono = req.body.modo || req.body.tono || "periodistico";
          if (!(!titulo && !contenido)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            ok: false,
            error: "Falta contenido"
          }));
        case 1:
          apiKey = process.env.GROQ_API_KEY;
          if (apiKey) {
            _context.n = 2;
            break;
          }
          return _context.a(2, res.status(500).json({
            ok: false,
            error: "Falta GROQ_API_KEY"
          }));
        case 2:
          userPrompt = "\nTONO PEDIDO: ".concat(tono, "\n\nTITULO ORIGINAL: ").concat(titulo || "(sin titulo)", "\nBAJADA ORIGINAL: ").concat(bajada || "(sin bajada)", "\nCONTENIDO ORIGINAL:\n").concat((contenido || "").slice(0, 9000), "\n\nFUENTE1: ").concat(req.body.fuente1 || "", "\nFUENTE2: ").concat(req.body.fuente2 || "", "\n\nInstrucci\xF3n: Reescrib\xED siguiendo el formato JSON obligatorio. No agregues texto fuera del JSON.\n");
          lastError = "";
          _i = 0, _MODELS = MODELS;
        case 3:
          if (!(_i < _MODELS.length)) {
            _context.n = 9;
            break;
          }
          model = _MODELS[_i];
          _context.p = 4;
          _context.n = 5;
          return _axios["default"].post("https://api.groq.com/openai/v1/chat/completions", {
            model: model,
            messages: [{
              role: "system",
              content: SYSTEM_PROMPT
            }, {
              role: "user",
              content: userPrompt
            }],
            temperature: 0.5,
            max_tokens: 3500,
            response_format: {
              type: "json_object"
            }
          }, {
            headers: {
              Authorization: "Bearer ".concat(apiKey)
            },
            timeout: 30000
          });
        case 5:
          r = _context.v;
          raw = r.data.choices[0].message.content;
          data = JSON.parse(raw);
          if (!(!data.titulo || !data.contenido_mejorado)) {
            _context.n = 6;
            break;
          }
          throw new Error("JSON incompleto");
        case 6:
          return _context.a(2, res.json(_objectSpread(_objectSpread({
            ok: true,
            model: model
          }, data), {}, {
            data: {
              Entry_Title: data.titulo,
              Entry_Bajada: data.bajada,
              Entry_Content: data.contenido_mejorado,
              Entry_Slug: data.slug_seo,
              Entry_Resume: data.resumen_seo,
              Entry_Keywords: data.palabras_clave
            }
          })));
        case 7:
          _context.p = 7;
          _t = _context.v;
          lastError = ((_err$response = _t.response) === null || _err$response === void 0 || (_err$response = _err$response.data) === null || _err$response === void 0 || (_err$response = _err$response.error) === null || _err$response === void 0 ? void 0 : _err$response.message) || _t.message;
          console.warn("[vox-rewrite] fail ".concat(model, ": ").concat(lastError));
          return _context.a(3, 8);
        case 8:
          _i++;
          _context.n = 3;
          break;
        case 9:
          throw new Error(lastError || "Groq falló en todos los modelos");
        case 10:
          _context.p = 10;
          _t2 = _context.v;
          console.error(_t2);
          res.status(500).json({
            ok: false,
            error: "Falta el backend o falló Groq",
            detail: _t2.message
          });
        case 11:
          return _context.a(2);
      }
    }, _callee, null, [[4, 7], [0, 10]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;