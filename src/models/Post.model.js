import { Schema, model} from 'mongoose';

const newSchema = new Schema({
  //Entry
  Entry_Title: String,
  Entry_URL: String,
  Entry_Resume: String,
  Entry_Body: String,
  Entry_Featured_Image: String,
  Entry_Complementary_Image: String,
  Entry_Complementary_Text: String,
  Entry_Tags: Array,
  Entry_Category: String,
  Author_Name: String,
  date: {type: Date, default: Date.now}
},{ timestamps: true, versionKey: false})

export default model('Post', newSchema);