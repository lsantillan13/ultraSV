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
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])('dev'));
app.use((0, _cors["default"])());
app.use(function (req, res, next) {
  var allowedOrigins = ['https://voxdiario.com', 'http://127.0.0.1:5001', 'http://localhost:5001', 'https://ultravox.netlify.app', 'http://localhost:3000'];
  var origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.get('/', function (req, res) {
  res.json('');
});
app.use('/api/posts', _postRoutes["default"]);
app.use('/api/auth', _authRoutes["default"]);
app.use('/api/users', _userRoutes["default"]);
app.use('/api/cortes', _corteRoutes["default"]);
var _default = app;
exports["default"] = _default;