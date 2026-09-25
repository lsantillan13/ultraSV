import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.set('strictQuery', false);

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB(retries = 5) {
  if (cached.conn) {
    return cached.conn; 
  }

  if (!cached.promise) {
    console.log('[DB] Conectando a Mongo...');
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 10000, // subilo a 10s, Atlas gratis tarda en despertar
      socketTimeoutMS: 45000,
      family: 4,
    }).then((m) => {
      console.log('[DB] Mongo conectado');
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error(`[DB] Error de conexion. Reintentos restantes: ${retries - 1}`, e.message);
    
    if (retries > 1) {
      console.log('[DB] Reintentando en 3s...');
      await new Promise(res => setTimeout(res, 3000));
      return connectDB(retries - 1);
    }
    // si ya no hay reintentos, no hacemos throw que mata el server, solo logeamos
    console.error('[DB] Se acabaron los reintentos. Atlas sigue dormido o IP bloqueada.');
    return null;
  }

  return cached.conn;
}

// NO lo llames asi pelado: connectDB();
// Llamalo con catch para que no mate nodemon
connectDB().catch(err => {
  console.error('[DB] Fallo inicial no critico:', err.message);
});

export default mongoose;
export { connectDB };