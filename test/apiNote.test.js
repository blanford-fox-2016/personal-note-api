'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();

describe('create a new note', function() {
  it('should store a new note data to database', function(done) {
    chai.request('http://localhost:3000')
      .post('/api/note')
      .send({
        title: 'First Note',
        content: 'This is first note',
        author: 'tamatamvan',
        slug: 'first-note'
      })
      .end(function(err, res) {
        res.should.be.json;
        res.should.have.status(200);
        done();
      })
  })
})

//Test script for get article lists
describe('get note list', function() {
  it('should return the respond json which contains the list of notes from database', function(done) {
    chai.request('http://localhost:3000')
      .get('/api/note')
      .end(function (err, res) {
        res.should.be.json;
        res.should.have.status(200);
        done();
      })
  })
})

describe('get note by slug', function() {
  it('should return a single note according by title', function(done) {
    chai.request('http://localhost:3000/')
      .get('/api/note/first-note')
      .end(function(err, res){
        res.should.be.json;
        res.should.have.status(200);
        res.body.title.should.equal('First Note');
        done();
      })
  })
})
