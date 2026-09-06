import mongoose from 'mongoose';

mongoose.set('strictQuery', false); // true depreca queries, false es mas rapido

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://ultravox:los40@ac-lovzreh-shard-00-00.egn8msm.mongodb.net:27017,ac-lovzreh-shard-00-01.egn8msm.mongodb.net:27017,ac-lovzreh-shard-00-02.egn8msm.mongodb.net:27017/?ssl=true&replicaSet=atlas-gtoerv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

// Cache de conexion para no reconectar en cada hot-reload de Koyeb
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('[DB] Conectando a Mongo...');
    cached.promise = mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10, // Koyeb free: max 10 conexiones
      minPoolSize: 2,  // Mantiene 2 vivas
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // IPv4, mas rapido en Koyeb
      // useNewUrlParser y useUnifiedTopology ya no se usan en mongoose 7
    }).then((mongoose) => {
      console.log('[DB] Mongo conectado');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('[DB] Error de conexion', e);
    throw e;
  }

  return cached.conn;
}

connectDB();

export default mongoose;
