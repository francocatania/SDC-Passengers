const express = require('express');
const bodyParser = require('body-parser');
const { queue } = require('../queue.js');
const { db } = require('../database/index.js');
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
  let userTrip = {
    "userId": req.params.userId,
    "origin": req.params.origin,
    "destination": req.params.destination,
    "created_at": Date.now()
  }
  console.log(userTrip);
  helpers.sendUserTrip(userTrip, res);

  //Polling
  let userId = req.params.userId;
  helpers.pollingFor(userId, res);
})
app.post('/match', (req, res) => {
  let userId = req.body.userId;
  helpers.matches[userId] = req.body;
  console.log(helpers.matches);
  res.sendStatus(200);
})


app.listen(3000, () => console.log('app listening on port 3000!'))