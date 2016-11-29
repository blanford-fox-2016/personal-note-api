import chai from 'chai'
import chaiHTTP from 'chai-http'
const expect = chai.expect
const should = chai.should()
chai.use(chaiHTTP)
import User from '../models/models.api.users'

const URL = 'http://localhost:3000/'

describe('Add new user', () => {
  it('Should add new user', (done) => {
    chai.request(URL)
      .post('api/users')
      .send({
        "name" : "name_testing",
        "age" : 22,
        "email" : "testing@testing.com"
      })
      .end((err, res) => {
        res.should.be.json
        res.should.have.status(200)
        // console.log(res.body);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.ownProperty('name')
        expect(res.body).to.have.ownProperty('age')
        expect(res.body).to.have.ownProperty('email')

        res.body.name.should.equal("name_testing")
        res.body.age.should.equal(22)
        res.body.email.should.equal("testing@testing.com")
        done()
      })
  })
})

describe('Get all users', () => {
  it('Should show all users', (done) => {
    chai.request(URL)
      .get('api/users')
      .end((err, res) => {
        res.should.be.json
        res.should.have.status(200)
        expect(res.body).to.be.an('array')

        res.body.map((user) => {
          expect(user).to.have.ownProperty('_id')
          expect(user).to.have.ownProperty('id')
          expect(user).to.have.ownProperty('createdAt')
          expect(user).to.have.ownProperty('updatedAt')
          expect(user).to.have.ownProperty('name')
          expect(user).to.have.ownProperty('age')
          expect(user).to.have.ownProperty('email')
          expect(user).to.have.ownProperty('noteId')
          expect(user).to.have.ownProperty('__v')
          expect(user.noteId).to.be.an('array')
          
          user.noteId.map(note => {
            expect(note).to.have.ownProperty('_id')
            expect(note).to.have.ownProperty('id')
            expect(note).to.have.ownProperty('createdAt')
            expect(note).to.have.ownProperty('updatedAt')
            expect(note).to.have.ownProperty('title')
            expect(note).to.have.ownProperty('content')
            expect(note).to.have.ownProperty('userId')
            expect(note).to.have.ownProperty('__v')
          })
        })

        // optional
        res.body[0].name.should.equal("name_testing")
        res.body[0].age.should.equal(22)
        res.body[0].email.should.equal("testing@testing.com")
        done()
      })
  })
})

describe('Get one user by id', () => {
  it('should show one user by id(index = 0)', (done) => {
    chai.request(URL)
      .get('api/users/')
      .end((err, res) => {
        chai.request(URL)
          .get('api/users/'+res.body[0].id)
          .end((err, respond) => {
            respond.should.have.status(200)
            respond.should.be.json
            expect(respond.body).to.be.an('object');

            expect(respond.body).to.have.ownProperty('_id')
            expect(respond.body).to.have.ownProperty('id')
            expect(respond.body).to.have.ownProperty('createdAt')
            expect(respond.body).to.have.ownProperty('updatedAt')
            expect(respond.body).to.have.ownProperty('name')
            expect(respond.body).to.have.ownProperty('age')
            expect(respond.body).to.have.ownProperty('email')
            expect(respond.body).to.have.ownProperty('__v')

            expect(respond.body.noteId).to.be.an('array')

            respond.body.noteId.map(note => {
              expect(note).to.have.ownProperty('_id')
              expect(note).to.have.ownProperty('id')
              expect(note).to.have.ownProperty('createdAt')
              expect(note).to.have.ownProperty('updatedAt')
              expect(note).to.have.ownProperty('title')
              expect(note).to.have.ownProperty('content')
              expect(note).to.have.ownProperty('__v')
            })

            respond.body.name.should.equal("name_testing")
            respond.body.age.should.equal(22)
            respond.body.email.should.equal("testing@testing.com")
            done()
          })
      })
  })
})

describe('Edit one user by id', () => {
  it('should edit one user by id(index = 0)', (done) => {
    chai.request(URL)
      .get('api/users/')
      .end((err, res) => {
        chai.request(URL)
          .put('api/users/')
          .send({
            "id": res.body[0].id,
            "name": "new edit from testing",
            "age": 999,
            "email": "edit_testing@testing.com"
          })
          .end((err, respond) => {
            respond.should.have.status(200)
            respond.should.be.json
            expect(respond.body).to.be.an('object');

            expect(respond.body).to.have.ownProperty('name')
            expect(respond.body).to.have.ownProperty('age')
            expect(respond.body).to.have.ownProperty('email')

            respond.body.name.should.equal("new edit from testing")
            respond.body.age.should.equal(999)
            respond.body.email.should.equal("edit_testing@testing.com")
            done()
          })
      })
  })
})

describe('Delete one user by id', () => {
  it('should delete one user by id (index = 0)', (done) => {
    chai.request(URL)
      .get('api/users/')
      .end((err, res) => {
        chai.request(URL)
          .delete('api/users/')
          .send({
            "id": res.body[0].id
          })
          .end((err, respond) => {
            respond.should.have.status(200)
            respond.should.be.json
            expect(respond.body).to.be.an('object');

            expect(respond.body).to.have.ownProperty('name')
            expect(respond.body).to.have.ownProperty('age')
            expect(respond.body).to.have.ownProperty('email')

            respond.body.name.should.equal("new edit from testing")
            respond.body.age.should.equal(999)
            respond.body.email.should.equal("edit_testing@testing.com")
            done()
          })
      })
  })
})
