import Instagram from '../models/Instagram.model.js';
import mongoose from 'mongoose';

const IG_USER_ID = process.env.IG_USER_ID;
const CLOUD = process.env.CLOUDINARY_CLOUD_NAME || 'ihytdbtw';

const ConfigSchema = new mongoose.Schema({ key: String, value: String }, { timestamps: true });
const Config = mongoose.models.Config || mongoose.model('Config', ConfigSchema);

const FRAMES = {
  feed_1350: 'VOX_FRAME_1080x1350_FEED',
  feed: 'VOX_FRAME_1080x1080_FEED',
  story: 'VOX_FRAME_1080x1920_STORY',
};

async function getToken(){
  const cfg = await Config.findOne({ key: 'IG_ACCESS_TOKEN' });
  return cfg?.value || process.env.IG_ACCESS_TOKEN;
}

function buildFramedImageUrl(mediaUrl, frameType = 'feed_1350'){
  const frameId = FRAMES[frameType] || FRAMES.feed_1350;
  let W=1080, H=1350;
  if(frameType==='feed'){ W=1080; H=1080; }
  if(frameType==='story'){ W=1080; H=1920; }

  // URL CORRECTA PARA TU CLOUD ihytdbtw - probala en el navegador
  const encoded = encodeURIComponent(mediaUrl);
  // fetch de la foto de la nota + overlay del frame PNG
  return `https://res.cloudinary.com/${CLOUD}/image/fetch/c_fill,w_${W},h_${H},g_auto,q_auto:good,f_jpg/l_${frameId},w_${W},h_${H},c_fill,g_center/fl_layer_apply,q_auto:good,f_jpg/${encoded}`;
}

export const listIG = () => Instagram.find().sort({ createdAt: -1 }).limit(50);
export const deleteIG = (id) => Instagram.findByIdAndDelete(id);

export const publishIG = async ({ mediaUrl, caption, type = 'feed_1350', entryRef }) => {
  const token = await getToken();
  if(!IG_USER_ID ||!token) throw new Error('Falta IG_USER_ID o TOKEN en Koyeb');

  const finalUrl = buildFramedImageUrl(mediaUrl, type);
  console.log('[IG] FINAL URL:', finalUrl);

  // Testea que Cloudinary si devuelva imagen
  try{
    const test = await fetch(finalUrl, { method: 'HEAD' });
    console.log('[IG] Cloudinary status:', test.status, test.headers.get('content-type'));
    if(!test.ok) throw new Error(`Cloudinary no devolvió imagen: ${test.status}`);
  }catch(e){
    console.error('[IG] Error probando Cloudinary:', e.message);
  }

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

    // IG necesita 4 segundos para bajar la imagen de Cloudinary
    await new Promise(r=>setTimeout(r, 4000));

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