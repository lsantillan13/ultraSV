import { Schema, model} from 'mongoose';

const newSchema = new Schema({
  //Entry
  Entry_Title: String,
  Entry_Resume: String,
  Entry_Body: String,
  Entry_FeaturedImage: String,
  Entry_Images: String,
  Entry_Tags: String,
  //Author
  Author_Name: String,
  Author_ProfilePic: String,
},{ timestamps: true, versionKey: false})

export default model('Post', newSchema);