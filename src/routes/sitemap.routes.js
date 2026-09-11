import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

const SITE_URL = 'https://www.voxdiario.com';

function esc(str = '') {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function getAllPosts(limit = 1000, filter = {}) {
  try {
    if (mongoose.connection.readyState!== 1) return [];

    // 1. Lista todas las colecciones de Mongo para encontrar la correcta
    const collections = await mongoose.connection.db.listCollections().toArray();
    const names = collections.map(c => c.name);
    console.log('[Sitemap] Colecciones disponibles:', names);

    // Nombres probables en orden
    const candidates = ['Entry', 'entries', 'Posts', 'posts', 'post', 'Post', 'entriesmodels', 'entrys'];

    for (const name of candidates) {
      if (!names.includes(name) &&!names.includes(name.toLowerCase())) continue;
      try {
        const coll = mongoose.connection.db.collection(name);
        const count = await coll.countDocuments();
        if (count > 0) {
          const sample = await coll.findOne();
          // Verifica que tenga Entry_Title que es tu campo
          if (sample && (sample.Entry_Title || sample.title)) {
            console.log(`[Sitemap] Usando colección: ${name} con ${count} docs`);
            const docs = await coll.find(filter).sort({ createdAt: -1, _id: -1 }).limit(limit).toArray();
            if (docs.length > 0) return docs;
          }
        }
      } catch {}
    }

    // 2. Si no encontró, busca en TODAS las colecciones una que tenga Entry_Title
    for (const colName of names) {
      if (colName.startsWith('system.')) continue;
      try {
        const coll = mongoose.connection.db.collection(colName);
        const one = await coll.findOne({ Entry_Title: { $exists: true } });
        if (one) {
          console.log(`[Sitemap] Encontrada por campo Entry_Title en: ${colName}`);
          return await coll.find(filter).sort({ createdAt: -1 }).limit(limit).toArray();
        }
      } catch {}
    }

  } catch(e) {
    console.error('getAllPosts error', e);
  }
  return [];
}

router.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /api/auth/

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-news.xml`);
});

router.get('/sitemap.xml', async (req, res) => {
  const posts = await getAllPosts(1000);
  console.log(`[Sitemap] sitemap.xml -> ${posts.length} posts`);
  const urls = posts.map(p => {
    const cat = esc(p.Entry_Category || 'noticia');
    const id = esc(p._id);
    const img = p.Entry_Featured_Image? `<image:image><image:loc>${esc(p.Entry_Featured_Image)}</image:loc></image:image>` : '';
    const lastmod = new Date(p.updatedAt || p.createdAt || Date.now()).toISOString();
    return ` <url><loc>${SITE_URL}/${cat}/${id}</loc><lastmod>${lastmod}</lastmod>${img}</url>`;
  }).join('\n');

  res.header('Content-Type', 'application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.0">
  <url><loc>${SITE_URL}/</loc><changefreq>always</changefreq><priority>1.0</priority></url>
${urls}
</urlset>`);
});

router.get('/sitemap-news.xml', async (req, res) => {
  const since = new Date(Date.now() - 48*60*60*1000);
  let posts = await getAllPosts(500, { createdAt: { $gte: since } });
  if (!posts.length) posts = await getAllPosts(50);
  console.log(`[Sitemap] sitemap-news.xml -> ${posts.length} posts`);
  const urls = posts.map(p => ` <url><loc>${SITE_URL}/${esc(p.Entry_Category)}/${esc(p._id)}</loc><news:news><news:publication><news:name>Vox Diario</news:name><news:language>es</news:language></news:publication><news:publication_date>${new Date(p.createdAt).toISOString()}</news:publication_date><news:title><![CDATA[${p.Entry_Title}]]></news:title></news:news></url>`).join('\n');
  res.header('Content-Type', 'application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`);
});

router.get('/feed.xml', async (req, res) => {
  const posts = await getAllPosts(50);
  const items = posts.map(p => `<item><title><![CDATA[${p.Entry_Title}]]></title><link>${SITE_URL}/${esc(p.Entry_Category)}/${esc(p._id)}</link><description><![CDATA[${(p.Entry_Resume||'').slice(0,300)}]]></description><pubDate>${new Date(p.createdAt).toUTCString()}</pubDate></item>`).join('\n');
  res.header('Content-Type', 'application/rss+xml').send(`<?xml version="1.0"?><rss version="2.0"><channel><title>Vox Diario</title><link>${SITE_URL}</link><description>Noticias de Neuquén y Patagonia</description>${items}</channel></rss>`);
});

export default router;