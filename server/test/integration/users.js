const app = require('../../app')
const models = require('../../models')
const User = models.User
const Note = models.Note
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const decode = require('jwt-decode')
chai.use(chaiHttp)

describe("Test for users", () => {

    before((done) => {
        chai.request(app)
            .get('/api/users/seed')
            .end((err, res) => {
                console.log("User seeded")
                done()
            })
    })

    after((done) => {
        chai.request(app)
            .delete('/api/users/all')
            .end((err, res) => {
                console.log("All users deleted")
                done()
            })
    })

    describe("Test if can get all users", () => {
        it("Expect to return all list of users", (done) => {

            chai.request(app)
                .post('/api/users/login')
                .send({
                    name: 'name a'
                })
                .end((err, res) => {
                console.log("ini res: ", res.body)
                    chai.request(app)
                        .get('/api/users')
                        .set('personalNoteToken', res.body.token)
                        .end((err, res) => {
                            expect(res.body).that.is.an('array')
                            expect(res).to.have.status(200)
                            expect(res.body[0]).to.haveOwnProperty('id')
                            expect(res.body[0]).to.haveOwnProperty('TempUserId')
                            expect(res.body[0]).to.haveOwnProperty('name')
                            expect(res.body[0]).to.haveOwnProperty('age')
                            expect(res.body[0]).to.haveOwnProperty('createdAt')
                            expect(res.body[0]).to.haveOwnProperty('updatedAt')
                            expect(res.body[0]).to.haveOwnProperty('Notes')
                            expect(res.body[0].name).to.equal('name a')
                            expect(res.body[0].age).to.equal(11)
                            done()
                        })
                })
        })
    })

    describe("Test if can get user by id", () => {
        it("Expect to return user by id", (done) => {

            chai.request(app)
                .post('/api/users/login')
                .send({
                    name: 'name a'
                })
                .end((err, res) => {
                    console.log("ini session: ", res.body)
                    User.findOne({
                        order: [
                            ['id', 'DESC']
                        ]
                    }).then((data) => {
                        chai.request(app)
                            .get(`/api/users/${data.id}`)
                            .set('personalNoteToken', res.body.token)
                            .end((err, res) => {
                                User.findOne({
                                    where: {
                                        id: res.body.id
                                    }
                                }).then((data) => {
                                    expect(res).to.have.status(200)
                                    expect(res.body).to.haveOwnProperty('id')
                                    expect(res.body).to.haveOwnProperty('TempUserId')
                                    expect(res.body).to.haveOwnProperty('name')
                                    expect(res.body).to.haveOwnProperty('age')
                                    expect(res.body).to.haveOwnProperty('createdAt')
                                    expect(res.body).to.haveOwnProperty('updatedAt')
                                    expect(res.body).to.haveOwnProperty('Notes')
                                    expect(res.body.id).to.equal(data.id)
                                    expect(res.body.TempUserId).to.equal(data.TempUserId)
                                    expect(res.body.name).to.equal(data.name)
                                    expect(res.body.age).to.equal(data.age)
                                    done()
                                }).catch((err) => {
                                    res.json(err)
                                })
                            })
                    })
                })
        })
    })

    describe("Test if can add a user", () => {
        it("Expect to return user that has been created", (done) => {
            chai.request(app)
                .post('/api/users')
                .send({
                    TempUserId: Date.now().toString(),
                    name: 'name test',
                    age: 20
                })
                .end((err, res) => {
                    const userData = decode(res.body.token)
                    console.log("ini res body: ", userData)
                    console.log("ini res body id: ", userData.TempUserId)
                    User.findOne({
                        where: {
                            id: userData.id
                        }
                    }).then((data) => {
                        console.log("ini data id: ", data.TempUserId)
                        expect(res).to.have.status(200)
                        expect(res.body).to.haveOwnProperty('token')
                        expect(userData.id).to.equal(data.id)
                        expect(userData.TempUserId).to.equal(data.TempUserId)
                        expect(userData.name).to.equal(data.name)
                        expect(userData.age).to.equal(data.age)
                        done()
                    }).catch((err) => {
                        res.json(err)
                    })
                })
        })
    })

    describe("Test if can update a user", () => {
        it("Expect to return user that has been updated", (done) => {

            chai.request(app)
                .post('/api/users/login')
                .send({
                    name: 'name a'
                })
                .end((err, res) => {
                    console.log("ini session: ", res.body)
                    chai.request(app)
                    User.findOne({
                        order: [
                            ['id', 'DESC']
                        ]
                    }).then((data) => {
                        chai.request(app)
                            .put(`/api/users`)
                            .set('personalNoteToken', res.body.token)
                            .send({
                                id: data.id,
                                name: 'user update',
                                age: 100
                            })
                            .end((err, res) => {
                                User.findOne({
                                    where: {
                                        id: res.body.id
                                    }
                                }).then((data) => {
                                    expect(res).to.have.status(200)
                                    expect(res.body).to.haveOwnProperty('id')
                                    expect(res.body).to.haveOwnProperty('TempUserId')
                                    expect(res.body).to.haveOwnProperty('name')
                                    expect(res.body).to.haveOwnProperty('age')
                                    expect(res.body).to.haveOwnProperty('createdAt')
                                    expect(res.body).to.haveOwnProperty('updatedAt')
                                    expect(res.body).to.haveOwnProperty('Notes')
                                    expect(res.body.id).to.equal(data.id)
                                    expect(res.body.TempUserId).to.equal(data.TempUserId)
                                    expect(res.body.name).to.equal(data.name)
                                    expect(res.body.age).to.equal(data.age)
                                    done()
                                }).catch((err) => {
                                    res.json(err)
                                })
                            })
                    })
                })
        })
    })

    describe("Test if can delete a user", () => {

        it("Expect to return true if delete user working", (done) => {

            chai.request(app)
                .post('/api/users/login')
                .send({
                    name: 'name a'
                })
                .end((err, res) => {
                    console.log("ini session: ", res.body)
                    User.findOne({
                        order: [
                            ['id', 'DESC']
                        ]
                    }).then((data) => {
                        chai.request(app)
                            .delete(`/api/users`)
                            .set('personalNoteToken', res.body.token)
                            .end((err, res) => {
                                expect(res).to.have.status(200)
                                done()
                            })
                    }).catch((err) => {
                        res.json(err)
                    })
                })
        })
    })

})