const INDEXNOW_KEY = 'f7a9c2e1b4d60f8a3c9e2b5d1f8a7c6e';
const SITE_URL = 'https://voxdiario.com';

export async function submitIndexNow(urls = []) {
  if (!urls.length) return;
  // no bloquea la respuesta del post
  try {
    await fetch('https://api.indexnow.org/indexnow.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'voxdiario.com',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls
      })
    });
    console.log('[IndexNow] OK', urls[0]);
  } catch (e) {
    console.error('[IndexNow] fail', e.message);
  }
}