import 'babel-polyfill'
import chai from 'chai'
import chaiHTTP from 'chai-http'
const expect = chai.expect
const should = chai.should()
chai.use(chaiHTTP)

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
