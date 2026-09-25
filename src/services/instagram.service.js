import axios from 'axios';

const IG_USER_ID = process.env.INSTAGRAM_USER_ID;
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const GRAPH_URL = 'https://graph.facebook.com/v21.0';

export async function publishToIG({ mediaUrl, caption }) {
  // Si no tenes .env, devuelve mock para que no te frene el dev
  if (!IG_USER_ID || !ACCESS_TOKEN) {
    console.log('[IG Service] MODO MOCK - faltan env vars');
    return {
      mock: true,
      id: 'mock_' + Date.now(),
      permalink: 'https://instagram.com/mock'
    };
  }

  // 1. Crear contenedor
  const containerRes = await axios.post(`${GRAPH_URL}/${IG_USER_ID}/media`, {
    image_url: mediaUrl,
    caption: caption,
    access_token: ACCESS_TOKEN
  });

  const creationId = containerRes.data.id;
  console.log('[IG] Contenedor creado:', creationId);

  // Esperar que IG procese la imagen (2 seg)
  await new Promise(r => setTimeout(r, 2000));

  // 2. Publicar contenedor
  const publishRes = await axios.post(`${GRAPH_URL}/${IG_USER_ID}/media_publish`, {
    creation_id: creationId,
    access_token: ACCESS_TOKEN
  });

  return {
    mock: false,
    id: publishRes.data.id,
    permalink: null
  };
}