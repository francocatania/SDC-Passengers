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

app.get('/driver/:userId/:location/:destination', (req, res) => {
  // add user to the queue
  

  // 
})

app.listen(3000, () => console.log('app listening on port 3000!'))