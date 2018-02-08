const { app } = require('../server/index.js');
const helpers = require('../server/serverHelpers.js');
const { surgeRatio } =  require('../server/index')
const chai = require('chai');
const { expect } = require('chai');
const { should } = require('chai');
const chaiHttp = require('chai-http');
const spies = require('chai-spies');

chai.use(chaiHttp);
chai.use(spies);

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
  it('should return status 200', done => {
    chai.request(app)
    .post('/surgeRatio')
      .send({ surgeId: 12345, surgeRatio: 3 })
      .end( (err, res) => {
        expect(res).to.have.status(202);
        done();
      });
  });
  xit('should modify surgeRatio object', done => { //surgeRatio should be in Redis
    chai.request(app)
    .post('/surgeRatio')
      .send({ surgeId: 12345, surgeRatio: 3 })
      .end( (err, res) => {
        // figure it out
        expect(surgeRatio).to.equal({"surgeId": 12345, "surgeRatio": 3});
        done();
      });
  });
});

describe('POST /transactions', () => {
  it('should return status 200', done => {
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
  xit('should call helpers.sendTransaction', done => {
    const spiedFunction = chai.spy(helpers.sendTransaction());
    chai.request(app)
    .post('/transactions')
      .send({
        userId: 123123,
        accepted: false,
        surgeId: 4234,
        surgeRatio: 4.0
      })
      .end( (err, res) => {
        expect(spiedFunction).to.have.been.called();
        done();
      });
  });
});