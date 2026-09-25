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
var _voxRewriteRoutes = _interopRequireDefault(require("./routes/v2/vox-rewrite.routes.js"));
var _rutasRoutes = _interopRequireDefault(require("./routes/rutas.routes.js"));
var _postsV2Routes = _interopRequireDefault(require("./routes/posts.v2.routes.js"));
var _tagsRoutes = _interopRequireDefault(require("./routes/v2/tags.routes.js"));
var _ttsRoutes = _interopRequireDefault(require("./routes/v2/tts.routes.js"));
var _viewsRoutes = _interopRequireDefault(require("./routes/v2/views.routes.js"));
var _categoriasRoutes = _interopRequireDefault(require("./routes/v2/categorias.routes.js"));
var _instagramRoutes = _interopRequireDefault(require("./routes/v2/instagram.routes.js"));
var _trendingCron = require("./crons/trending.cron.js");
var _sitemapPingCron = require("./crons/sitemapPing.cron.js");
var _axios = _interopRequireDefault(require("axios"));
require("dotenv/config");
var _cors = _interopRequireDefault(require("cors"));
var _compression = _interopRequireDefault(require("compression"));
var _helmet = _interopRequireDefault(require("helmet"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = _path["default"].dirname(_filename);
var app = (0, _express["default"])();
var whitelist = ['https://voxdiario.com', 'http://localhost:3000', 'http://localhost:5173'];
var corsOptions = {
  origin: function origin(_origin, cb) {
    if (!_origin) return cb(null, true);
    if (whitelist.includes(_origin)) return cb(null, true);
    if (process.env.NODE_ENV !== 'production') return cb(null, true);
    return cb(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-access-token', 'x-auth-token']
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

// IMPORTANTE PARA IG FRAMES - TIENE QUE IR ANTES DE LAS RUTAS
app.use('/uploads', _express["default"]["static"](_path["default"].join(_dirname, '../public/uploads')));
app.use('/public', _express["default"]["static"]('public'));
(0, _initialSetup.createRoles)();
(0, _trendingCron.startTrendingCron)();
(0, _sitemapPingCron.startSitemapPingCron)();

// --- ENDPOINTS RADIO ---
app.get('/radio/status', function (req, res) {
  var radio = app.get('radio');
  res.json(radio ? radio.getStatus() : {
    isOnAir: false,
    listeners: 0
  });
});
app.get('/radio/reset', function (req, res) {
  var radio = app.get('radio');
  if (radio) radio.setOff();
  res.json({
    ok: true
  });
});

// 1. FUERZA CANONICA SIN-WWW 301
app.use(function (req, res, next) {
  var host = (req.headers.host || '').toLowerCase();
  if (host.startsWith('www.')) {
    return res.redirect(301, "https://voxdiario.com".concat(req.originalUrl));
  }
  next();
});

// 2. BOT SEO + JSON-LD
var BOT_REGEX = /facebookexternalhit|Twitterbot|WhatsApp|LinkedInBot|Slackbot|TelegramBot/i;
var SITE_CANONICAL = 'https://voxdiario.com';
function escAttr() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
}
function escHtml() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
app.use(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res, next) {
    var ua, slug, baseLocal, tryFetch, _post, _post2, post, title, titleHtml, desc, image, url, published, modified, jsonLd, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          ua = req.headers['user-agent'] || '';
          if (BOT_REGEX.test(ua)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, next());
        case 1:
          if (!(req.path.startsWith('/api') || req.path.startsWith('/health') || req.path.startsWith('/sitemap') || req.path.startsWith('/radio') || req.path.startsWith('/feed') || req.path.startsWith('/uploads'))) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, next());
        case 2:
          if (!(req.path === '/' || req.path === '/public')) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, next());
        case 3:
          slug = req.path.split('/').filter(Boolean).pop();
          if (!(!slug || slug.length < 3)) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, next());
        case 4:
          baseLocal = "http://localhost:".concat(process.env.PORT || 8080);
          tryFetch = /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url) {
              var _data$posts, _yield$axios$get, data, _t;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.p = _context.n) {
                  case 0:
                    _context.p = 0;
                    _context.n = 1;
                    return _axios["default"].get(url, {
                      timeout: 4000
                    });
                  case 1:
                    _yield$axios$get = _context.v;
                    data = _yield$axios$get.data;
                    return _context.a(2, (data === null || data === void 0 ? void 0 : data.data) || (data === null || data === void 0 ? void 0 : data.post) || (data === null || data === void 0 || (_data$posts = data.posts) === null || _data$posts === void 0 ? void 0 : _data$posts[0]) || data);
                  case 2:
                    _context.p = 2;
                    _t = _context.v;
                    return _context.a(2, null);
                }
              }, _callee, null, [[0, 2]]);
            }));
            return function tryFetch(_x4) {
              return _ref2.apply(this, arguments);
            };
          }();
          _context2.p = 5;
          _context2.n = 6;
          return tryFetch("".concat(baseLocal, "/api/v2/entradas/").concat(slug));
        case 6:
          post = _context2.v;
          if ((_post = post) !== null && _post !== void 0 && _post.Entry_Title) {
            _context2.n = 8;
            break;
          }
          _context2.n = 7;
          return tryFetch("".concat(baseLocal, "/api/v2/entradas/slug/").concat(slug));
        case 7:
          post = _context2.v;
        case 8:
          if ((_post2 = post) !== null && _post2 !== void 0 && _post2.Entry_Title) {
            _context2.n = 9;
            break;
          }
          return _context2.a(2, next());
        case 9:
          title = escAttr(post.Entry_Title);
          titleHtml = escHtml(post.Entry_Title);
          desc = escAttr(String(post.Entry_Resume || post.Entry_Title || '').slice(0, 160));
          image = post.Entry_Featured_Image || "".concat(SITE_CANONICAL, "/og-default.jpg");
          url = "".concat(SITE_CANONICAL).concat(req.path);
          published = post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString();
          modified = post.updatedAt ? new Date(post.updatedAt).toISOString() : published;
          jsonLd = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": post.Entry_Title,
            "description": String(post.Entry_Resume || '').slice(0, 160),
            "image": [image],
            "datePublished": published,
            "dateModified": modified,
            "author": [{
              "@type": "Person",
              "name": post.Entry_Author || "Vox Diario"
            }],
            "publisher": {
              "@type": "Organization",
              "name": "Vox Diario",
              "logo": {
                "@type": "ImageObject",
                "url": "".concat(SITE_CANONICAL, "/logo.png")
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": url
            }
          });
          res.set('Cache-Control', 'public, max-age=3600');
          return _context2.a(2, res.status(200).send("<!DOCTYPE html><html lang=\"es\"><head><meta charset=\"utf-8\"/><title>".concat(title, " | Vox Diario</title><meta name=\"description\" content=\"").concat(desc, "\"/><link rel=\"canonical\" href=\"").concat(url, "\"/><meta property=\"og:title\" content=\"").concat(title, "\"/><meta property=\"og:description\" content=\"").concat(desc, "\"/><meta property=\"og:image\" content=\"").concat(image, "\"/><meta property=\"og:url\" content=\"").concat(url, "\"/><meta property=\"og:type\" content=\"article\"/><meta property=\"og:site_name\" content=\"Vox Diario\"/><meta property=\"article:published_time\" content=\"").concat(published, "\"/><meta property=\"article:modified_time\" content=\"").concat(modified, "\"/><meta name=\"twitter:card\" content=\"summary_large_image\"/><meta name=\"twitter:title\" content=\"").concat(title, "\"/><meta name=\"twitter:description\" content=\"").concat(desc, "\"/><meta name=\"twitter:image\" content=\"").concat(image, "\"/><script type=\"application/ld+json\">").concat(jsonLd, "</script></head><body><h1>").concat(titleHtml, "</h1></body></html>")));
        case 10:
          _context2.p = 10;
          _t2 = _context2.v;
          return _context2.a(2, next());
      }
    }, _callee2, null, [[5, 10]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
app.get('/health', function (req, res) {
  return res.json({
    status: 'ok',
    service: 'ultraserver',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});
app.get('/', function (req, res) {
  return res.send("<h1>VoxDiario API v2 Running</h1>");
});
app.use('/', _sitemapRoutes["default"]);
app.use('/api/v2', _sitemapRoutes["default"]);
app.use('/api/posts', _postRoutes["default"]);
app.use('/api/content', _contentRoutes["default"]);
app.use('/api/auth', _authRoutes["default"]);
app.use('/api/users', _userRoutes["default"]);
app.use('/api/cortes', _corteRoutes["default"]);
app.use('/api/boletin', _boletinRoutes["default"]);
app.use('/api/v2/servicios/rutas', _rutasRoutes["default"]);
app.use('/api/v2/posts', _postsV2Routes["default"]);
app.use('/api/v2/vox-rewrite', _voxRewriteRoutes["default"]);
app.use('/api/v2/entradas', _postsV2Routes["default"]);
app.use('/api/v2/views', _viewsRoutes["default"]);
app.use('/api/v2/tags', _tagsRoutes["default"]);
app.use('/api/v2/tts', _ttsRoutes["default"]);
app.use('/api/v2/categorias', _categoriasRoutes["default"]);
app.use('/api/v2/boletin', _boletinRoutes["default"]);
app.use('/api/v2/instagram', _instagramRoutes["default"]); // <- IG VIVO CON FRAMES

app.use(function (req, res) {
  return res.status(404).json({
    status: 404,
    message: 'Ruta no encontrada'
  });
});
app.use(function (err, req, res, next) {
  return res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Error interno'
  });
});
var _default = exports["default"] = app;