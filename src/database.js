import mongoose from 'mongoose';

mongoose.set('strictQuery', true);
// mongoose.connect('mongodb+srv://ultravox:los40@cluster0.egn8msm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
mongoose.connect('mongodb+srv://ultravox:los40@cluster0.egn8msm.mongodb.net/?retryWrites=true&w=majority',{
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(db => console.log('DB Is connected'))
  .catch(err => console.log(err))

  /*   import mongoose from 'mongoose';

  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
  const uri = 'mongodb+srv://ultravox:los40@cluster0.egn8msm.mongodb.net/?retryWrites=true&w=majority';

  async function run() {
  try{
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      await mongoose.disconnect();
    }
  }
  run().catch(console.dir); */