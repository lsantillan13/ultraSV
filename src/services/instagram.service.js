import Instagram from '../models/Instagram.model.js';
import mongoose from 'mongoose';

const IG_USER_ID = process.env.IG_USER_ID || process.env.INSTAGRAM_USER_ID;
const CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'ihytdbtw';

// Config para guardar token refrescado y no perderlo en cada deploy
const ConfigSchema = new mongoose.Schema({ key: String, value: String }, { timestamps: true });
const Config = mongoose.models.Config || mongoose.model('Config', ConfigSchema);

const FRAMES = {
  story: 'VOX_FRAME_1080x1920_STORY',
  feed: 'VOX_FRAME_1080x1080_FEED',
  feed_1350: 'VOX_FRAME_1080x1350_FEED',
};

async function getToken(){
  const cfg = await Config.findOne({ key: 'IG_ACCESS_TOKEN' });
  return cfg?.value || process.env.IG_ACCESS_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN;
}

async function refreshTokenIfNeeded(){
  try{
    const token = await getToken();
    if(!token ||!process.env.FB_APP_ID) return;
    const res = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FB_APP_ID}&client_secret=${process.env.FB_APP_SECRET}&fb_exchange_token=${token}`);
    const json = await res.json();
    if(json.access_token){
      await Config.findOneAndUpdate({ key: 'IG_ACCESS_TOKEN' }, { value: json.access_token }, { upsert: true });
      console.log('[IG] Token refrescado');
    }
  }catch(e){ console.log('[IG] No se pudo refrescar token', e.message); }
}

function buildFramedImageUrl(mediaUrl, frameType = 'feed_1350'){
  const frameId = FRAMES[frameType] || FRAMES.feed_1350;
  let finalW = 1080, finalH = 1350;
  if(frameType === 'story') { finalW = 1080; finalH = 1920; }
  if(frameType === 'feed') { finalW = 1080; finalH = 1080; }

  // Esta URL arregla el 36003 y le pega el frame en un solo paso
  const encodedMedia = encodeURIComponent(mediaUrl);
  return `https://res.cloudinary.com/${CLOUD}/image/fetch/w_${finalW},h_${finalH},c_fill,g_auto,q_auto:good,f_jpg/l_${frameId},w_${finalW},h_${finalH},c_fill/fl_layer_apply,q_auto:good,f_jpg/${encodedMedia}`;
}

export const listIG = () => Instagram.find().sort({ createdAt: -1 }).limit(50);
export const getIG = (id) => Instagram.findById(id);
export const deleteIG = async (id) => {
  const doc = await Instagram.findById(id);
  if(!doc) throw new Error('No encontrado');
  await Instagram.findByIdAndDelete(id);
  return doc;
};
export const updateIG = (id, data) => Instagram.findByIdAndUpdate(id, data, { new: true });

export const publishIG = async ({ mediaUrl, caption, type = 'feed_1350', entryRef }) => {
  await refreshTokenIfNeeded();
  const token = await getToken();

  if(!IG_USER_ID ||!token) throw new Error('Falta IG_USER_ID o IG_ACCESS_TOKEN en Koyeb');
  if(!mediaUrl) throw new Error('Falta mediaUrl');

  const finalUrl = buildFramedImageUrl(mediaUrl, type);
  console.log(`[IG] Publicando ${type} -> ${finalUrl}`);

  let status = 'error', igMediaId = `error_${Date.now()}`, permalink = '', errorMsg = null;

  try {
    // 1. Crear container
    const createRes = await fetch(`https://graph.facebook.com/v18.0/${IG_USER_ID}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: finalUrl, caption, access_token: token })
    });
    const createJson = await createRes.json();
    console.log('[IG] CREATE RES:', createJson);
    if(!createJson.id) throw new Error(JSON.stringify(createJson));

    // IG tarda 2-3 seg en procesar el fetch de Cloudinary
    await new Promise(r => setTimeout(r, 3000));

    // 2. Publicar
    const pubRes = await fetch(`https://graph.facebook.com/v18.0/${IG_USER_ID}/media_publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creation_id: createJson.id, access_token: token })
    });
    const pubJson = await pubRes.json();
    console.log('[IG] PUBLISH RES:', pubJson);
    if(!pubJson.id) throw new Error(JSON.stringify(pubJson));

    status = 'published';
    igMediaId = pubJson.id;
    permalink = `https://www.instagram.com/p/${pubJson.id}/`;

  } catch(e){
    console.error('IG REAL ERROR:', e.message);
    errorMsg = e.message;
    status = 'error';
  }

  const doc = await Instagram.create({
    mediaUrl: finalUrl,
    originalMediaUrl: mediaUrl,
    caption,
    type,
    entryRef,
    status,
    igMediaId,
    permalink,
    error: errorMsg
  });

  if(status === 'error') throw new Error(errorMsg);
  return { ok: true, data: doc, status };
};

export const forceRefresh = async () => {
  await refreshTokenIfNeeded();
  return { ok: true, token: await getToken() };
};