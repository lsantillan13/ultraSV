import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import mongoose from 'mongoose';
import Post from '../models/post.model.js';

const stripHtml = (html = '') => html
 .replace(/<style[^>]*>.*?<\/style>/gis, '')
 .replace(/<script[^>]*>.*?<\/script>/gis, '')
 .replace(/<[^>]+>/g, ' ')
 .replace(/\s+/g, ' ').trim();

const slugify = (text = '') => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').substring(0,120);

await mongoose.connect(process.env.MONGODB_URI);
const posts = await Post.find({ $or: [{ Entry_Slug: { $exists: false } }, { Entry_Slug: null }, { Entry_Body_Plain: { $exists: false } }, { Entry_Body_Plain: '' }] });

for (const p of posts) {
  if (!p.Entry_Slug) p.Entry_Slug = slugify(p.Entry_Title) + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2,4);
  if (!p.Entry_Body_Plain && p.Entry_Body) p.Entry_Body_Plain = stripHtml(p.Entry_Body).substring(0,20000);
  if (p.Entry_Resume && !p.Entry_Body_Resume_Plain) p.Entry_Body_Resume_Plain = stripHtml(p.Entry_Resume);
  await p.save();
  console.log('migrado', p.Entry_Slug);
}
process.exit();