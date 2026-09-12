import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const getPostModel = () => mongoose.models.Post || mongoose.model('Post');
const AUDIO_DIR = path.join(process.cwd(), 'public', 'audio');
if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true });

const cleanForTTS = (text) => text.replace(/https?:\/\/\S+/g,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();

// Google TTS gratis - parte el texto en chunks de 200 chars
async function generateWithGoogle(text, filePath) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    let chunk = text.slice(i, i + 200);
    const lastDot = chunk.lastIndexOf('.');
    if (lastDot > 100 && i + 200 < text.length) {
      chunk = chunk.slice(0, lastDot + 1);
      i += lastDot + 1;
    } else {
      i += 200;
    }
    chunks.push(chunk);
  }

  const buffers = [];
  for (const chunk of chunks) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=es-AR&client=tw-ob&ttsspeed=1`;
    const res = await fetch(url, {
      headers: { 
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://translate.google.com/'
      }
    });
    if (!res.ok) throw new Error(`Google TTS ${res.status}`);
    buffers.push(Buffer.from(await res.arrayBuffer()));
    await new Promise(r => setTimeout(r, 100));
  }

  fs.writeFileSync(filePath, Buffer.concat(buffers));
  return filePath;
}

export const generateTTS = async (slugOrId) => {
  const Post = getPostModel();
  const query = mongoose.Types.ObjectId.isValid(slugOrId) ? { _id: slugOrId } : { Entry_Slug: slugOrId };
  const post = await Post.findOne(query);
  if (!post) throw new Error('Post no encontrado');

  // LEE Entry_Body_Plain OBLIGATORIO
  let textToRead = post.Entry_Body_Plain;

  // fallback si por X motivo Body_Plain está vacío
  if (!textToRead || textToRead.trim().length < 100) {
    textToRead = post.Entry_Body_Resume_Plain || post.Entry_Resume || post.Entry_Title;
  }

  const cleanText = cleanForTTS(textToRead).substring(0, 8000);
  if (!cleanText) throw new Error('Texto vacío');

  const fileName = `${post._id}.mp3`;
  const filePath = path.join(AUDIO_DIR, fileName);
  const publicUrl = `/public/audio/${fileName}`;

  if (fs.existsSync(filePath)) {
    return { audioUrl: publicUrl, url: publicUrl, cached: true, engine: 'cache', chars: cleanText.length };
  }

  if (process.env.ELEVENLABS_API_KEY) {
    console.log(`[TTS] ElevenLabs leyendo ${cleanText.length} chars de Entry_Body_Plain...`);
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM`, {
      method: 'POST',
      headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText, model_id: 'eleven_multilingual_v2' })
    });
    if (!res.ok) throw new Error(await res.text());
    fs.writeFileSync(filePath, Buffer.from(await res.arrayBuffer()));
  } else {
    console.log(`[TTS] Google gratis leyendo ${cleanText.length} chars de Entry_Body_Plain...`);
    await generateWithGoogle(cleanText, filePath);
  }

  post.ttsAudioUrl = publicUrl;
  post.ttsGeneratedAt = new Date();
  post.readingTime = Math.ceil(cleanText.split(' ').length / 160);
  await post.save();
  return { audioUrl: publicUrl, url: publicUrl, cached: false, engine: process.env.ELEVENLABS_API_KEY ? 'eleven' : 'google-free', chars: cleanText.length };
};