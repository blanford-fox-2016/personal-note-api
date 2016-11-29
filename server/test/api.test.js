const chai = require('chai')
const chaiHTTP = require('chai-http')
const expect = chai.expect
const should = chai.should()
const User = require('../models/users')
const Note = require('../models/notes')
chai.use(chaiHTTP)

const URL = 'http://localhost:3000/api'

describe('/post new users', function() {
    it('expect to return new created id name and age', function(done) {
        chai.request(URL)
            .post(`/users`)
            .send({
                name: 'ken',
                age: 22
            })
            .end(function(req, res) {
                expect(res.body.data.name).to.be.equal('ken')
                expect(res.body.data.age).to.be.equal(22)
                done()
            })
    })
})

describe('/get all users', function() {
    it('expect to return all users', function(done) {
        chai.request(URL)
            .get('/users')
            .end(function(err, res) {
                expect(res.body[0].name).to.be.equal('ken')
                expect(res.body[0].age).to.be.equal(22)
                expect(res.body.length).to.be.equal(1)
                done()
            })
    })
})

describe('/get user by id', function() {
    it('expect to return one user by id', function(done) {
        chai.request(URL)
            .get('/users')
            .end(function(err, res) {
                let currentId = res.body[0]._id
                let currentName = res.body[0].name
                let currentAge = res.body[0].age
                chai.request(URL)
                    .get(`/users/${currentId}`)
                    .end(function(err, res) {
                        expect(res.body.name).to.be.equal(currentName)
                        expect(res.body.age).to.be.equal(currentAge)
                        done()
                    })
            })
    })
})

describe('/put user', function() {
    it('expect to return new edited users', function(done) {
        chai.request(URL)
            .get('/users')
            .end(function(err, res) {
                chai.request(URL)
                    .put(`/users/${res.body[0]._id}`)
                    .send({
                        name: 'ahyana',
                        age: 23
                    })
                    .end(function(err, res) {
                        expect(res.body.data.name).to.be.equal('ahyana')
                        expect(res.body.data.age).to.be.equal(23)
                        done()
                    })
            })
    })
})

// =======================================

describe('/post new note', function() {
    it('expect to return new created id title and content', function(done) {
      chai.request(URL)
      .get('/users')
      .end(function(req,res){
        chai.request(URL)
            .post(`/notes`)
            .send({
                title: 'hello',
                content: 'aloha',
                userid: res.body[0]._id
            })
            .end(function(req, res) {
                expect(res.body.data.title).to.be.equal('hello')
                expect(res.body.data.content).to.be.equal('aloha')
                done()
            })
      })
        
    })
})

describe('/get all notes', function() {
    it('expect to return all notes', function(done) {
        chai.request(URL)
            .get('/notes')
            .end(function(err, res) {
                expect(res.body[0].title).to.be.equal('hello')
                expect(res.body[0].content).to.be.equal('aloha')
                expect(res.body.length).to.be.equal(1)
                done()
            })
    })
})

describe('/get note by id', function() {
    it('expect to return one note by id', function(done) {
        chai.request(URL)
            .get('/notes')
            .end(function(err, res) {
                let currentId = res.body[0]._id
                let currentName = res.body[0].title
                let currentAge = res.body[0].content
                chai.request(URL)
                    .get(`/notes/${currentId}`)
                    .end(function(err, res) {
                        expect(res.body.title).to.be.equal(currentName)
                        expect(res.body.content).to.be.equal(currentAge)
                        done()
                    })
            })
    })
})

describe('/put note', function() {
    it('expect to return new edited notes', function(done) {
        chai.request(URL)
            .get('/notes')
            .end(function(err, res) {
                chai.request(URL)
                    .put(`/notes/${res.body[0]._id}`)
                    .send({
                        title: 'bitch',
                        content: 'wow'
                    })
                    .end(function(err, res) {
                        expect(res.body.data.title).to.be.equal('bitch')
                        expect(res.body.data.content).to.be.equal('wow')
                        done()
                    })
            })
    })
})

describe('/delete note', function() {
    it('expect to return message that data is deleted', function(done) {
        chai.request(URL)
            .get('/notes')
            .end(function(err, res) {
                chai.request(URL)
                    .delete(`/notes/${res.body[0]._id}`)
                    .end(function(err, res) {
                        res.body.should.have.property('message').eql('Data has been deleted')
                        done()
                    })
            })
    })
})

describe('/delete user', function() {
    it('expect to return message that data is deleted', function(done) {
        chai.request(URL)
            .get('/users')
            .end(function(err, res) {
                chai.request(URL)
                    .delete(`/users/${res.body[0]._id}`)
                    .end(function(err, res) {
                        res.body.should.have.property('message').eql('Data has been deleted')
                        done()
                    })
            })
    })
})