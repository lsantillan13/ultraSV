import './database.js';
import app from './app.js';
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`[VoxDiario] Server v2 listening on ${PORT}`);
});

// Graceful shutdown para Koyeb (evita caidas)
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing...');
  server.close(() => process.exit(0));
});
