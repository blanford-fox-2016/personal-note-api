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

//update single note by id
describe('find by slug, get the id, then update', function() {
  let slug = 'first-note';
  it('should return status ok 1, nModified 1, modified 1', function(done) {
    chai.request('http://localhost:3000')
      .get('/api/note/'+slug)
      .end(function (err, res) {
        console.log(res.body._id);
        chai.request('http://localhost:3000')
          .put('/api/note/'+res.body._id)
          .send({
            title: 'First Note Edited',
            content: 'This is first note edited',
            author: 'tamatamvan',
            slug: 'first-note-edited'
          })
          .end(function (err, res){
            res.should.be.json;
            res.should.have.status(200);
            res.body.title.should.equal('First Note Edited');
            res.body.content.should.equal('This is first note edited');
            res.body.author.should.equal('tamatamvan');
            res.body.slug.should.equal('first-note-edited');
            // res.body.ok.should.equal(1);
            // res.body.nModified.should.equal(1);
            // res.body.n.should.equal(1);
            done();
          });
      })
  })
})

//delete single article by id
describe('find by slug, get the id, then delete', function() {
  let slug = 'first-note-edited';
  it('should return status ok 1, n 1', function(done) {
    chai.request('http://localhost:3000')
      .get('/api/note/'+slug)
      .end(function (err, res) {
        chai.request('http://localhost:3000')
          .delete('/api/note/'+res.body._id)
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
