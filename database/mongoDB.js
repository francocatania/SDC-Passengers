const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdc_passengers');

var mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'connection error:'));
mongoDB.once('open', function() {
  console.log('we\'re connected!');
});

var waitingUserSchema = mongoose.Schema({
  userInfo: { type: Object, required: true, index: true, unique: true },
  created_at: { type: Date, default: Date.now },
  origin: Array,
  destination: Array,
});
var waitingUser = mongoose.model('waiting user', waitingUserSchema);


module.exports.mongoDB = mongoDB;
module.exports.waitingUser = waitingUser;