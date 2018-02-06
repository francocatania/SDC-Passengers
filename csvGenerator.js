const fs = require('fs');

for (var i = 0; i < 5000; i++) {
  fs.appendFile('artilleryData.csv',
    `${Math.floor(Math.random()*10000000)},${Math.floor(Math.random()*1000)},${Math.floor(Math.random()*1000)},${Math.floor(Math.random()*1000)},${Math.floor(Math.random()*1000)}\n`,
    (err) => {
      if (err) throw err;
    });
  console.log(`${i + 1} items added to the CSV`);
}