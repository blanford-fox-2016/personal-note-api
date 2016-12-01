'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();

describe('register a new user', function() {
  it('should store a new user data to database and return a session', function(done) {
    chai.request('http://localhost:3000')
      .post('/api/user')
      .send({
        name: 'Septian Adhi Tama',
        email: 'tama@tamatamvan.web.id',
        username: 'tamatamvan',
        password: 'tamatamvan'
      })
      .end(function(err, res) {
        res.should.be.json;
        res.should.have.status(200);
        done();
      })
  })
})
