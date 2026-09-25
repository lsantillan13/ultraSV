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
  
  // Si me pasás un ID de IG (como 18081176357709020) lo borro directo de IG
  const igId = mongoose.Types.ObjectId.isValid(id) ? null : id;
  const targetId = igId || (await Instagram.findById(id))?.igMediaId;

  if(targetId){
    const del = await fetch(`https://graph.facebook.com/v18.0/${targetId}?access_token=${token}`, { method: 'DELETE' });
    const j = await del.json().catch(()=>({}));
    console.log('[IG DELETE]', targetId, j);
  }
  
  if(mongoose.Types.ObjectId.isValid(id)){
    await Instagram.findByIdAndDelete(id);
  } else {
    await Instagram.deleteOne({ igMediaId: id });
  }
  
  return { _id: id, deleted: true };
};

export const publishIG = async (body) => {
  // tu publish normal
  const doc = await Instagram.create({ ...body, originalMediaUrl: body.mediaUrl, status: 'published', igMediaId: `manual_${Date.now()}` });
  return { ok: true, data: doc };
};