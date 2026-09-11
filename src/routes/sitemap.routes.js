import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

const SITE_URL = 'https://www.voxdiario.com';
const COLLECTION = 'posts'; // <-- CONFIRMADO por tu debug: 3137 docs

function esc(str = '') {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function getPosts(limit = 1000, filter = {}) {
  if (mongoose.connection.readyState!== 1 ||!mongoose.connection.db) return [];
  try {
    const coll = mongoose.connection.db.collection(COLLECTION);
    return await coll.find(filter).sort({ createdAt: -1 }).limit(limit).toArray();
  } catch(e) {
    console.error('[Sitemap] getPosts error', e.message);
    return [];
  }
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
  const posts = await getPosts(1000);
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
  let posts = await getPosts(500, { createdAt: { $gte: since } });
  if (!posts.length) posts = await getPosts(50);
  const urls = posts.map(p => ` <url><loc>${SITE_URL}/${esc(p.Entry_Category)}/${esc(p._id)}</loc><news:news><news:publication><news:name>Vox Diario</news:name><news:language>es</news:language></news:publication><news:publication_date>${new Date(p.createdAt).toISOString()}</news:publication_date><news:title><![CDATA[${p.Entry_Title}]]></news:title></news:news></url>`).join('\n');
  res.header('Content-Type', 'application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`);
});

router.get('/feed.xml', async (req, res) => {
  const posts = await getPosts(50);
  const items = posts.map(p => `<item><title><![CDATA[${p.Entry_Title}]]></title><link>${SITE_URL}/${esc(p.Entry_Category)}/${esc(p._id)}</link><description><![CDATA[${(p.Entry_Resume||'').slice(0,300)}]]></description><pubDate>${new Date(p.createdAt).toUTCString()}</pubDate></item>`).join('\n');
  res.header('Content-Type', 'application/rss+xml').send(`<?xml version="1.0"?><rss version="2.0"><channel><title>Vox Diario</title><link>${SITE_URL}</link><description>Noticias de Neuquén y Patagonia</description>${items}</channel></rss>`);
});

export default router;