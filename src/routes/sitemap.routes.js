import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const SITE_URL = 'https://voxdiario.com'; // CANONICA SIN WWW
const COLLECTION = 'posts';

function esc(str = '') {
  return String(str?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').trim();
}
function safeCdata(str = '') {
  return String(str?? '').replace(/]]>/g, ']]]]><![CDATA[>');
}
const isCloudinary = (url = '') => /res\.cloudinary\.com/i.test(url) &&!String(url).startsWith('data:') && String(url).length < 2000;
const cleanDate = (d) => {
  try { return new Date(d).toISOString(); }
  catch { return new Date().toISOString(); }
};

async function getPosts(limit = 5000, filter = {}) {
  if (mongoose.connection.readyState!== 1 ||!mongoose.connection.db) return [];
  try {
    const coll = mongoose.connection.db.collection(COLLECTION);
    return await coll.find(filter).sort({ createdAt: -1 }).limit(limit).toArray();
  } catch (e) {
    console.error('[Sitemap] getPosts error', e.message);
    return [];
  }
}

// robots.txt -> apunta al index ahora
router.get('/robots.txt', (req, res) => {
  res.set('Cache-Control', 'public, max-age=86400');
  res.type('text/plain').send(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /api/auth/
Disallow: /RadioAdmin/

Sitemap: ${SITE_URL}/sitemap-index.xml`);
});

// SITEMAP PRINCIPAL - ultimas 5000
const sitemapHandler = async (req, res) => {
  let posts = await getPosts(5000, { Entry_Slug: { $exists: true, $ne: "", $type: "string" }, createdAt: { $exists: true } });
  posts = posts.filter(p => p.Entry_Slug &&!p.Entry_Slug.includes(' ') && p.Entry_Slug.length > 2);

  const urls = posts.map(p => {
    const cat = esc((p.Entry_Category || 'noticia').toLowerCase());
    const slug = esc(p.Entry_Slug);
    const lastmod = cleanDate(p.updatedAt || p.createdAt);
    const img = isCloudinary(p.Entry_Featured_Image)
     ? `\n <image:image><image:loc>${esc(p.Entry_Featured_Image)}</image:loc><image:title><![CDATA[${safeCdata(p.Entry_Title)}]]></image:title></image:image>`
      : '';
    return ` <url><loc>${SITE_URL}/${cat}/${slug}</loc><lastmod>${lastmod}</lastmod><changefreq>daily</changefreq><priority>0.8</priority>${img}</url>`;
  }).join('\n');

  res.set('Cache-Control', 'public, max-age=3600');
  res.header('Content-Type', 'application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${SITE_URL}/</loc><lastmod>${cleanDate(new Date())}</lastmod><changefreq>always</changefreq><priority>1.0</priority></url>
${urls}
</urlset>`);
};

// GOOGLE NEWS - ultimas 48hs
const newsHandler = async (req, res) => {
  const since = new Date(Date.now() - 48 * 60 * 60 * 1000);
  let posts = await getPosts(1000, { createdAt: { $gte: since }, Entry_Slug: { $exists: true, $ne: "" } });
  posts = posts.filter(p => p.Entry_Title && p.Entry_Title.length > 10);

  const urls = posts.map(p => {
    const cat = esc((p.Entry_Category || 'noticia').toLowerCase());
    const slug = esc(p.Entry_Slug);
    return ` <url><loc>${SITE_URL}/${cat}/${slug}</loc><news:news><news:publication><news:name>Vox Diario</news:name><news:language>es</news:language></news:publication><news:publication_date>${cleanDate(p.createdAt)}</news:publication_date><news:title><![CDATA[${safeCdata(p.Entry_Title)}]]></news:title></news:news></url>`;
  }).join('\n');

  res.set('Cache-Control', 'public, max-age=300');
  res.header('Content-Type', 'application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`);
};

// ARCHIVE - viejas
const archiveHandler = async (req, res) => {
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
  let posts = await getPosts(50000, { createdAt: { $lt: cutoff }, Entry_Slug: { $exists: true, $ne: "" } });
  posts = posts.filter(p => p.Entry_Slug && p.Entry_Slug.length > 2);

  const urls = posts.map(p => {
    const cat = esc((p.Entry_Category || 'noticia').toLowerCase());
    const slug = esc(p.Entry_Slug);
    const lastmod = cleanDate(p.updatedAt || p.createdAt);
    return ` <url><loc>${SITE_URL}/${cat}/${slug}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>`;
  }).join('\n');

  res.set('Cache-Control', 'public, max-age=86400');
  res.header('Content-Type', 'application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`);
};

// SITEMAP INDEX - solo los que existen
const sitemapIndexHandler = (req, res) => {
  const lastmod = cleanDate(new Date());
  res.set('Cache-Control', 'public, max-age=3600');
  res.header('Content-Type', 'application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE_URL}/sitemap.xml</loc><lastmod>${lastmod}</lastmod></sitemap>
  <sitemap><loc>${SITE_URL}/sitemap-news.xml</loc><lastmod>${lastmod}</lastmod></sitemap>
  <sitemap><loc>${SITE_URL}/sitemap-archive.xml</loc><lastmod>${lastmod}</lastmod></sitemap>
</sitemapindex>`);
};

router.get(['/sitemap.xml', '/api/v2/sitemap.xml'], sitemapHandler);
router.get(['/sitemap-news.xml', '/api/v2/sitemap-news.xml'], newsHandler);
router.get(['/sitemap-archive.xml', '/api/v2/sitemap-archive.xml'], archiveHandler);
router.get(['/sitemap-index.xml', '/api/v2/sitemap-index.xml'], sitemapIndexHandler);

export default router;