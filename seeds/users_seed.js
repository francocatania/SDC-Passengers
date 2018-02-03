const faker = require('faker');

let generateFakeUsers = () => {
  let fakeUsers = [];
  for (var i = 0; i < 10000; i++) {
    let name = faker.name.findName();
    let username = name.replace(/ /g, '').toLowerCase();
    fakeUsers.push({
      full_name: name,
      email: faker.internet.email(username, `${i}`, 'gmail.com'),
      username: username + i + Math.floor(Math.random() * 1000),
      password_hash: faker.internet.password(8),
      phone_number: faker.phone.phoneNumberFormat(1),
      created_at: faker.date.between('2017-11-01', '2018-02-02'),
    })
  }
  return fakeUsers;
}

exports.seed = function(knex, Promise) {
  // Inserts seed entries
  let insertionArray = [];
  for (var i = 0; i < 200; i++) {
    let insertUsers = knex('users').insert(generateFakeUsers());
    insertionArray.push(insertUsers);
  }
  return Promise.all(insertionArray)
    .then(function () {
      console.log('2M users added!');
    })
    .catch(function (err) {
      console.log('Failed. There was an error');
      console.error(err);
    })
};


// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('users').del()
//     .then(function () {
//       // Inserts seed entries
//       let insertUsers = knex('users').insert(generateFakeUsers());
//       let insertionArray = [];
//       for (var i = 0; i < 200; i++) {
//         insertionArray.push(insertUsers);
//       }
//       return Promise.all(insertionArray);
//     })
//     .then(function () {
//       console.log('2M users added!');
//     })
//     .catch(function (err) {
//       console.log('Failed. There was an error');
//       console.error(err);
//     })
// };