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
var _cors = _interopRequireDefault(require("cors"));
var _compression = _interopRequireDefault(require("compression"));
var _helmet = _interopRequireDefault(require("helmet"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// <-- NUEVO

var app = (0, _express["default"])();
var whitelist = ['https://voxdiario.com', 'https://www.voxdiario.com', 'https://voxdiario.com.ar', 'https://www.voxdiario.com.ar', 'http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8080', 'http://192.168.100.11:3000', 'http://192.168.100.11:8080'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (!_origin) return callback(null, true);
    if (whitelist.includes(_origin)) return callback(null, true);
    // Permitir Googlebot y crawlers
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
  res.send("<h1>VoxDiario API v2 Running</h1>\n  <ul>\n    <li><a href=\"/health\">Health</a></li>\n    <li><a href=\"/sitemap.xml\">sitemap.xml</a></li>\n    <li><a href=\"/sitemap-news.xml\">sitemap-news.xml (Google News)</a></li>\n    <li><a href=\"/robots.txt\">robots.txt</a></li>\n    <li><a href=\"/feed.xml\">feed.xml (RSS)</a></li>\n  </ul>");
});

// --- SITEMAPS Y SEO - ANTES DE /api para que sean en root ---
app.use('/', _sitemapRoutes["default"]);

// --- TUS RUTAS EXISTENTES ---
app.use('/api/posts', _postRoutes["default"]);
app.use('/api/content', _contentRoutes["default"]);
app.use('/api/auth', _authRoutes["default"]);
app.use('/api/users', _userRoutes["default"]);
app.use('/api/cortes', _corteRoutes["default"]);
app.use(function (req, res) {
  res.status(404).json({
    status: 404,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});
app.use(function (err, req, res, next) {
  console.error('[VoxDiario API ERROR]', err);
  var origin = req.headers.origin;
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
  }
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Error interno'
  });
});
var _default = exports["default"] = app;