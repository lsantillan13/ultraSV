import { Router } from 'express';
import mongoose from 'mongoose';
import { generateTTS } from '../../services/tts.service.js';

const router = Router();
const getPostModel = () => mongoose.models.Post || mongoose.model('Post');

// GET /api/v2/tts/:slug - obtiene texto limpio + audio (sirve ID o SLUG)
router.get('/:slug', async (req, res) => {
  try {
    const Post = getPostModel();
    const q = mongoose.Types.ObjectId.isValid(req.params.slug) 
      ? { _id: req.params.slug } 
      : { Entry_Slug: req.params.slug };

    const post = await Post.findOne(q)
      .select('Entry_Title Entry_Body_Plain Entry_Body_Resume_Plain Entry_Resume Entry_Slug ttsAudioUrl readingTime ttsGeneratedAt')
      .lean();
    
    if (!post) return res.status(404).json({ message: 'No encontrado' });

    res.json({
      data: {
        id: post._id,
        slug: post.Entry_Slug,
        title: post.Entry_Title,
        plain: post.Entry_Body_Plain || post.Entry_Body_Resume_Plain || post.Entry_Resume,
        resume: post.Entry_Body_Resume_Plain || post.Entry_Resume,
        audioUrl: post.ttsAudioUrl || null, // ej: /public/audio/6aa470c2ce03e441d9cd18b8.mp3
        readingTime: post.readingTime || 1,
        hasAudio: !!post.ttsAudioUrl
      }
    });
  } catch (e) {
    console.error('[TTS GET]', e);
    res.status(500).json({ message: e.message });
  }
});

// POST /api/v2/tts/:slug/generate - genera mp3 (ID o SLUG)
router.post('/:slug/generate', async (req, res) => {
  try {
    const result = await generateTTS(req.params.slug);
    res.json({ 
      ok: true, 
      audioUrl: result.audioUrl || result.url,
      url: result.audioUrl || result.url,
      cached: result.cached,
      engine: result.engine || 'unknown'
    });
  } catch (e) {
    console.error('[TTS GENERATE]', e);
    res.status(500).json({ ok: false, message: e.message });
  }
});

export default router;