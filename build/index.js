"use strict";

var _app = _interopRequireDefault(require("./app.js"));
require("./database.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = process.env.PORT || 5001;
_app["default"].listen(PORT);
console.log('Server is listening on port', PORT);