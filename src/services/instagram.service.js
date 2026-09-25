import Instagram from '../models/Instagram.model.js';
import mongoose from 'mongoose';

const IG_USER_ID = process.env.IG_USER_ID;
const CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'ihytdbtw';

const ConfigSchema = new mongoose.Schema({ key: String, value: String }, { timestamps: true });
const Config = mongoose.models.Config || mongoose.model('Config', ConfigSchema);

async function getToken(){
  const cfg = await Config.findOne({ key: 'IG_ACCESS_TOKEN' });
  return cfg?.value || process.env.IG_ACCESS_TOKEN;
}

function toB64(url){
  return Buffer.from(url).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}

function buildFramedImageUrl(mediaUrl, frameType = 'feed_1350'){
  let W=1080, H=1350;
  let frameUrl = process.env.VOX_FRAME_FEED_1350 || process.env.VOX_FRAME_1080x1350_FEED;

  if(frameType==='feed'){
    W=1080; H=1080;
    frameUrl = process.env.VOX_FRAME_FEED || process.env.VOX_FRAME_1080x1080_FEED;
  }
  if(frameType==='story'){
    W=1080; H=1920;
    frameUrl = process.env.VOX_FRAME_STORY || process.env.VOX_FRAME_1080x1920_STORY;
  }

  if(!frameUrl){
    frameUrl = `https://res.cloudinary.com/${CLOUD}/image/upload/VOX_FRAME_1080x${frameType==='feed'?'1080': frameType==='story'?'1920_STORY':'1350'}_FEED.png`;
  }

  const b64Frame = toB64(frameUrl);
  const encodedMedia = encodeURIComponent(mediaUrl);
  return `https://res.cloudinary.com/${CLOUD}/image/fetch/c_fill,w_${W},h_${H},g_auto,q_auto:good,f_jpg/l_fetch:${b64Frame},w_${W},h_${H},c_fill,g_center/fl_layer_apply,q_auto:good,f_jpg/${encodedMedia}`;
}

// --- ESTOS TE FALTABAN ---

export const listIG = async () => {
  return await Instagram.find().sort({ createdAt: -1 }).limit(50).lean();
};

export const getIG = async (id) => {
  if(!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID invalido');
  const doc = await Instagram.findById(id).lean();
  if(!doc) throw new Error('No encontrado');
  return doc;
};

export const updateIG = async (id, body) => {
  if(!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID invalido');
  
  // Si cambian la imagen, regenera el frame
  if(body.mediaUrl || body.originalMediaUrl){
    const media = body.originalMediaUrl || body.mediaUrl;
    const type = body.type || 'feed_1350';
    body.mediaUrl = buildFramedImageUrl(media, type);
    body.originalMediaUrl = media;
  }

  const updated = await Instagram.findByIdAndUpdate(id, body, { new: true });
  if(!updated) throw new Error('No encontrado para editar');
  return updated;
};

export const deleteIG = async (id) => {
  if(!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID invalido');
  const doc = await Instagram.findById(id);
  if(!doc) throw new Error('No encontrado');
  
  const token = await getToken();
  // Si ya estaba publicado en IG, intenta borrarlo de IG también
  if(doc.status==='published' && doc.igMediaId && !doc.igMediaId.startsWith('error_')){
    try{
      await fetch(`https://graph.facebook.com/v18.0/${doc.igMediaId}?access_token=${token}`, { method:'DELETE' });
    }catch(e){
      console.log('[IG] No se pudo borrar de IG:', e.message);
    }
  }
  await Instagram.findByIdAndDelete(id);
  return doc;
};

export const publishIG = async ({ mediaUrl, caption, type = 'feed_1350', entryRef }) => {
  const token = await getToken();
  if(!IG_USER_ID || !token) throw new Error('Falta IG_USER_ID o IG_ACCESS_TOKEN');

  const finalUrl = buildFramedImageUrl(mediaUrl, type);
  console.log('[IG] FINAL URL:', finalUrl);

  let status='error', igMediaId=`error_${Date.now()}`, permalink='', errorMsg=null;

  try{
    const createRes = await fetch(`https://graph.facebook.com/v18.0/${IG_USER_ID}/media`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ image_url: finalUrl, caption, access_token: token })
    });
    const createJson = await createRes.json();
    console.log('[IG] CREATE:', createJson);
    if(!createJson.id) throw new Error(`CREATE FAIL: ${JSON.stringify(createJson)}`);

    await new Promise(r=>setTimeout(r, 5000));

    const pubRes = await fetch(`https://graph.facebook.com/v18.0/${IG_USER_ID}/media_publish`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ creation_id: createJson.id, access_token: token })
    });
    const pubJson = await pubRes.json();
    console.log('[IG] PUBLISH:', pubJson);
    if(!pubJson.id) throw new Error(`PUBLISH FAIL: ${JSON.stringify(pubJson)}`);

    status='published'; igMediaId=pubJson.id; permalink=`https://www.instagram.com/p/${pubJson.id}/`;
  }catch(e){
    errorMsg=e.message; console.error('[IG] ERROR:', errorMsg);
  }

  const doc = await Instagram.create({ mediaUrl: finalUrl, originalMediaUrl: mediaUrl, caption, type, entryRef, status, igMediaId, permalink, error: errorMsg });
  if(status==='error') throw new Error(errorMsg);
  return { ok:true, data: doc, finalUrl };
};