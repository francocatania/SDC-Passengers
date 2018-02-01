const axios = require('axios');
const PRICING_DIR = 'http://localhost:8080';
const MATCHING_DIR = 'http://localhost:5000';

let sendTransaction = (transaction, res) => {
  axios.post(`${PRICING_DIR}/transactions`, transaction)
  .then(response => {
    console.log(response.data);
    res.sendStatus(201);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(503);
  })
};

let sendUserTrip = (userTrip, res) => { //sends trip to Matching service - this might be replaced by Amazon SQS or Kue
  axios.post(`${MATCHING_DIR}/trips`, userTrip)
  .then(response => {
    console.log('Trip sent to Matching');
    // console.log(response.data);
  })
  .catch(error => {
    console.log('fallo sendUserTrip');
    console.log(error);
    res.sendStatus(503);
  })
};

let matches = {};
let pollingFor = (userId, res) => {
  let poll = setInterval(() => {
      if(matches[userId]) {
        res.send(matches[userId].driverInfo);
        clearInterval(poll);
      } else {
        console.log('match not found, polling...')
      }
    }, 250
  );
}


module.exports.sendTransaction = sendTransaction;
module.exports.sendUserTrip = sendUserTrip;
module.exports.pollingFor = pollingFor;
module.exports.matches = matches;