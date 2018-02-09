require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const { mongoDB , waitingUser } = require('../database/mongoDB.js');
const knex  = require('../database/pg.js');
const helpers = require('./serverHelpers.js');
const redisClient = require('../cache/redis.js');


const app = express();
app.use(bodyParser.json())


//PRICING
app.get('/price', (req, res) => {
  redisClient.hgetall('surgeRatio', function(err, reply) {
    res.send(reply)
  })
})

app.post('/transactions', (req, res) => {
  helpers.sendTransaction(req.body, res);
})


//MATCHING - eventually this is going to be implemented with a queue.
// /driver?userId=123455&origX=123&origY=232&destinX=232&destinY=1231
app.get('/driver', (req, res) => {
  let userId = req.query.userId;
  waitingUser.findOne({ userId: userId}, function (err, doc){
    if (err) { console.errror(err) }
    if (doc === null) {
      knex.raw(`select id, full_name, phone_number from users where id=${userId}`) 
      //try sending the whole row with select *
      // try knex('users').where({
        // first_name: 'Test',
        // last_name:  'User'
        // }).select('id')
        .then(response => {
          let userInfo = response.rows[0];
          let userTrip = {
            "userId": userId,
            "userInfo": userInfo,
            "created_at": Date.now(),
            "orig_x": req.query.origX,
            "orig_y": req.query.origY,
            "destin_x": req.query.destinX,
            "destin_y": req.query.destinY
          }
          return userTrip;
        })
        .catch( err => {
          console.log('Failed to getUserInfo from PostgreSQL');
          throw err;
        })
        .then( userTrip => {
          helpers.sendUserTrip(userTrip, res);
          waitingUser.create(userTrip, err => {
            if (err) {
              console.error('WAITLIST ERROR');
              throw err;
            }
          })
          //Polling
          helpers.pollingFor(userId, res);
        })
        .catch( err => {
          console.log('ERROR !');
          throw err;
        })
    } else {
      res.send('User already on the waitlist!');
    }
  });
});

app.post('/match', (req, res) => {
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


//Add User
app.post('/users', (req, res) => {
  let newUser = req.body;
  knex('users').insert(newUser)
    .then(response => res.send('Successfully added new User to database'))
    .catch(err => {
      console.error('Error adding user to Postgres');
      throw err;
    })
})


app.listen(3000, () => console.log('app listening on port 3000!'));

module.exports.app = app;
// module.exports.surgeRatio = surgeRatio;