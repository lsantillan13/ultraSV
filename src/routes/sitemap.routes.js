import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

const SITE_URL = 'https://www.voxdiario.com';
const COLLECTION = 'posts';

function esc(str = '') {
  return String(str?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function safeCdata(str = '') {
  return String(str?? '').replace(/]]>/g, ']]]]><![CDATA[>');
}
const isCloudinary = (url = '') => /res\.cloudinary\.com/i.test(url) &&!String(url).startsWith('data:') && String(url).length < 1000;

// FIX: fecha sin milisegundos para Google
const cleanDate = (d) => {
  try {
    return new Date(d).toISOString().split('.')[0] + '+00:00';
  } catch { return new Date().toISOString().split('.')[0] + '+00:00'; }
};

async function getPosts(limit = 500, filter = {}) {
  if (mongoose.connection.readyState!== 1 ||!mongoose.connection.db) return [];
  try {
    const coll = mongoose.connection.db.collection(COLLECTION);
    return await coll.find(filter).sort({ createdAt: -1 }).limit(limit).toArray();
  } catch (e) {
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

const sitemapHandler = async (req, res) => {
  let posts = await getPosts(800, { Entry_Slug: { $exists: true, $ne: "" }, createdAt: { $exists: true } });
  // solo cloudinary válido
  posts = posts.filter(p => p.Entry_Featured_Image && isCloudinary(p.Entry_Featured_Image));
  posts = posts.slice(0, 500);

  const urls = posts.map(p => {
    const cat = esc(p.Entry_Category || 'noticia');
    const slug = esc(p.Entry_Slug);
    const lastmod = cleanDate(p.updatedAt || p.createdAt);
    // optimizamos imagen para sitemap
    const rawImg = p.Entry_Featured_Image.replace(/\/image\/upload\//, '/image/upload/f_auto,q_auto/');
    const img = `<image:image><image:loc>${esc(rawImg)}</image:loc></image:image>`;
    return ` <url><loc>${SITE_URL}/${cat}/${slug}</loc><lastmod>${lastmod}</lastmod>${img}</url>`;
  }).join('\n');

  res.header('Content-Type', 'application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.0">
  <url><loc>${SITE_URL}/</loc><changefreq>always</changefreq><priority>1.0</priority></url>
${urls}
</urlset>`);
};

const newsHandler = async (req, res) => {
  const since = new Date(Date.now() - 48 * 60 * 60 * 1000);
  let posts = await getPosts(1000, { createdAt: { $gte: since }, Entry_Slug: { $exists: true, $ne: "" } });
  posts = posts.filter(p => isCloudinary(p.Entry_Featured_Image || ''));

  const urls = posts.map(p => {
    const cat = esc(p.Entry_Category || 'noticia');
    const slug = esc(p.Entry_Slug);
    return ` <url><loc>${SITE_URL}/${cat}/${slug}</loc><news:news><news:publication><news:name>Vox Diario</news:name><news:language>es</news:language></news:publication><news:publication_date>${cleanDate(p.createdAt)}</news:publication_date><news:title><![CDATA[${safeCdata(p.Entry_Title)}]]></news:title></news:news></url>`;
  }).join('\n');

  res.header('Content-Type', 'application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`);
};

router.get(['/sitemap.xml', '/api/v2/sitemap.xml'], sitemapHandler);
router.get(['/sitemap-news.xml', '/api/v2/sitemap-news.xml'], newsHandler);

router.get(['/feed.xml', '/api/v2/feed.xml'], async (req, res) => {
  let posts = await getPosts(100, { Entry_Slug: { $exists: true, $ne: "" } });
  posts = posts.filter(p => isCloudinary(p.Entry_Featured_Image || ''));
  const items = posts.map(p => `<item><title><![CDATA[${safeCdata(p.Entry_Title)}]]></title><link>${SITE_URL}/${esc(p.Entry_Category)}/${esc(p.Entry_Slug)}</link><description><![CDATA[${safeCdata((p.Entry_Resume||'').slice(0,300))}]]></description><pubDate>${new Date(p.createdAt).toUTCString()}</pubDate></item>`).join('\n');
  res.header('Content-Type', 'application/rss+xml').send(`<?xml version="1.0"?><rss version="2.0"><channel><title>Vox Diario</title><link>${SITE_URL}</link><description>Noticias de Neuquén y Patagonia</description>${items}</channel></rss>`);
});

export default router;