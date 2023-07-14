import { Schema, model} from 'mongoose';

const newSchema = new Schema({
  //Entry
  title: String,
  id: String,
  url: String,
},{ timestamps: true, versionKey: false})

export default model('Corte', newSchema);