import chai from 'chai'
import chaiHTTP from 'chai-http'
import mongoose from 'mongoose'
import User from '../models/models.api.users'
import Note from '../models/models.api.notes'
const expect = chai.expect
const should = chai.should()
chai.use(chaiHTTP)
mongoose.connect('mongodb://localhost/db_personal_note')
mongoose.Promise = global.Promise

const URL = 'http://localhost:3000/'

let delete_all = () => {
  User.remove()
  .then((remove_all) => {
    console.log(remove_all.result);
  })
  .catch((err) => {
    console.log(err);
  })
  Note.remove()
    .then((remove_all) => {
      console.log(remove_all.result);
    })
    .catch((err) => {
      console.log(err);
    })
}

before('Delete all data before testing', done => {
  console.log(`Delete all data before testing`);
  delete_all()
  done()
})

after('Delete all data after testing', done => {
  console.log(`Delete all data after testing`);
  delete_all()
  done()
})

describe('Create new user & add new note', () => {
  it('should create new user & note by one new user', (done) => {
    let newUser = new User({
      name: "new user from testing note",
      age: 999,
      email: "new_email@fromtesting.note"
    })

    newUser.id = newUser._id

    newUser.save()

    chai.request(URL)
      .post('api/notes')
      .send({
        "title": "title from testing",
        "content": "content from testing",
        "userId": newUser.id
      })
      .end((err, res_new_note) => {
        res_new_note.should.be.json
        res_new_note.should.have.status(200)

        expect(res_new_note).to.be.an('object')
        expect(res_new_note.body).to.have.ownProperty('title')
        expect(res_new_note.body).to.have.ownProperty('content')
        expect(res_new_note.body).to.have.ownProperty('userId')

        res_new_note.body.title.should.equal('title from testing')
        res_new_note.body.content.should.equal('content from testing')
        res_new_note.body.userId.should.equal(String(newUser.id))
        done()
      })
  })
})

describe('Get one note by id', () => {
  it('should show one note by id', (done) => {
    User.find()
      .then((data_users) => {
        chai.request(URL)
          .get('api/notes/'+data_users[0].noteId[0])
          .end((err, res) => {
            res.should.be.json
            res.should.have.status(200)

            expect(res.body).to.be.an('object')

            expect(res.body).to.have.ownProperty('_id')
            expect(res.body).to.have.ownProperty('id')
            expect(res.body).to.have.ownProperty('createdAt')
            expect(res.body).to.have.ownProperty('updatedAt')
            expect(res.body).to.have.ownProperty('title')
            expect(res.body).to.have.ownProperty('content')
            expect(res.body).to.have.ownProperty('userId')
            expect(res.body).to.have.ownProperty('__v')

            expect(res.body.userId).to.be.an('object')
            expect(res.body.userId).to.have.ownProperty('_id')
            expect(res.body.userId).to.have.ownProperty('id')
            expect(res.body.userId).to.have.ownProperty('createdAt')
            expect(res.body.userId).to.have.ownProperty('updatedAt')
            expect(res.body.userId).to.have.ownProperty('name')
            expect(res.body.userId).to.have.ownProperty('age')
            expect(res.body.userId).to.have.ownProperty('email')
            expect(res.body.userId).to.have.ownProperty('__v')

            res.body.title.should.equal('title from testing')
            res.body.content.should.equal('content from testing')
            done()
          })
      })
  })
})

describe('Edit one note by id', () => {
  it('should edit one note by id', (done) => {
    User.find()
      .then((data_users) => {
        chai.request(URL)
          .put('api/notes/')
          .send({
            id: data_users[0].noteId[0],
            title: "new update title note from testing",
            content: "new update title note from testing"
          })
          .end((err, res) => {
            res.should.be.json
            res.should.have.status(200)

            expect(res.body).to.be.an('object')
            expect(res.body).to.have.ownProperty('title')
            expect(res.body).to.have.ownProperty('content')
            expect(res.body).to.have.ownProperty('userId')

            res.body.title.should.equal('new update title note from testing')
            res.body.content.should.equal('new update title note from testing')
            res.body.userId.should.equal(String(data_users[0].id))
            done()
          })
      })
  })
})

describe('Delete one note by id', () => {

  afterEach((done) => {
    delete_all()
    done()
  })

  it('should delete one note by id', (done) => {
    User.find()
      .then((data_users) => {
        chai.request(URL)
          .delete('api/notes/')
          .send({
            id: data_users[0].noteId[0]
          })
          .end((err, res) => {
            res.should.be.json
            res.should.have.status(200)

            expect(res.body).to.be.an('object')
            expect(res.body).to.have.ownProperty('title')
            expect(res.body).to.have.ownProperty('content')
            expect(res.body).to.have.ownProperty('userId')

            res.body.title.should.equal('new update title note from testing')
            res.body.content.should.equal('new update title note from testing')
            res.body.userId.should.equal(String(data_users[0].id))
            done()
          })
      })
  })
})
