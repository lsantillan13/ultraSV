"use strict";

require("./database.js");
var _app = _interopRequireDefault(require("./app.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PORT = process.env.PORT || 8000; // Koyeb Free usa 8000

var server = _app["default"].listen(PORT, '0.0.0.0', function () {
  console.log("[VoxDiario] Server v2 listening on ".concat(PORT));
});
process.on('SIGTERM', function () {
  console.log('SIGTERM received');
  server.close(function () {
    return process.exit(0);
  });
});