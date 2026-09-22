import cron from 'node-cron';

const SITE_URL = 'https://voxdiario.com';

async function pingBing() {
  const sitemapUrl = `${SITE_URL}/sitemap-index.xml`;
  try {
    // Solo Bing sirve, Google ya no
    await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    console.log('[Sitemap] Ping Bing OK', new Date().toISOString());
  } catch (e) {
    console.error('[Sitemap] Ping error', e.message);
  }
}

// Cada 6 horas
export function startSitemapPingCron() {
  cron.schedule('0 */6 * * *', pingBing);
  console.log('[Cron] Sitemap ping cada 6hs activo');
}