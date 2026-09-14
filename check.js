require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const posts = mongoose.connection.db.collection('posts');
  
  console.log('--- INDICES ---');
  const indexes = await posts.indexes();
  indexes.forEach(i => console.log(`- ${i.name}:`, JSON.stringify(i.key)));

  console.log('\n--- CATEGORIAS EN DB ---');
  const cats = await posts.aggregate([
    { $group: { _id: "$Entry_Category", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]).toArray();
  cats.forEach(c => console.log(`- ${c._id}: ${c.count}`));

  await mongoose.disconnect();
})();