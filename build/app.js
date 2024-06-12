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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])('dev'));
var whitelist = ['https://voxdiario.com', 'http://localhost:3000'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1 || !_origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use((0, _cors["default"])(corsOptions));
app.get('/', function (req, res) {
  res.send("<!DOCTYPE html>\n<html lang=\"es\">\n<head>\n    <meta charset=\"UTF-8\">\n    <title>Directorio de API</title>\n</head>\n<body>\n    <h1>Bienvenido al directorio de API</h1>\n    <p>Utiliza los siguientes enlaces para acceder a las APIs:</p>\n    <ul>\n        <li><a href=\"/api/posts\">Posts API</a></li>\n        <li><a href=\"/api/auth\">Auth API</a></li>\n        <li><a href=\"/api/users\">Users API</a></li>\n        <li><a href=\"/api/cortes\">Cortes API</a></li>\n    </ul>\n</body>\n</html>");
});
app.use('/api/posts', _postRoutes["default"]);
app.use('/api/content', _contentRoutes["default"]);
app.use('/api/auth', _authRoutes["default"]);
app.use('/api/users', _userRoutes["default"]);
app.use('/api/cortes', _corteRoutes["default"]);
var _default = app;
exports["default"] = _default;