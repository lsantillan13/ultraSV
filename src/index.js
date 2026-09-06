import './database.js';
import app from './app.js';
const PORT = process.env.PORT || 8000; // Koyeb Free usa 8000

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`[VoxDiario] Server v2 listening on ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  server.close(() => process.exit(0));
});