const express = require('express');
const bodyParser = require('body-parser');
const { queue } = require('../queue.js');
const { db } = require('../database/index.js');
const app = express();
app.use(bodyParser.json())

let surgeRatio = {
  "surgeId": 1234,
  "surgeRatio": 1.35,
}

app.get('/price', (req, res) => res.send(surgeRatio))

app.get('/driver/:userId/:location/:destination', (req, res) => {
  // add user to the queue
  // start polling from matched queue
      // maybe do a set interval to simulate???

  // 
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('app listening on port 3000!'))