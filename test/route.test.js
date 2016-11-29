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
                  id: res.body[0].id,
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

describe('Route delete all users', function() {
    it('expect to return users length and user deleted', function(done) {
      chai.request(urlApi)
          .get('/users')
          .end(function(err, res) {
      chai.request(urlApi)
          .delete(`/users`)
          .send({
              id: res.body[0].id
          })
          .end(function(err, res) {
            chai.request(urlApi)
                .get('/users')
                .end(function(err, res) {
                  expect(res.body.name).to.be.equal('newUser')
                  expect(res.body.age).to.be.equal(44)
                  expect(res.body.length).to.be.equal(0)
                  done()
            })
          })
        })
    })
})
