import Instagram from '../models/Instagram.model.js';
import mongoose from 'mongoose';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IG_USER_ID = process.env.IG_USER_ID || process.env.INSTAGRAM_USER_ID;
const IG_TOKEN = process.env.IG_ACCESS_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN;

// Config para guardar token refrescado
const ConfigSchema = new mongoose.Schema({ key: String, value: String }, { timestamps: true });
const Config = mongoose.models.Config || mongoose.model('Config', ConfigSchema);

// TUS FRAMES DE CLOUDINARY - poné las URL directas .png con fondo transparente
const FRAMES = {
  story: process.env.VOX_FRAME_STORY || 'https://res.cloudinary.com/dxxx/image/upload/v1/VOX_FRAME_1080x1920_STORY.png',
  feed: process.env.VOX_FRAME_FEED || 'https://res.cloudinary.com/dxxx/image/upload/v1/VOX_FRAME_1080x1080_FEED.png',
  feed_1350: process.env.VOX_FRAME_FEED_1350 || 'https://res.cloudinary.com/dxxx/image/upload/v1/VOX_FRAME_1080x1350_FEED.png',
};

async function getToken(){
  const cfg = await Config.findOne({ key: 'IG_ACCESS_TOKEN' });
  return cfg?.value || IG_TOKEN;
}

async function refreshTokenIfNeeded(){
  try{
    const token = await getToken();
    if(!token || !process.env.FB_APP_ID) return;
    const res = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FB_APP_ID}&client_secret=${process.env.FB_APP_SECRET}&fb_exchange_token=${token}`);
    const json = await res.json();
    if(json.access_token){
      await Config.findOneAndUpdate({ key: 'IG_ACCESS_TOKEN' }, { value: json.access_token }, { upsert: true });
      console.log('[IG] Token refrescado');
    }
  }catch(e){}
}

// Esta es la que te arregla el 36003 y le pega el frame
async function buildFramedImage(mediaUrl, frameType = 'feed_1350'){
  const frameUrl = FRAMES[frameType] || FRAMES.feed_1350;
  
  // 1. Descargar foto noticia + frame
  const [mediaRes, frameRes] = await Promise.all([fetch(mediaUrl), fetch(frameUrl)]);
  const mediaBuffer = Buffer.from(await mediaRes.arrayBuffer());
  const frameBuffer = Buffer.from(await frameRes.arrayBuffer());

  // 2. Definir tamaño final según frame
  let finalW = 1080, finalH = 1350;
  if(frameType === 'story') { finalW = 1080; finalH = 1920; }
  if(frameType === 'feed') { finalW = 1080; finalH = 1080; }

  // 3. Redimensionar la foto de la noticia para que entre dentro del frame
  // Dejamos un margen para que se vea el marco de Vox
  const safeMargin = 80;
  const contentW = finalW - safeMargin;
  const contentH = finalH - 300; // dejamos espacio para logo/titulo del frame

  const resizedContent = await sharp(mediaBuffer)
    .resize({ width: contentW, height: contentH, fit: 'cover', position: 'centre' })
    .toBuffer();

  // 4. Componer: primero el contenido, arriba el frame transparente
  const finalImage = await sharp({
    create: { width: finalW, height: finalH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  })
  .composite([
    { input: resizedContent, top: Math.round((finalH - contentH)/2 - 50), left: Math.round((finalW - contentW)/2) },
    { input: await sharp(frameBuffer).resize(finalW, finalH).toBuffer(), top: 0, left: 0 }
  ])
  .jpeg({ quality: 92 })
  .toBuffer();

  // 5. Guardar en /public/uploads para que IG lo pueda leer
  const fileName = `vox_${frameType}_${Date.now()}.jpg`;
  const outDir = path.join(process.cwd(), 'public', 'uploads');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, fileName), finalImage);

  const baseUrl = process.env.PUBLIC_URL || 'https://ultraserver.koyeb.app';
  return `${baseUrl}/uploads/${fileName}`;
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
  let status = 'mock', igMediaId = `mock_${Date.now()}`, permalink = 'https://instagram.com/mock', errorMsg = null;

  // Arregla aspect ratio + pega frame
  const finalUrl = await buildFramedImage(mediaUrl, type);
  console.log(`[IG] Publicando ${type} -> ${finalUrl}`);

  if(IG_USER_ID && token){
    try {
      const createRes = await fetch(`https://graph.facebook.com/v18.0/${IG_USER_ID}/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: finalUrl, caption, access_token: token })
      });
      const createJson = await createRes.json();
      if(!createJson.id) throw new Error(JSON.stringify(createJson));

      await new Promise(r => setTimeout(r, 2500)); // IG necesita 2 seg

      const pubRes = await fetch(`https://graph.facebook.com/v18.0/${IG_USER_ID}/media_publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creation_id: createJson.id, access_token: token })
      });
      const pubJson = await pubRes.json();
      if(!pubJson.id) throw new Error(JSON.stringify(pubJson));

      status = 'published'; 
      igMediaId = pubJson.id; 
      permalink = `https://www.instagram.com/p/${pubJson.id}/`;
    } catch(e){ 
      console.error('IG REAL ERROR:', e.message); 
      status = 'error'; 
      errorMsg = e.message;
    }
  }

  const doc = await Instagram.create({ mediaUrl: finalUrl, caption, type, entryRef, status, igMediaId, permalink, error: errorMsg });
  if(status === 'error') throw new Error(errorMsg);
  return { ok: true, data: doc, status };
};

export const forceRefresh = async () => {
  await refreshTokenIfNeeded();
  return { ok: true };
};