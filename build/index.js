"use strict";

require("dotenv/config");
require("./database.js");
var _app = _interopRequireDefault(require("./app.js"));
var _http = _interopRequireDefault(require("http"));
var _socket = require("socket.io");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PORT = process.env.PORT || 8080;
var server = _http["default"].createServer(_app["default"]);
var io = new _socket.Server(server, {
  cors: {
    origin: "*",
    // Dejamos * en socket, el filtro real lo hace app.js
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 1e6,
  pingTimeout: 60000,
  pingInterval: 25000
});

// --- RADIO ---
var listeners = 0;
var isOnAir = false;
var emitterId = null;

// Para que app.js pueda responder /radio/status
_app["default"].set('radio', {
  getStatus: function getStatus() {
    return {
      isOnAir: isOnAir,
      listeners: listeners,
      emitterId: emitterId
    };
  },
  setOff: function setOff() {
    isOnAir = false;
    emitterId = null;
    io.emit('radio:status', {
      isOnAir: isOnAir,
      listeners: listeners
    });
    io.emit('radio:force-stop');
  }
});
io.on('connection', function (socket) {
  listeners++;
  console.log("[RADIO] conectado: ".concat(socket.id, " | total: ").concat(listeners, " | ON AIR: ").concat(isOnAir));
  socket.emit('radio:status', {
    isOnAir: isOnAir,
    listeners: listeners
  });
  socket.on('radio:emit', function (chunk) {
    if (emitterId && socket.id !== emitterId) return; // solo 1 emisor
    if (!isOnAir) {
      isOnAir = true;
      emitterId = socket.id;
      console.log("[RADIO] ON AIR por ".concat(socket.id));
      io.emit('radio:status', {
        isOnAir: isOnAir,
        listeners: listeners
      });
    }
    socket.broadcast.emit('radio:stream', chunk);
  });
  socket.on('radio:stop', function () {
    if (emitterId && socket.id !== emitterId) return;
    isOnAir = false;
    emitterId = null;
    console.log('[RADIO] OFF AIR por operador');
    io.emit('radio:status', {
      isOnAir: isOnAir,
      listeners: listeners
    });
    io.emit('radio:force-stop');
  });
  socket.on('disconnect', function () {
    listeners = Math.max(0, listeners - 1);
    if (emitterId === socket.id) {
      isOnAir = false;
      emitterId = null;
      console.log('[RADIO] OFF AIR por desconexión del emisor');
      io.emit('radio:status', {
        isOnAir: isOnAir,
        listeners: listeners
      });
      io.emit('radio:force-stop');
    }
    console.log("[RADIO] desconectado: ".concat(socket.id, " | total: ").concat(listeners));
  });
});
server.listen(PORT, '0.0.0.0', function () {
  console.log("[VoxDiario] Server v2 + Radio listening on ".concat(PORT));
});
process.on('SIGTERM', function () {
  io.close(function () {
    return server.close(function () {
      return process.exit(0);
    });
  });
});