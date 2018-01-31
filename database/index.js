const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdc_passengers');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re connected!');
});

var waitlistSchema = mongoose.Schema({
  userId: Number,
  created_at: { type: Date, default: Date.now },
  location: [],
  destination: [],
});
var Waitlist = mongoose.model('Waitlist', waitlistSchema);

var usersSchema = mongoose.Schema({
  userId: Number,
  created_at: { type: Date, default: Date.now },
  location: []
});
var Users = mongoose.model('Users', usersSchema);



module.exports.db = db;