import 'dotenv/config';
import './database.js';
import app from './app.js';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Dejamos * en socket, el filtro real lo hace app.js
    methods: ["GET", "POST"]
  },
  maxHttpBufferSize: 1e6,
  pingTimeout: 60000,
  pingInterval: 25000
});

// --- RADIO ---
let listeners = 0;
let isOnAir = false;
let emitterId = null;

// Para que app.js pueda responder /radio/status
app.set('radio', {
  getStatus: () => ({ isOnAir, listeners, emitterId }),
  setOff: () => {
    isOnAir = false;
    emitterId = null;
    io.emit('radio:status', { isOnAir, listeners });
    io.emit('radio:force-stop');
  }
});

io.on('connection', (socket) => {
  listeners++;
  console.log(`[RADIO] conectado: ${socket.id} | total: ${listeners} | ON AIR: ${isOnAir}`);

  socket.emit('radio:status', { isOnAir, listeners });

  socket.on('radio:emit', (chunk) => {
    if (emitterId && socket.id!== emitterId) return; // solo 1 emisor
    if (!isOnAir) {
      isOnAir = true;
      emitterId = socket.id;
      console.log(`[RADIO] ON AIR por ${socket.id}`);
      io.emit('radio:status', { isOnAir, listeners });
    }
    socket.broadcast.emit('radio:stream', chunk);
  });

  socket.on('radio:stop', () => {
    if (emitterId && socket.id!== emitterId) return;
    isOnAir = false;
    emitterId = null;
    console.log('[RADIO] OFF AIR por operador');
    io.emit('radio:status', { isOnAir, listeners });
    io.emit('radio:force-stop');
  });

  socket.on('disconnect', () => {
    listeners = Math.max(0, listeners - 1);
    if (emitterId === socket.id) {
      isOnAir = false;
      emitterId = null;
      console.log('[RADIO] OFF AIR por desconexión del emisor');
      io.emit('radio:status', { isOnAir, listeners });
      io.emit('radio:force-stop');
    }
    console.log(`[RADIO] desconectado: ${socket.id} | total: ${listeners}`);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[VoxDiario] Server v2 + Radio listening on ${PORT}`);
});

process.on('SIGTERM', () => {
  io.close(() => server.close(() => process.exit(0)));
});