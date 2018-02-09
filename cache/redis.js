const redis = require('redis');

const client = redis.createClient();
 
client.on("error", function (err) {
    console.log("Error " + err);
});

client.hmset('surgeRatio', "surgeId", 567, "surgeRatio", 2, redis.print);



module.exports = client;
