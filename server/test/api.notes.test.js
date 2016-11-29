import chai from 'chai'
import chaiHTTP from 'chai-http'
const expect = chai.expect
const should = chai.should()
chai.use(chaiHTTP)

const URL = 'http://localhost:3000/'

describe('Add new note', () => {
  it('should create new note by one new user', (done) => {
    chai.request(URL)
      .post('api/users')
      .send({
        "name" : "name from api.notes.test",
        "age" : 22,
        "email" : "user_notes_testing@testing.com"
      })
      .end((err, res_create_user) => {
        console.log(res_create_user.body);
        chai.request(URL)
          .post('api/notes')
          .send({
            "title": "title from testing",
            "content": "content from testing",
            "userId": res_create_user.body.id
          })
          .end((err, res_new_note) => {
            console.log(res_new_note.body);
            // res_new_note.should.be.json
            // res_new_note.have.status(200)
            //
            // expect(res_new_note).to.be.an('object')
            // expect(res_new_note.body).to.have.ownProperty('title')
            // expect(res_new_note.body).to.have.ownProperty('content')
            // expect(res_new_note.body).to.have.ownProperty('userId')
            //
            // res_new_note.body.title.should.equal('title from testing')
            // res_new_note.body.content.should.equal('content from testing')
            // res_new_note.body.userId.should.equal(res_create_user.body.id)
            done()
          })
      })
  })
})

describe.skip('Get one note by id', () => {
  it('should show one note by id', (done) => {
    chai.request(URL)
      .get('api/notes')
      .send((err, res) => {
        console.log(res);
      })
  })
})
