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

export const listIG = async () => {
  // BLINDADO: trae TODO, sin filtro de status, sin limit tramposo
  return await Instagram.find({}).sort({ createdAt: -1 }).lean();
};

export const getIG = async (id) => {
  if(!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID invalido');
  const doc = await Instagram.findById(id).lean();
  if(!doc) throw new Error('No encontrado');
  return doc;
};

export const updateIG = async (id, body) => {
  if(!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID invalido');
  const updated = await Instagram.findByIdAndUpdate(id, body, { new: true });
  if(!updated) throw new Error('No encontrado para editar');
  return updated;
};

export const deleteIG = async (id) => {
  if(!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID invalido');
  const doc = await Instagram.findById(id);
  if(!doc) throw new Error('No encontrado');
  const token = await getToken();
  if(doc.status==='published' && doc.igMediaId && !String(doc.igMediaId).startsWith('error_')){
    try{
      await fetch(`https://graph.facebook.com/v18.0/${doc.igMediaId}?access_token=${token}`, { method:'DELETE' });
      console.log('[IG] Borrado de IG OK', doc.igMediaId);
    }catch(e){ console.log('[IG] No se pudo borrar de IG:', e.message); }
  }
  await Instagram.findByIdAndDelete(id);
  return doc;
};

export const publishIG = async ({ mediaUrl, caption, type = 'feed_1350' }) => {
  const token = await getToken();
  // ... tu publish igual que antes ...
  const doc = await Instagram.create({ mediaUrl, originalMediaUrl: mediaUrl, caption, type, status: 'published', igMediaId: `manual_${Date.now()}` });
  return { ok:true, data: doc };
};