import { Schema, model} from 'mongoose';

const newSchema = new Schema({
  //Entry
  Entry_Title: String,
  Entry_Resume: String,
  Entry_Body: String,
  Entry_Featured_Image: String,
  Entry_Category: String,
},{ timestamps: true, versionKey: false})

export default model('Post', newSchema);