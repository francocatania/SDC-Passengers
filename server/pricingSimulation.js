const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json())
const PASSENGERS_DIR = 'http://localhost:3000';


app.post('/transactions', (req, res) => {
  res.send('Todo joya hermano');
})

let sendSurgeRatio = () => {
  axios.post(`${PASSENGERS_DIR}/surgeRatio`, {
    "surgeId": Math.floor(Math.random() * 500),
    "surgeRatio": Math.floor(Math.random() * 4 + 1),
  })
  .then(response => {
    console.log(response.statusText);
  })
  .catch(error => {
    console.log(error);
  })
};

// setInterval(sendSurgeRatio, 1000);



app.listen(8080, () => console.log('app listening on port 8080!'))