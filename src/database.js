import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://ultravox:los40@cluster0.egn8msm.mongodb.net/?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(db => console.log('DB Is connected'))
  .catch(err => console.log(err))