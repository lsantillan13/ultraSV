"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _initialSetup = require("./libs/initialSetup.js");
var _morgan = _interopRequireDefault(require("morgan"));
var _postRoutes = _interopRequireDefault(require("./routes/post.routes.js"));
var _authRoutes = _interopRequireDefault(require("./routes/auth.routes.js"));
var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));
var _corteRoutes = _interopRequireDefault(require("./routes/corte.routes.js"));
var _contentRoutes = _interopRequireDefault(require("./routes/content.routes.js"));
var _sitemapRoutes = _interopRequireDefault(require("./routes/sitemap.routes.js"));
var _boletinRoutes = _interopRequireDefault(require("./routes/boletin.routes.js"));
var _rutasRoutes = _interopRequireDefault(require("./routes/rutas.routes.js"));
var _postsV2Routes = _interopRequireDefault(require("./routes/posts.v2.routes.js"));
var _tagsRoutes = _interopRequireDefault(require("./routes/v2/tags.routes.js"));
var _ttsRoutes = _interopRequireDefault(require("./routes/v2/tts.routes.js"));
var _viewsRoutes = _interopRequireDefault(require("./routes/v2/views.routes.js"));
var _categoriasRoutes = _interopRequireDefault(require("./routes/v2/categorias.routes.js"));
var _trendingCron = require("./crons/trending.cron.js");
var _axios = _interopRequireDefault(require("axios"));
require("dotenv/config");
var _cors = _interopRequireDefault(require("cors"));
var _compression = _interopRequireDefault(require("compression"));
var _helmet = _interopRequireDefault(require("helmet"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var app = (0, _express["default"])();
var whitelist = ['https://voxdiario.com', 'https://www.voxdiario.com', 'https://voxdiario.com.ar', 'https://www.voxdiario.com.ar', 'http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8080', 'http://192.168.100.11:3000', 'http://192.168.100.11:8080'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (!_origin) return callback(null, true);
    if (whitelist.includes(_origin)) return callback(null, true);
    if (_origin.includes('google') || _origin.includes('bing') || _origin.includes('facebook')) {
      return callback(null, true);
    }
    console.warn("CORS: Origin no listado pero permitido: ".concat(_origin));
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-access-token', 'x-auth-token'],
  exposedHeaders: ['x-access-token', 'Authorization'],
  optionsSuccessStatus: 204
};
app.use((0, _cors["default"])(corsOptions));
app.options('*', (0, _cors["default"])(corsOptions));
app.use((0, _helmet["default"])({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use((0, _compression["default"])());
app.use(_express["default"].json({
  limit: '5mb'
}));
app.use(_express["default"].urlencoded({
  extended: true,
  limit: '5mb'
}));
app.use((0, _morgan["default"])('dev'));
(0, _initialSetup.createRoles)();
(0, _trendingCron.startTrendingCron)();

// ========== FIX SEO BOTS PARA WHATSAPP / FB ==========
var BOT_REGEX = /facebookexternalhit|Twitterbot|WhatsApp|LinkedInBot|Slackbot|TelegramBot|Googlebot|bingbot/i;
var SITE_CANONICAL = 'https://voxdiario.com';
app.use(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res, next) {
    var ua, slug, _post, post, _data$posts, _yield$axios$get, data, _data$posts2, _yield$axios$get2, _data, title, desc, image, url, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          ua = req.headers['user-agent'] || '';
          if (BOT_REGEX.test(ua)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, next());
        case 1:
          if (!(req.path.startsWith('/api') || req.path.startsWith('/health') || req.path.startsWith('/sitemap'))) {
            _context.n = 2;
            break;
          }
          return _context.a(2, next());
        case 2:
          if (!(req.path === '/' || req.path === '/public')) {
            _context.n = 3;
            break;
          }
          return _context.a(2, next());
        case 3:
          slug = req.path.split('/').pop();
          if (!(!slug || slug.length < 5)) {
            _context.n = 4;
            break;
          }
          return _context.a(2, next());
        case 4:
          _context.p = 4;
          // intenta por slug directo (tu ruta buena de V2)
          post = null;
          _context.p = 5;
          _context.n = 6;
          return _axios["default"].get("http://localhost:".concat(process.env.PORT || 8080, "/api/v2/entradas/slug/").concat(slug), {
            timeout: 3000
          });
        case 6:
          _yield$axios$get = _context.v;
          data = _yield$axios$get.data;
          post = (data === null || data === void 0 ? void 0 : data.data) || (data === null || data === void 0 || (_data$posts = data.posts) === null || _data$posts === void 0 ? void 0 : _data$posts[0]) || data;
          _context.n = 9;
          break;
        case 7:
          _context.p = 7;
          _t = _context.v;
          _context.n = 8;
          return _axios["default"].get("https://ultraserver.koyeb.app/api/v2/entradas/slug/".concat(slug), {
            timeout: 4000
          });
        case 8:
          _yield$axios$get2 = _context.v;
          _data = _yield$axios$get2.data;
          post = (_data === null || _data === void 0 ? void 0 : _data.data) || (_data === null || _data === void 0 || (_data$posts2 = _data.posts) === null || _data$posts2 === void 0 ? void 0 : _data$posts2[0]) || _data;
        case 9:
          if ((_post = post) !== null && _post !== void 0 && _post.Entry_Title) {
            _context.n = 10;
            break;
          }
          return _context.a(2, next());
        case 10:
          title = String(post.Entry_Title).replace(/"/g, '&quot;');
          desc = String(post.Entry_Resume || post.Entry_Body_Resume_Plain || '').slice(0, 160).replace(/"/g, '&quot;');
          image = post.Entry_Featured_Image || "".concat(SITE_CANONICAL, "/og-default.jpg");
          url = "".concat(SITE_CANONICAL).concat(req.path);
          return _context.a(2, res.status(200).send("<!DOCTYPE html>\n<html lang=\"es\">\n<head>\n<meta charset=\"utf-8\" />\n<title>".concat(title, " | Vox Diario</title>\n<meta name=\"description\" content=\"").concat(desc, "\" />\n<link rel=\"canonical\" href=\"").concat(url, "\" />\n<meta property=\"og:title\" content=\"").concat(title, "\" />\n<meta property=\"og:description\" content=\"").concat(desc, "\" />\n<meta property=\"og:image\" content=\"").concat(image, "\" />\n<meta property=\"og:image:width\" content=\"1200\" />\n<meta property=\"og:image:height\" content=\"630\" />\n<meta property=\"og:url\" content=\"").concat(url, "\" />\n<meta property=\"og:type\" content=\"article\" />\n<meta property=\"og:site_name\" content=\"Vox Diario\" />\n<meta name=\"twitter:card\" content=\"summary_large_image\" />\n<meta name=\"twitter:title\" content=\"").concat(title, "\" />\n<meta name=\"twitter:description\" content=\"").concat(desc, "\" />\n<meta name=\"twitter:image\" content=\"").concat(image, "\" />\n</head>\n<body>\n<h1>").concat(title, "</h1>\n<p>").concat(desc, "</p>\n<img src=\"").concat(image, "\" alt=\"").concat(title, "\" />\n<p><a href=\"").concat(url, "\">Ver nota completa en Vox Diario</a></p>\n<script>window.location.href=\"").concat(url, "\"</script>\n</body>\n</html>")));
        case 11:
          _context.p = 11;
          _t2 = _context.v;
          console.warn('[SEO BOT] fail', _t2.message);
          return _context.a(2, next());
      }
    }, _callee, null, [[5, 7], [4, 11]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
// ========== FIN FIX SEO ==========

// PUBLIC ESTATICO
app.use('/public', _express["default"]["static"]('public'));

// HEALTH
app.get('/health', function (req, res) {
  res.status(200).json({
    status: 'ok',
    service: 'ultraserver',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});
app.get('/', function (req, res) {
  res.send("<h1>VoxDiario API v2 Running</h1>\n  <ul>\n    <li><a href=\"/health\">Health</a></li>\n    <li><a href=\"/sitemap.xml\">sitemap.xml</a></li>\n    <li><a href=\"/api/content/carousel\">/api/content/carousel</a></li>\n    <li><a href=\"/api/v2/servicios/rutas\">/api/v2/servicios/rutas</a></li>\n    <li><a href=\"/api/v2/posts/destacada\">/api/v2/posts/destacada</a></li>\n    <li><a href=\"/api/v2/entradas\">/api/v2/entradas</a></li>\n  </ul>");
});
app.use('/', _sitemapRoutes["default"]);

// --- RUTAS V1 ---
app.use('/api/posts', _postRoutes["default"]);
app.use('/api/content', _contentRoutes["default"]);
app.use('/api/auth', _authRoutes["default"]);
app.use('/api/users', _userRoutes["default"]);
app.use('/api/cortes', _corteRoutes["default"]);
app.use('/api/boletin', _boletinRoutes["default"]);

// --- RUTAS V2 ---
app.use('/api/v2/servicios/rutas', _rutasRoutes["default"]);
app.use('/api/v2/posts', _postsV2Routes["default"]);
app.use('/api/v2/entradas', _postsV2Routes["default"]);
app.use('/api/v2/views', _viewsRoutes["default"]);
app.use('/api/v2/tags', _tagsRoutes["default"]);
app.use('/api/v2/tts', _ttsRoutes["default"]);
app.use('/api/v2/categorias', _categoriasRoutes["default"]);

// FIX: boletin soporta /actual y / - tu Dashboard usa ambos
app.use('/api/v2/boletin', _boletinRoutes["default"]);
app.use('/api/boletin', _boletinRoutes["default"]);
app.use(function (req, res) {
  res.status(404).json({
    status: 404,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});
app.use(function (err, req, res, next) {
  console.error('[VoxDiario API ERROR]', err);
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Error interno'
  });
});
var _default = exports["default"] = app;