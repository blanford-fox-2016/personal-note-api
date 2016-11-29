import 'babel-polyfill'
import chai from 'chai'
import chaiHTTP from 'chai-http'
const expect = chai.expect
const should = chai.should()
chai.use(chaiHTTP)

const URL = 'http://localhost:3000/'

before('Delete all data before testing', (done) => {
  chai.request(URL)
    .delete('api/users')
    .end((err, res) => {
      console.log(`all data is deleted before testing`);
      done()
    })
})

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
        // console.log(res.body);
        expect(res.body).to.be.an('array');
        res.body.map((data) => {
          expect(data).to.have.ownProperty('name')
          expect(data).to.have.ownProperty('age')
          expect(data).to.have.ownProperty('email')
        })

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
            // console.log(respond.body);
            respond.should.have.status(200)
            respond.should.be.json
            expect(respond.body).to.be.an('object');

            expect(respond.body).to.have.ownProperty('name')
            expect(respond.body).to.have.ownProperty('age')
            expect(respond.body).to.have.ownProperty('email')

            respond.body.name.should.equal("name_testing")
            respond.body.age.should.equal(22)
            respond.body.email.should.equal("testing@testing.com")
            done()
          })
      })
  })
})
