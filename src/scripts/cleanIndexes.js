import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('[DB] Conectado');

  const collections = ['entries', 'posts']; // por si tenés las dos

  for (const colName of collections) {
    try {
      const col = mongoose.connection.db.collection(colName);
      const indexes = await col.indexes();
      console.log(`\n> Índices de ${colName}:`, indexes.map(i => i.name));

      // Borra todos los índices menos el _id_
      // Si querés borrar solo uno, cambia acá abajo
      // await col.dropIndex('Entry_Slug_1') por ejemplo
      
      console.log(`  Limpiando índices de ${colName}...`);
      await col.dropIndexes();
      console.log(`  OK - índices borrados de ${colName}`);
    } catch (e) {
      console.log(`  ${colName} no existe o ya está limpio:`, e.message);
    }
  }

  await mongoose.disconnect();
  console.log('\nListo. Ahora cuando levantes el server Mongoose te recrea solo los índices que están en el schema nuevo.');
}

run();