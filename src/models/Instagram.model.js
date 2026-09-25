import mongoose from 'mongoose';

const InstagramSchema = new mongoose.Schema({
  mediaUrl: { type: String, required: true },
  caption: { type: String, required: true },
  type: { type: String, enum: ['solo_ig', 'teaser_web'], default: 'solo_ig' },
  status: { type: String, enum: ['pending', 'published', 'failed', 'mock'], default: 'pending' },
  igMediaId: { type: String },
  permalink: { type: String },
  error: { type: String },
  entryRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Entry', default: null }
}, { timestamps: true });

export default mongoose.model('InstagramPost', InstagramSchema);