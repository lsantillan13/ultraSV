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
  try {
    const CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'dq...'; // poné tu cloud name
    // Public IDs de tus frames tal cual los tenés en cloudinary (sin.png)
    const FRAME_IDS = {
      story: 'VOX_FRAME_1080x1920_STORY',
      feed: 'VOX_FRAME_1080x1080_FEED',
      feed_1350: 'VOX_FRAME_1080x1350_FEED',
    };

    const frameId = FRAME_IDS[frameType] || FRAME_IDS.feed_1350;

    let finalW = 1080, finalH = 1350;
    if(frameType === 'story') { finalW = 1080; finalH = 1920; }
    if(frameType === 'feed') { finalW = 1080; finalH = 1080; }

    // Transformación Cloudinary:
    // 1. hace fetch de tu foto de la noticia y la recorta a 1080x1350
    // 2. le pone encima tu frame PNG transparente
    const encodedMedia = encodeURIComponent(mediaUrl);
    const cloudinaryUrl = `https://res.cloudinary.com/${CLOUD}/image/fetch/w_${finalW},h_${finalH},c_fill,g_auto,q_auto:good/l_${frameId},w_${finalW},h_${finalH},c_fill,g_center/fl_layer_apply,fl_relative/q_auto:good,f_jpg/${encodedMedia}`;

    console.log(`[IG] URL con frame Cloudinary: ${cloudinaryUrl}`);
    return cloudinaryUrl;

  } catch(e) {
    console.log('[IG] Error armando frame, uso resize simple', e.message);
    // Fallback que SIEMPRE funciona y arregla tu error 36003
    const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
    const encodedMedia = encodeURIComponent(mediaUrl);
    return `https://res.cloudinary.com/${CLOUD}/image/fetch/w_1080,h_1350,c_fill,g_auto,q_auto:good,f_jpg/${encodedMedia}`;
  }
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