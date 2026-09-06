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
var _cors = _interopRequireDefault(require("cors"));
var _compression = _interopRequireDefault(require("compression"));
var _helmet = _interopRequireDefault(require("helmet"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.use((0, _helmet["default"])({
  crossOriginResourcePolicy: false
}));
app.use((0, _compression["default"])());
(0, _initialSetup.createRoles)();
var whitelist = ['https://voxdiario.com', 'https://www.voxdiario.com', 'http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8080', 'http://192.168.100.11:3000', 'http://192.168.100.11:8080'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (!_origin || whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
};
app.use((0, _cors["default"])(corsOptions));
app.use(_express["default"].json({
  limit: '5mb'
}));
app.use(_express["default"].urlencoded({
  extended: true,
  limit: '5mb'
}));
app.use((0, _morgan["default"])('dev'));

// --- HEALTH CHECK ---
app.get('/health', function (req, res) {
  res.status(200).json({
    status: 'ok',
    service: 'ultraserver',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});
app.get('/', function (req, res) {
  res.send("<!DOCTYPE html>\n<html lang=\"es\">\n<head><meta charset=\"UTF-8\"><title>VoxDiario API</title></head>\n<body><h1>VoxDiario API v2 Running</h1><ul><li><a href=\"/api/posts?limit=10\">Posts</a></li><li><a href=\"/health\">Health</a></li></ul></body>\n</html>");
});
app.use('/api/posts', _postRoutes["default"]);
app.use('/api/content', _contentRoutes["default"]);
app.use('/api/auth', _authRoutes["default"]);
app.use('/api/users', _userRoutes["default"]);
app.use('/api/cortes', _corteRoutes["default"]);
var _default = exports["default"] = app;