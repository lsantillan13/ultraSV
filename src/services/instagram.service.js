// src/services/instagram.service.js - DEFINITIVO
import Instagram from '../models/Instagram.model.js';
import mongoose from 'mongoose';

const ConfigSchema = new mongoose.Schema({ key: String, value: String }, { timestamps: true });
const Config = mongoose.models.Config || mongoose.model('Config', ConfigSchema);

async function getToken(){
  const cfg = await Config.findOne({ key: 'IG_ACCESS_TOKEN' });
  return cfg?.value || process.env.IG_ACCESS_TOKEN;
}

export const listIG = async () => {
  const dbDocs = await Instagram.find({}).sort({ createdAt: -1 }).lean();
  
  try{
    const token = await getToken();
    const IG_USER_ID = process.env.IG_USER_ID;
    const r = await fetch(`https://graph.facebook.com/v18.0/${IG_USER_ID}/media?fields=id,caption,media_url,permalink,timestamp,media_type&limit=50&access_token=${token}`);
    const j = await r.json();
    
    if(j.data){
      // Transformo las 3 de IG a tu formato de DB para que el Ui.jsx las entienda
      const igAsDocs = j.data.map(m => ({
        _id: m.id, // uso el id de IG como _id para poder borrarlo
        mediaUrl: m.media_url,
        originalMediaUrl: m.media_url,
        caption: m.caption || '',
        type: 'feed_1350',
        status: 'published',
        igMediaId: m.id,
        permalink: m.permalink || `https://instagram.com/p/${m.id}`,
        createdAt: m.timestamp,
        updatedAt: m.timestamp,
        isRealIG: true
      }));
      
      // Merge sin duplicar
      const existingIds = new Set(dbDocs.map(d => d.igMediaId));
      const merged = [...dbDocs, ...igAsDocs.filter(x => !existingIds.has(x.igMediaId))];
      
      console.log(`[IG LIST BLINDADO] DB:${dbDocs.length} + IG:${igAsDocs.length} = ${merged.length}`);
      return merged;
    }
  }catch(e){ console.error('[IG LIST]', e.message); }
  
  return dbDocs;
};

export const getIG = async (id) => {
  if(mongoose.Types.ObjectId.isValid(id)){
    const doc = await Instagram.findById(id).lean();
    if(doc) return doc;
  }
  return { _id: id, igMediaId: id, status: 'published', isRealIG: true };
};

export const updateIG = async (id, body) => {
  if(!mongoose.Types.ObjectId.isValid(id)) throw new Error('No se puede editar una publi de IG directa, solo las de la DB');
  return await Instagram.findByIdAndUpdate(id, body, { new: true });
};

export const deleteIG = async (id) => {
  const token = await getToken();
  const targetId = mongoose.Types.ObjectId.isValid(id) 
    ? (await Instagram.findById(id))?.igMediaId || id 
    : id;

  console.log('[IG DELETE] Intentando borrar', targetId);

  if(targetId && !String(targetId).startsWith('error_')){
    try{
      const del = await fetch(`https://graph.facebook.com/v18.0/${targetId}?access_token=${token}`, { method: 'DELETE' });
      const j = await del.json();
      console.log('[IG DELETE RESP]', j);
      if(j.error) throw new Error(j.error.message);
    }catch(e){
      console.error('[IG DELETE ERROR]', e.message);
      throw new Error('No se pudo borrar de IG: ' + e.message);
    }
  }

  // borra de tu Mongo también
  if(mongoose.Types.ObjectId.isValid(id)){
    await Instagram.findByIdAndDelete(id);
  } else {
    await Instagram.deleteOne({ igMediaId: id });
  }
  return { _id: id, deleted: true };
};

export const publishIG = async (body) => {
  const token = await getToken();
  const IG_USER_ID = process.env.IG_USER_ID || process.env.INSTAGRAM_USER_ID;
  const CLOUD = 'ihytdbtw';

  const frames = {
    feed: process.env.VOX_FRAME_FEED,
    feed_1350: process.env.VOX_FRAME_FEED_1350,
    story: process.env.VOX_FRAME_STORY
  };
  const frameUrl = frames[body.type] || frames.feed_1350;

  // BASE64 del frame, sin encode del original (así lo quiere Cloudinary)
  const b64 = (u) => Buffer.from(u).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  let w=1080,h=1350;
  if(body.type === 'feed'){ w=1080; h=1080; }
  if(body.type === 'story'){ w=1080; h=1920; }

  const framedUrl = `https://res.cloudinary.com/${CLOUD}/image/fetch/c_fill,w_${w},h_${h},g_auto/l_fetch:${b64(frameUrl)},w_${w},h_${h},c_fill/fl_layer_apply/${body.mediaUrl}`;

  console.log('[IG PUBLISH URL]', framedUrl);

  // 1. Crear container
  const fd = new URLSearchParams({ image_url: framedUrl, caption: body.caption || '', access_token: token });
  const cRes = await fetch(`https://graph.facebook.com/v18.0/${IG_USER_ID}/media`, { method: 'POST', body: fd });
  const cJson = await cRes.json();
  console.log('[IG CONTAINER RESP]', cJson);
  if(cJson.error) throw new Error(cJson.error.message + ' | URL: ' + framedUrl);

  await new Promise(r => setTimeout(r, 4000));

  // 2. Publicar
  const pFd = new URLSearchParams({ creation_id: cJson.id, access_token: token });
  const pRes = await fetch(`https://graph.facebook.com/v18.0/${IG_USER_ID}/media_publish`, { method: 'POST', body: pFd });
  const pJson = await pRes.json();
  console.log('[IG PUBLISH RESP]', pJson);
  if(pJson.error) throw new Error(pJson.error.message);

  const doc = await Instagram.create({
    mediaUrl: framedUrl,
    originalMediaUrl: body.mediaUrl,
    caption: body.caption,
    type: body.type,
    status: 'published',
    igMediaId: pJson.id,
    entryRef: body.entryRef || null
  });
  return { ok: true, data: doc };
};