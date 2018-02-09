const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const redisClient = require('../cache/redis.js');

const app = express();
app.use(bodyParser.json())

app.post('/transactions', (req, res) => {
  res.send('Transaction Received');
})

let updateSurgeRatio = () => {
  let surgeId = Math.floor(Math.random() * 500);
  let surgeRatio =  Math.floor(Math.random() * 4 + 1);
  redisClient.hmset('surgeRatio', "surgeId", surgeId, "surgeRatio", surgeRatio);
}

setInterval(updateSurgeRatio, 10000);


app.listen(8080, () => console.log('app listening on port 8080!'))