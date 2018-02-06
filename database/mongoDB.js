const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdc_passengers');

var mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'connection error:'));
mongoDB.once('open', function() {
  console.log('we\'re connected!');
});

var waitingUserSchema = mongoose.Schema({
  userId: { type: Number, required: true, index: true, unique: true },
  userInfo: { type: Object, required: true },
  created_at: { type: Date, default: Date.now },
  orig_x: Number,
  orig_y: Number,
  destin_x: Number,
  destin_y: Number,
});
var waitingUser = mongoose.model('waiting user', waitingUserSchema);


module.exports.mongoDB = mongoDB;
module.exports.waitingUser = waitingUser;