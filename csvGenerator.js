const fs = require('fs');

for (var i = 0; i < 5000; i++) {
  fs.appendFile('artilleryData.csv',
    `${Math.floor(Math.random()*10000000)},${Math.floor(Math.random()*1000)},${Math.floor(Math.random()*1000)},${Math.floor(Math.random()*1000)},${Math.floor(Math.random()*1000)}\n`,
    (err) => {
      if (err) throw err;
    });
  console.log(`${i + 1} items added to the CSV`);
}



// const fs = require('fs');

// for (var i = 0; i < 5000; i++) {
//   fs.appendFile('userId.csv',
//     `${Math.floor(Math.random()*10000000)}\n`,
//     (err) => {
//       if (err) throw err;
//       console.log(`item successfully added to CSV`);
//   });
//   fs.appendFile('origX.csv',
//     `${Math.floor(Math.random()*1000)}\n`,
//     (err) => {
//       if (err) throw err;
//       console.log(`item successfully added to CSV`);
//   });
//   fs.appendFile('origY.csv',
//     `${Math.floor(Math.random()*1000)}\n`,
//     (err) => {
//       if (err) throw err;
//       console.log(`item successfully added to CSV`);
//   });
//   fs.appendFile('destinX.csv',
//     `${Math.floor(Math.random()*1000)}\n`,
//     (err) => {
//       if (err) throw err;
//       console.log(`item successfully added to CSV`);
//   });
//   fs.appendFile('destinY.csv',
//     `${Math.floor(Math.random()*1000)}\n`,
//     (err) => {
//       if (err) throw err;
//       console.log(`item successfully added to CSV`);
//   });
// }