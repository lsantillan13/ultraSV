import mongoose from 'mongoose';

const InstagramSchema = new mongoose.Schema({
  mediaUrl: { type: String, required: true },
  caption: { type: String, required: true },
  type: { type: String, default: 'solo_ig' },
  status: { type: String, enum: ['mock','published','error','deleted'], default: 'mock' },
  igMediaId: { type: String, default: null },
  permalink: { type: String, default: null },
  entryRef: { type: String, default: null },
}, { timestamps: true });

export default mongoose.model('Instagram', InstagramSchema);