const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json())
const PASSENGERS_DIR = 'http://localhost:3000';


app.post('/trips', (req, res) => {
  let matchInfo = req.body;
  matchInfo.driverInfo = {"name": 'Carlos', "car": 'Corolla'};
  setTimeout(() => match(matchInfo), 2000);
  res.send('User added to queue');
})

let match = (tripInfo) => {
  axios.post(`${PASSENGERS_DIR}/match`, tripInfo)
  .then(response => {
    console.log(response.statusText);
  })
  .catch(error => {
    console.log(error);
  })
}




app.listen(5000, () => console.log('app listening on port 5000!'))