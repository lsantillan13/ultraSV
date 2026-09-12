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
var _trendingDecay = require("./jobs/trendingDecay.js");
var _cors = _interopRequireDefault(require("cors"));
var _compression = _interopRequireDefault(require("compression"));
var _helmet = _interopRequireDefault(require("helmet"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
(0, _trendingDecay.startTrendingJobs)(); // <-- ACA SE INICIA

// PUBLIC ESTATICO PRIMERO
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
  res.send("<h1>VoxDiario API v2 Running</h1>\n  <ul>\n    <li><a href=\"/health\">Health</a></li>\n    <li><a href=\"/sitemap.xml\">sitemap.xml</a></li>\n    <li><a href=\"/api/content/carousel\">/api/content/carousel</a></li>\n    <li><a href=\"/api/content/component\">/api/content/component</a></li>\n    <li><a href=\"/api/v2/servicios/cortes\">/api/v2/servicios/cortes</a></li>\n    <li><a href=\"/api/v2/servicios/farmacias\">/api/v2/servicios/farmacias</a></li>\n    <li><a href=\"/api/v2/servicios/rutas\">/api/v2/servicios/rutas</a></li>\n    <li><a href=\"/api/v2/tags\">/api/v2/tags</a></li>\n    <li><a href=\"/api/v2/posts/destacada\">/api/v2/posts/destacada</a></li>\n  </ul>");
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
app.use('/api/v2/views', _viewsRoutes["default"]);
app.use('/api/v2/tags', _tagsRoutes["default"]);
app.use('/api/v2/tts', _ttsRoutes["default"]);
app.use('/api/v2/categorias', _categoriasRoutes["default"]);
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