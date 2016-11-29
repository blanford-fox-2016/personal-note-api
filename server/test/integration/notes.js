const app = require('../../app')
const models = require('../../models')
const User = models.User
const Note = models.Note
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe("Test for notes", () => {

    before((done) => {
        chai.request(app)
            .get('/api/notes/seed')
            .end((err, res) => {
                console.log("Notes seeded")
                done()
            })
    })

    after((done) => {
        chai.request(app)
            .delete('/api/users/all')
            .end((err, res) => {
                console.log("All users deleted")
            })

        chai.request(app)
            .delete('/api/notes/all')
            .end((err, res) => {
                console.log("All notes deleted")
                done()
            })
    })

    describe("Test if can get all notes", () => {
        it("Expect to return all list of notes", (done) => {

            chai.request(app)
                .get('/api/notes')
                .end((err, res) => {
                    expect(res.body).that.is.an('array')
                    expect(res).to.have.status(200)
                    expect(res.body[0]).to.haveOwnProperty('id')
                    expect(res.body[0]).to.haveOwnProperty('TempNoteId')
                    expect(res.body[0]).to.haveOwnProperty('title')
                    expect(res.body[0]).to.haveOwnProperty('content')
                    expect(res.body[0]).to.haveOwnProperty('UserId')
                    expect(res.body[0]).to.haveOwnProperty('createdAt')
                    expect(res.body[0]).to.haveOwnProperty('updatedAt')
                    expect(res.body[0]).to.haveOwnProperty('User')
                    expect(res.body[0].title).to.equal('note a')
                    expect(res.body[0].content).to.equal('content a')
                    done()
                })
        })
    })

    describe("Test if can get note by id", () => {
        it("Expect to return note by id", (done) => {
            Note.findOne({
                order: [
                    ['id', 'DESC']
                ]
            }).then((data) => {
                chai.request(app)
                    .get(`/api/notes/${data.id}`)
                    .end((err, res) => {
                        Note.findOne({
                            where: {
                                id: res.body.id
                            }
                        }).then((data) => {
                            expect(res).to.have.status(200)
                            expect(res.body).to.haveOwnProperty('id')
                            expect(res.body).to.haveOwnProperty('TempNoteId')
                            expect(res.body).to.haveOwnProperty('title')
                            expect(res.body).to.haveOwnProperty('content')
                            expect(res.body).to.haveOwnProperty('UserId')
                            expect(res.body).to.haveOwnProperty('createdAt')
                            expect(res.body).to.haveOwnProperty('updatedAt')
                            expect(res.body).to.haveOwnProperty('User')
                            expect(res.body.id).to.equal(data.id)
                            expect(res.body.TempNoteId).to.equal(data.TempNoteId)
                            expect(res.body.title).to.equal(data.title)
                            expect(res.body.content).to.equal(data.content)
                            done()
                        }).catch((err) => {
                            res.json(err)
                        })
                    })
            })
        })
    })

    describe("Test if can add a note", () => {
        it("Expect to return note that has been created", (done) => {
            chai.request(app)
                .post('/api/notes')
                .send({
                    TempNoteId: Date.now().toString(),
                    title: 'title test',
                    content: 'content test'
                })
                .end((err, res) => {
                    Note.findOne({
                        where: {
                            id: res.body.id
                        }
                    }).then((data) => {
                        expect(res).to.have.status(200)
                        expect(res.body).to.haveOwnProperty('id')
                        expect(res.body).to.haveOwnProperty('TempNoteId')
                        expect(res.body).to.haveOwnProperty('title')
                        expect(res.body).to.haveOwnProperty('content')
                        expect(res.body).to.haveOwnProperty('UserId')
                        expect(res.body).to.haveOwnProperty('createdAt')
                        expect(res.body).to.haveOwnProperty('updatedAt')
                        expect(res.body).to.haveOwnProperty('User')
                        expect(res.body.id).to.equal(data.id)
                        expect(res.body.TempNoteId).to.equal(data.TempNoteId)
                        expect(res.body.title).to.equal(data.title)
                        expect(res.body.content).to.equal(data.content)
                        done()
                    }).catch((err) => {
                        res.json(err)
                    })
                })
        })
    })

    describe("Test if can update a note", () => {
        it("Expect to return user that has been updated", (done) => {
            chai.request(app)
            Note.findOne({
                order: [
                    ['id', 'DESC']
                ]
            }).then((data) => {
                chai.request(app)
                    .put(`/api/notes`)
                    .send({
                        id: data.id,
                        title: 'title update',
                        content: 'content update'
                    })
                    .end((err, res) => {
                        Note.findOne({
                            where: {
                                id: res.body.id
                            }
                        }).then((data) => {
                            expect(res).to.have.status(200)
                            expect(res.body).to.haveOwnProperty('id')
                            expect(res.body).to.haveOwnProperty('TempNoteId')
                            expect(res.body).to.haveOwnProperty('title')
                            expect(res.body).to.haveOwnProperty('content')
                            expect(res.body).to.haveOwnProperty('UserId')
                            expect(res.body).to.haveOwnProperty('createdAt')
                            expect(res.body).to.haveOwnProperty('updatedAt')
                            expect(res.body).to.haveOwnProperty('User')
                            expect(res.body.id).to.equal(data.id)
                            expect(res.body.TempNoteId).to.equal(data.TempNoteId)
                            expect(res.body.title).to.equal(data.title)
                            expect(res.body.content).to.equal(data.content)
                            done()
                        }).catch((err) => {
                            res.json(err)
                        })
                    })
            })
        })
    })

    describe("Test if can delete a user", () => {

        it("Expect to return true if delete user working", (done) => {
            Note.findOne({
                order: [
                    ['id', 'DESC']
                ]
            }).then((data) => {
                chai.request(app)
                    .delete(`/api/notes`)
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