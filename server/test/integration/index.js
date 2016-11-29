const app = require('../../app')
const User = require('../../models/user')
const Note = require('../../models/note')
const mocha = require('mocha')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe("Test for users", () => {

    beforeEach(function (done) {
        chai.request(app)
            .get('/api/users/seed')
            .end(function (err, res) {
                console.log("User seeded")
                done()
            })
    })

    afterEach(function (done) {
        chai.request(app)
            .delete('/api/users/all')
            .end(function (err, res) {
                console.log("All smartphones deleted")
                done()
            })
    })

    describe("Test if can get all users", () => {
        it("Expect to return all list of users", (done) => {

            chai.request(app)
                .get('/api/users')
                .end(function (err, res) {
                    expect(res.body).that.is.an('array')
                    expect(res).to.have.status(200)
                    // expect(res.body.length).to.equal(5)
                    done()
                })
        })
    })

    describe("Test if can get user by id", () => {
        it("Expect to return all list of users", (done) => {
            User.findOne({
                order: [
                    ['id', 'DESC']
                ]
            }).then((data) => {
                chai.request(app)
                    .get(`/api/users/${data.id}`)
                    .end(function (err, res) {

                        Smartphone.findOne({
                            name: res.body.name
                        }, function (err, data) {
                            expect(res).to.have.status(200)
                            expect(res.body.name).to.equal(data.name)
                            done()
                        })

                        User.findOne({
                            where: {
                                id: res.body.id
                            }
                        }).then((data) => {
                            expect(res).to.have.status(200)
                            expect(res.body.id).to.equal(data.id)
                            expect(res.body.TempUserId).to.equal(data.TempUserId)
                            expect(res.body.name).to.equal(data.name)
                            expect(res.body.age).to.equal(data.age)
                            done()
                        }).catch((err) => {
                            res.json(err)
                        })
                    })
            }).catch((err) => {
                res.json(err)
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
                .end(function (err, res) {
                    User.findOne({
                        where: {
                            id: res.body.id
                        }
                    }).then((data) => {
                        expect(res).to.have.status(200)
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

    describe("Test if can update a user", () => {
        it("Expect to return user that has been updated", (done) => {
            chai.request(app)
            User.findOne({
                order: [
                    ['id', 'DESC']
                ]
            }).then((data) => {
                chai.request(app)
                    .put(`/api/users`)
                    .send({
                        id: data.id,
                        name: data.name,
                        age: data.age
                    })
                    .end(function (err, res) {
                        User.findOne({
                            where: {
                                id: res.body.id
                            }
                        }).then((data) => {
                            expect(res).to.have.status(200)
                            expect(res.body.name).to.equal(data.id)
                            expect(res.body.name).to.equal(data.TempUserId)
                            expect(res.body.name).to.equal(data.name)
                            expect(res.body.os).to.equal(data.age)
                            done()
                        }).catch((err) => {
                            res.json(err)
                        })
                    })
            }).catch((err) => {
                res.json(err)
            })
        })
    })

    describe("Test if can delete a user", function () {

        it("Expect to return true if delete user working", function (done) {
            User.findOne({
                order: [
                    ['id', 'DESC']
                ]
            }).then((data) => {
                chai.request(app)
                    .delete(`/api/users`)
                    .end(function (err, res) {
                        expect(res).to.have.status(200)
                        // expect(res.body.name).to.equal(1)
                        done()
                    })
            }).catch((err) => {
                res.json(err)
            })
        })
    })

})