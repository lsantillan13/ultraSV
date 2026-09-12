// src/seeds/seedVox.js - usa tu mismo MONGODB_URI de database.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://ultravox:los40@ac-lovzreh-shard-00-00.egn8msm.mongodb.net:27017,ac-lovzreh-shard-00-01.egn8msm.mongodb.net:27017,ac-lovzreh-shard-00-02.egn8msm.mongodb.net:27017/?ssl=true&replicaSet=atlas-gtoerv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const EntrySchema = new mongoose.Schema({
  Entry_Title: String,
  Entry_Resume: String,
  Entry_Featured_Image: String,
  Entry_Category: String,
  Entry_Status: String,
}, { timestamps: true, collection: 'entries' });

const BoletinSchema = new mongoose.Schema({
  fechaTexto: String,
  titulo: String,
  horario: String,
  zonas: [String],
  motivo: String,
  estado: String,
}, { timestamps: true, collection: 'boletincortes' });

const Entry = mongoose.model('Entry', EntrySchema);
const BoletinCorte = mongoose.model('BoletinCorte', BoletinSchema);

const MOCK = Array.from({ length: 15 }).map((_, i) => ({
  Entry_Title: `Nota VOX ${i+1} - Neuquén: obra, tránsito y servicios`,
  Entry_Resume: 'Bajada de prueba para VoxHeroPro. Resumen corto para el hover.',
  Entry_Featured_Image: `https://picsum.photos/seed/vox${Date.now()+i}/800/600`,
  Entry_Category: ['ciudad','politica','gastronomia'][i % 3],
  Entry_Status: 'published',
  createdAt: new Date(Date.now() - i * 60000 * 30)
}));

async function run() {
  console.log('Conectando a Atlas...');
  await mongoose.connect(MONGODB_URI);
  console.log('Conectado');

  await Entry.deleteMany({});
  await BoletinCorte.deleteMany({});

  await Entry.insertMany(MOCK);
  await BoletinCorte.create({
    fechaTexto: 'DOMINGO 6 DE SEPTIEMBRE',
    titulo: 'CORTES PROGRAMADOS',
    horario: 'De 07:30 a 13:30 hs',
    zonas: ['Zona Este: Av. Argentina entre Ranel y Leloir'],
    motivo: 'Mantenimiento y modernización de la red',
    estado: 'vigente'
  });

  const total = await Entry.countDocuments({ Entry_Status: 'published' });
  console.log(`Seed OK -> ${total} published + 1 boletin vigente`);
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });