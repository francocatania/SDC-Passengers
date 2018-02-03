const axios = require('axios');
const { waitingUser } = require('../database/mongoDB.js');
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
    console.log('sendUserTrip failed');
    console.log(error);
    res.sendStatus(503);
  })
};

let matches = {};
let pollingFor = (userId, res) => {
  let pole = setInterval(() => {
      if(matches[userId]) {
        res.send(matches[userId].driverInfo);
        delete matches[userId];
        clearInterval(pole);
        console.log('Driver on its way!');
        waitingUser.findOne({userId: userId}).remove().exec( (err, data) => {
          if (err) {console.error(err)}
          else {console.log(`Removed user ${userId} from the waitlist.`)}
        });
      }
    }, 250
  );
}


module.exports.sendTransaction = sendTransaction;
module.exports.sendUserTrip = sendUserTrip;
module.exports.pollingFor = pollingFor;
module.exports.matches = matches;