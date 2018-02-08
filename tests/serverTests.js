const { app } = require('../server/index.js');
const knex  = require('../database/pg.js');
const helpers = require('../server/serverHelpers.js');
const { surgeRatio } =  require('../server/index')
const chai = require('chai');
const { expect } = require('chai');
const { should } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('GET /price', () => {
  it('should return status 200', done => {
    chai.request(app)
    .get('/price')
      .end( (err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return an object', done => {
    chai.request(app)
    .get('/price')
      .end( (err, res) => {
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('should return an object with key "surgeId" and its value should be a number', done => {
    chai.request(app)
    .get('/price')
      .end( (err, res) => {
          expect(res.body).to.have.property('surgeId').that.is.a('number');
          done()
      });
  });
  it('should return an object with key "surgeRatio" and its value should be a number', done => {
    chai.request(app)
    .get('/price')
      .end( (err, res) => {
          expect(res.body).to.have.property('surgeRatio').that.is.a('number');
          done()
      });
  });
});

describe('POST /price', () => {
  it('should return status 202', done => {
    chai.request(app)
    .post('/surgeRatio')
      .send({ surgeId: 12345, surgeRatio: 3 })
      .end( (err, res) => {
        expect(res).to.have.status(202);
        done();
      });
  });
  xit('should modify surgeRatio object (Redis)', done => {
    chai.request(app)
    .post('/surgeRatio')
      .send({ surgeId: 12345, surgeRatio: 3 })
      .end( (err, res) => {
        // expect redis query to be { surgeId: 12345, surgeRatio: 3 }
        // 
        done();
      });
  });
});

describe('POST /transactions', () => {
  it('should return status 201', done => {
    chai.request(app)
    .post('/transactions')
      .send({
        userId: 123123,
        accepted: false,
        surgeId: 4234,
        surgeRatio: 4.0
      })
      .end( (err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
});

describe('GET /driver', () => {
  it('should return status 200', done => {
    chai.request(app)
    .get('/driver?userId=1234&origX=123&origY=232&destinX=232&destinY=1231')
      .end( (err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return an object', done => {
    chai.request(app)
    .get('/driver?userId=12345&origX=123&origY=232&destinX=232&destinY=1231')
      .end( (err, res) => {
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('should return an object with keys "name" and "car"', done => {
    chai.request(app)
    .get('/driver?userId=123456&origX=123&origY=232&destinX=232&destinY=1231')
      .end( (err, res) => {
        expect(res.body).to.have.property('name').that.is.a('string');
        expect(res.body).to.have.property('car').that.is.a('string');
        done()
      });
  });
  it('should return "User already in Waitlist" if user is already looking for a driver', done => {
    chai.request(app)
    //agregar un id a redis
    // hacer get driver de ese id (deberia decir que ya esta en waitlist)
    .get('/driver?userId=123455&origX=123&origY=232&destinX=232&destinY=1231') // user 123455 is in mongo waitlist
      .end( (err, res) => {
        expect(res.text).to.equal('User already on the waitlist!')
        // sacalo de waitlist redis
        done();
      });
  });
});

describe('POST /users', function() {
  this.timeout(15000);
  after(function() {
    knex.raw(`DELETE FROM users WHERE username='fcatania'`)
      .then( response => {})
      .catch ( err => console.error(err))
  });
  it('should add user to Database', done => {
    setTimeout(done, 5000);
    chai.request(app)
    .post('/users')
      .send({
        full_name: 'Franco Catania',
        email: 'fcatania@gmail.com',
        username: 'fcatania',
        password_hash: 'ad3fs2f5',
        phone_number: '(415) 309-8290',
        created_at: Date.now()
      })
      .end( (err, res) => {
        knex.raw(`SELECT * FROM users WHERE username='fcatania'`)
          .then( response => {
            expect(response.rowCount).to.equal(1);
            done();
          })
          .catch( error => {
            console.error(err);
            done();
          })
      });
  });
});