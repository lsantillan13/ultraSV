import InstagramPost from '../models/Instagram.model.js';
import { publishToIG } from '../services/instagram.service.js';

export const publishController = async (req, res) => {
  console.log('[IG Controller] Body:', req.body);
  
  const mediaUrl = req.body.mediaUrl || req.body.imageUrl || req.body.url;
  const caption = req.body.caption;
  const type = req.body.type || 'solo_ig';
  const entryRef = req.body.entryRef || null;

  if (!mediaUrl || !caption) {
    return res.status(400).json({ 
      error: 'Falta mediaUrl o caption',
      recibido: req.body 
    });
  }

  try {
    const igResult = await publishToIG({ mediaUrl, caption });

    const post = await InstagramPost.create({
      mediaUrl,
      caption,
      type,
      entryRef,
      status: igResult.mock ? 'mock' : 'published',
      igMediaId: igResult.id,
      permalink: igResult.permalink || ''
    });

    return res.json({ ok: true, post });

  } catch (e) {
    console.error('[IG Controller] Error:', e.response?.data || e.message);
    
    await InstagramPost.create({
      mediaUrl, caption, type, entryRef,
      status: 'failed',
      error: JSON.stringify(e.response?.data || e.message)
    });

    return res.status(500).json({ ok: false, error: e.response?.data || e.message });
  }
};

export const listController = async (req, res) => {
  const posts = await InstagramPost.find().sort({ createdAt: -1 }).limit(30);
  res.json(posts);
};