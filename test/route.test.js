'use strict'
const chai = require('chai')
const chaiHttp = require('chai-http')

const expect = chai.expect
const urlApi = 'http://localhost:3000/api'
chai.use(chaiHttp);



// CRUD ROUTE TEST

describe('create new users', function() {
    it('expect to return new created id name and age', function(done) {
        chai.request(urlApi)
            .post(`/users`)
            .send({
              name: 'test',
              age: 22
            })
            .end(function(req, res) {
                expect(res.body.name).to.be.equal('test')
                expect(res.body.age).to.be.equal(22)
                done()
            })
    })
})


describe('get all users', function() {
    it('expect to return all users', function(done) {
            chai.request(urlApi)
                .get('/users')
                .end(function(err, res) {
                  expect(res.body[0].name).to.be.equal('test')
                  expect(res.body[0].age).to.be.equal(22)
                  expect(res.body.length).to.be.equal(1)
                    done()
                }) // chai
        }) // it
})

describe('get users by id', function() {
    it('expect to return one user by id', function(done) {
      chai.request(urlApi)
          .get('/users')
          .end(function(err, res) {
            let currentId = res.body[0].user_id
            let currentName = res.body[0].name
            let currentAge = res.body[0].age
            chai.request(urlApi)
                .get(`/users/${currentId}`)
                .end(function(err, res) {
                  expect(res.body.name).to.be.equal(currentName)
                  expect(res.body.age).to.be.equal(currentAge)
                  done()
                })
          })
    })
})
//
//
describe('edit users', function() {
        it('expect to return new edited users', function(done) {
          chai.request(urlApi)
              .get('/users')
              .end(function(err, res) {
          chai.request(urlApi)
              .put(`/users`)
              .send({
                  id: res.body[0].user_id,
                  name: 'newUser',
                  age: 44
              })
              .end(function(err, res) {
                expect(res.body.name).to.be.equal('newUser')
                expect(res.body.age).to.be.equal(44)
                done()
              })
            })
        })
    })

describe('Add new note', function() {
    it('expect to add new note on user', function(done) {
      chai.request(urlApi)
          .get('/users')
          .end(function(err, res) {
            let currentId = res.body[0].user_id
            let currentName = res.body[0].name
            let currentAge = res.body[0].age
            console.log('users : ', {currentId, currentName, currentAge});
            chai.request(urlApi)
                .get(`/users/${currentId}`)
                .end(function(err, res) {
                  chai.request(urlApi)
                      .post('/notes')
                      .send({
                        title: 'Belanja',
                        content: 'Sepatu, tas, buku',
                        user_id: currentId
                      })
                      .end(function(req, res) {
                        expect(res.body.title).to.be.equal('Belanja')
                        expect(res.body.content).to.be.equal('Sepatu, tas, buku')
                      })
                  done()
                })
          })
    })
})

describe('get One note by ID', function() {
  it('expect to return one note', function(done) {
    chai.request(urlApi)
        .get('/notes')
        .end(function(err, res) {
          let note_id = res.body[0].note_id
          let title = res.body[0].title
          let content = res.body[0].content
          console.log('data :',{
            note_id,
            title,
            content
          });
          chai.request(urlApi)
              .get(`/notes/${note_id}`)
              .end(function(err, res) {
                expect(res.body.title).to.be.equal(title)
                expect(res.body.content).to.be.equal(content)
                done()
              })
        })
  })
})

describe('Edit a note by Id', function() {
  it('expect to edit note by id', function(done) {
    chai.request(urlApi)
        .get(`/notes`)
        .end(function(err, res) {
          chai.request(urlApi)
              .put(`/notes/${res.body[0].note_id}`)
              .send({
                title: 'Belanja Bulanan',
                content: 'Rak buku'
              })
              .end(function(err, res) {
                expect(res.body.title).to.be.equal('Belanja Bulanan')
                expect(res.body.content).to.be.equal('Rak buku')
                done()
              })
        })
  })
})

describe('Delete a note by Id', function() {
  it('expect to delete note by id', function(done) {
    chai.request(urlApi)
        .get(`/notes`)
        .end(function(err, res) {
          let note_id = res.body[0].note_id
          let title = res.body[0].title
          let content = res.body[0].content
          chai.request(urlApi)
              .delete(`/notes/${note_id}`)
              .end(function(err, res) {
                expect(res.body.title).to.be.equal(title)
                expect(res.body.content).to.be.equal(content)
                done()
              })
        })
  })
})

describe('Route delete users', function() {
    it('expect to return users length and user deleted', function(done) {
      chai.request(urlApi)
          .get('/users')
          .end(function(err, res) {
      chai.request(urlApi)
          .delete(`/users`)
          .send({
              id: res.body[0].user_id
          })
          .end(function(err, res) {
                  expect(res.body.name).to.be.equal('newUser')
                  expect(res.body.age).to.be.equal(44)
                  done()
          })
        })
    })
})
