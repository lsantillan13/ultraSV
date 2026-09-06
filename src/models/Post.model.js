import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  Entry_Title: { type: String, required: true, trim: true, index: 'text' },
  Entry_Resume: { type: String, trim: true },
  Entry_Body: { type: String },
  Entry_Featured_Image: { type: String, trim: true },
  Entry_Category: { type: String, trim: true, index: true },
}, { 
  timestamps: true, 
  versionKey: false 
});

// --- INDICES PARA PERFORMANCE ---
// 1. Portada: ultimas notas primero (createdAt desc) - el mas usado
postSchema.index({ createdAt: -1 });

// 2. Filtro por categoria + fecha (ej: /Deportes)
postSchema.index({ Entry_Category: 1, createdAt: -1 });

// 3. Busqueda por titulo
postSchema.index({ Entry_Title: 'text', Entry_Resume: 'text' });

// Opcional: si agregas autor en el futuro
// postSchema.index({ Entry_Author: 1 });

export default model('Post', postSchema);
