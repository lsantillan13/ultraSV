import Instagram from '../models/Instagram.model.js';
import fetch from 'node-fetch';

const IG_USER_ID = process.env.INSTAGRAM_USER_ID;
const IG_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

export const listIG = () => Instagram.find().sort({ createdAt: -1 }).limit(50);
export const getIG = (id) => Instagram.findById(id);
export const deleteIG = async (id) => {
  const doc = await Instagram.findById(id);
  if(!doc) throw new Error('No encontrado');
  // Si querés borrar también de IG real, descomentá esto (necesita permiso):
  // if(doc.igMediaId && IG_TOKEN) await fetch(`https://graph.facebook.com/v18.0/${doc.igMediaId}?access_token=${IG_TOKEN}`, { method: 'DELETE' });
  await Instagram.findByIdAndDelete(id);
  return doc;
};
export const updateIG = (id, data) => Instagram.findByIdAndUpdate(id, data, { new: true });

export const publishIG = async ({ mediaUrl, caption, type, entryRef }) => {
  let status = 'mock', igMediaId = `mock_${Date.now()}`, permalink = 'https://instagram.com/mock';

  if(IG_USER_ID && IG_TOKEN){
    try {
      // 1. Crear contenedor
      const createRes = await fetch(`https://graph.facebook.com/v18.0/${IG_USER_ID}/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: mediaUrl, caption, access_token: IG_TOKEN })
      });
      const createJson = await createRes.json();
      if(!createJson.id) throw new Error(JSON.stringify(createJson));

      // 2. Publicar
      const pubRes = await fetch(`https://graph.facebook.com/v18.0/${IG_USER_ID}/media_publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creation_id: createJson.id, access_token: IG_TOKEN })
      });
      const pubJson = await pubRes.json();
      if(!pubJson.id) throw new Error(JSON.stringify(pubJson));

      status = 'published';
      igMediaId = pubJson.id;
      permalink = `https://instagram.com/p/${pubJson.id}`; // IG devuelve el permalink en otro call, este es placeholder
    } catch(e){
      status = 'error';
      console.error('IG REAL ERROR:', e.message);
      // No tiramos error, lo guardamos como mock con error para que veas el log
      igMediaId = `error_${Date.now()}`;
    }
  }

  const doc = await Instagram.create({ mediaUrl, caption, type, entryRef, status, igMediaId, permalink });
  return { ok: true, data: doc, status };
};