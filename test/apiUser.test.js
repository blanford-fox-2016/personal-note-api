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

//Test script for get article lists
describe('user list', function() {
  it('should return the respond json which contains the list of users from database', function(done) {
    chai.request('http://localhost:3000')
      .get('/api/user')
      .end(function (err, res) {
        res.should.be.json;
        res.should.have.status(200);
        done();
      })
  })
})

//get single article by slug
describe('get single user by username', function() {
  let username = 'tamatamvan';
  it('should return a single article based on slug', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/user/'+username)
    .end(function (err, res) {
      res.should.be.json;
      res.should.have.status(200);
      res.body.username.should.equal('tamatamvan');
      done();
    })
  })
})
describe('user login', function() {
  it('should authenticate user, save a session if username and password correct according to database', function(done) {
    chai.request('http://localhost:3000')
      .post('/api/user/login')
      .send({
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

describe('edit user', function() {
  let username = 'tamatamvan';
  it("should update user's data with a new one based on id", function(done) {
    chai.request('http://localhost:3000')
      .get('/api/user/'+username)
      .end(function (err, res) {
        chai.request('http://localhost:3000')
          .put('/api/user/'+res.body._id)
          .send({
            name: 'Septian Adhi Tama',
            email: 'tama@tamatamvan.web.id',
            username: 'tamatamvan123'
          })
          .end(function (err, res) {
            res.should.be.json;
            res.should.have.status(200);
            res.body.ok.should.equal(1);
            res.body.n.should.equal(1);
            done();
          })
      })
  })
})
describe('delete user', function(){
  let username = 'tamatamvan123'
  it('should delete user data and return status ok 1, n 1', function(done) {
    chai.request('http://localhost:3000')
      .get('/api/user/'+username)
      .end(function (err, res) {
        chai.request('http://localhost:3000')
          .delete('/api/user/'+res.body._id)
          .end(function (err, res){
            res.should.be.json;
            res.should.have.status(200);
            res.body.ok.should.equal(1);
            res.body.n.should.equal(1);
            done();
          })
      })
  })
})
