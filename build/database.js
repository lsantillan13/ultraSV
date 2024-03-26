"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_mongoose["default"].set('strictQuery', true);
// mongoose.connect('mongodb+srv://ultravox:los40@cluster0.egn8msm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
_mongoose["default"].connect('mongodb+srv://ultravox:los40@cluster0.egn8msm.mongodb.net/?retryWrites=true&w=majority', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(function (db) {
  return console.log('DB Is connected');
})["catch"](function (err) {
  return console.log(err);
});

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