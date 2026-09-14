require('dotenv').config();
const mongoose = require('mongoose');

const MAP = {
  "Sociedad": "sociedad", "Economía": "economia", "Política": "politica",
  "Deportes": "deportes", "Energía": "energia", "Policiales": "policiales",
  "Espectáculos": "espectaculos", "Tecnología": "tecnologia", "Tecnologia": "tecnologia",
  "Emprender": "emprender", "Streaming": "streaming", "Los40": "los40", "Inmobiliarias": "inmobiliarias"
};
const LABEL = {
  "sociedad": "Sociedad", "economia": "Economía", "politica": "Política",
  "deportes": "Deportes", "energia": "Energía", "policiales": "Policiales",
  "espectaculos": "Espectáculos", "tecnologia": "Tecnología",
  "emprender": "Emprender", "streaming": "Streaming", "los40": "Los40", "inmobiliarias": "Inmobiliarias"
};

(async()=>{
  await mongoose.connect(process.env.MONGODB_URI);
  const posts = mongoose.connection.db.collection('posts');
  for (const [bad, slug] of Object.entries(MAP)) {
    await posts.updateMany({Entry_Category: bad}, {$set: {Entry_Category: slug, Entry_Category_Label: LABEL[slug]}});
  }
  // los que ya estaban en minúscula sin tilde
  await posts.updateMany({Entry_Category: 'economia'}, {$set: {Entry_Category_Label: 'Economía'}});
  await posts.updateMany({Entry_Category: 'politica'}, {$set: {Entry_Category_Label: 'Política'}});
  console.log('migrado a slug');
  await mongoose.disconnect();
})();