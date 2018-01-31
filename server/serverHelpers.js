const axios = require('axios');
const PRICING_DIR = 'http://localhost:8080';

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

module.exports.sendTransaction = sendTransaction;