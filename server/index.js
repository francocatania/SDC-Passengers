const express = require('express');
const bodyParser = require('body-parser');
const { mongoDB , waitingUser } = require('../database/mongoDB.js');
const knex  = require('../database/pg.js');
const helpers = require('./serverHelpers.js');


const app = express();
app.use(bodyParser.json())

let surgeRatio = {
  "surgeId": 1234,
  "surgeRatio": 1.35,
}


//PRICING
app.get('/price', (req, res) => res.send(surgeRatio))
app.post('/surgeRatio', (req,res) => {
  surgeRatio = req.body;
  console.log(surgeRatio);
  res.sendStatus(202);
})
app.post('/transactions', (req, res) => {
  helpers.sendTransaction(req.body, res);
})


//MATCHING - eventually this is going to be implemented with a queue.
app.get('/driver/:userId/:origin/:destination', (req, res) => { // esto o en el body?
  let userId = req.params.userId;
  waitingUser.findOne({ userId: userId}, function (err, doc){
    if (err) { console.errror(err) }
    if (doc === null) {
      knex.raw(`select id, full_name, phone_number from users where id=${userId}`) //try sending the whole row with select *
        .then(response => {
          let userInfo = response.rows[0];
          let userTrip = {
            "userId": userId,
            "userInfo": userInfo,
            "created_at": Date.now(),
            "origin": JSON.parse(req.params.origin),
            "destination": JSON.parse(req.params.destination)
          }
          return userTrip;
        })
        .catch( err => {
          console.log('Failed to getUserInfo from PostgreSQL');
          console.error(error);
        })
        .then( userTrip => {
          helpers.sendUserTrip(userTrip, res);
          waitingUser.create(userTrip, err => {
            if (err) console.error(err);
            else console.log('user added to waitlist');
          })
          //Polling
          helpers.pollingFor(userId, res);
        })
        .catch( err => {
          console.log('ERROR !');
          console.error(error);
        })
    } else {
      res.send('User already on the waitlist!');
    }
  });
});

app.post('/match', (req, res) => {
  console.log('Driver found!');
  let userId = req.body.userInfo.id;
  helpers.matches[userId] = req.body;
  res.sendStatus(200);
})


//Waitlist
app.get('/waitlist', (req,res) => {
  waitingUser.find({}, function(err, docs) {
    if (!err) { 
      res.send(docs);
    } else {throw err;}
  });
})

app.get('/waitlistLength', (req,res) => {
  waitingUser.count({}, function(err, count) {
    if (!err) {
      res.send({"waitlistLength": count});
    } else {throw err;}
  });
})

app.listen(3000, () => console.log('app listening on port 3000!'))