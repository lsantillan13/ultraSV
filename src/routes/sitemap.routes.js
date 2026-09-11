import express from 'express';
const router = express.Router();

const SITE_URL = 'https://www.voxdiario.com'; // SIN .ar

function escapeXml(str = '') {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}
function escapeCdata(str = '') {
  return String(str).replace(/]]>/g, ']]]]><![CDATA[>');
}

async function getPosts(limit = 1000, filter = {}) {
  const paths = ['../models/Post.js','../models/post.js','../models/Posts.js','../models/Entry.js','../models/post.model.js'];
  for (const p of paths) {
    try {
      const mod = await import(p);
      const Model = mod.default || mod;
      if (Model?.find) return await Model.find(filter).sort({ createdAt: -1 }).limit(limit).lean();
    } catch {}
  }
  return [];
}

router.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /api/auth/
Disallow: /api/users/

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-news.xml

User-agent: Googlebot-News
Allow: /

User-agent: Googlebot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /`);
});

router.get('/sitemap.xml', async (req, res) => {
  const posts = await getPosts(1000);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.0">
  <url><loc>${SITE_URL}/</loc><changefreq>always</changefreq><priority>1.0</priority></url>
${posts.map(p => `  <url><loc>${SITE_URL}/${escapeXml(p.Entry_Category||'noticia')}/${escapeXml(p._id)}</loc><lastmod>${new Date(p.updatedAt||p.createdAt||Date.now()).toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.9</priority>${p.Entry_Featured_Image?`<image:image><image:loc>${escapeXml(p.Entry_Featured_Image)}</image:loc></image:image>`:''}</url>`).join('\n')}
</urlset>`;
  res.header('Content-Type','application/xml').send(xml);
});

router.get('/sitemap-news.xml', async (req, res) => {
  const since = new Date(Date.now() - 48*60*60*1000);
  const posts = await getPosts(200, { createdAt: { $gte: since } });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${posts.map(p => `  <url><loc>${SITE_URL}/${escapeXml(p.Entry_Category||'noticia')}/${escapeXml(p._id)}</loc><news:news><news:publication><news:name>Vox Diario</news:name><news:language>es</news:language></news:publication><news:publication_date>${new Date(p.createdAt||Date.now()).toISOString()}</news:publication_date><news:title><![CDATA[${escapeCdata(p.Entry_Title||'Nota')}]]></news:title></news:news></url>`).join('\n')}
</urlset>`;
  res.header('Content-Type','application/xml').send(xml);
});

router.get('/feed.xml', async (req, res) => {
  const posts = await getPosts(50);
  const xml = `<?xml version="1.0"?><rss version="2.0"><channel><title>Vox Diario</title><link>${SITE_URL}</link><description>Noticias de Neuquén y Patagonia</description>${posts.map(p=>`<item><title><![CDATA[${escapeCdata(p.Entry_Title)}]]></title><link>${SITE_URL}/${escapeXml(p.Entry_Category)}/${escapeXml(p._id)}</link></item>`).join('')}</channel></rss>`;
  res.header('Content-Type','application/rss+xml').send(xml);
});

export default router;