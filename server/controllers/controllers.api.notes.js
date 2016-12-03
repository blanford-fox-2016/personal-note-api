const models = require('../models')
const User = models.User
const Note = models.Note

module.exports = {
    seedUserAndNote: (req, res) => {
        User.create({
            TempUserId: Date.now().toString(),
            name: 'name a',
            age: 11
        }).then((data) => {
            Note.create({
                TempNoteId: Date.now().toString(),
                title: 'note a',
                content: 'content a',
                UserId: data.id
            }).then((data) => {
                res.json(data)
            })
        }).catch((err) => {
            res.json(err)
        })
    },

    deleteAllNotes: (req, res) => {
        Note.destroy({
            where: {

            }
        }).then((data) => {
            User.destroy({
                where: {

                }
            }).then((data) => {
                res.json(data)
            })
        }).catch((err) => {
            res.json(err)
        })
    },

    getAllNotes: (req, res) => {
        Note.findAll({
            include: [
                {
                    model: User
                }
            ],
            order: [
                ['updatedAt', 'DESC']
            ]
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    getNoteById: (req, res) => {
        Note.findOne({
            include: [
                {
                    model: User
                }
            ]
        }, {
            where: {
                id: req.params.id
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    createNote: (req, res) => {
        Note.create({
            TempNoteId: req.body.TempNoteId,
            title: req.body.title,
            content: req.body.content,
            UserId: req.body.UserId
        }).then((data) => {
            console.log(data)
            // res.json(data)
            console.log("ini data 1 id: ", data.id)
            console.log("ini data 1: ", data)
            Note.findOne({
                where: {
                    TempNoteId: req.body.TempNoteId
                }
            }).then((data) => {
                console.log("data 2: ", data)
                res.json(data)
            })
        }).catch((err) => {
            res.json(err)
        })
    },

    updateNote: (req, res) => {
        Note.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                TempNoteId: req.body.TempNoteId
            }
        }).then(() => {
            Note.findOne({
                where: {
                    id: req.body.id
                }
            }).then((data) => {
                res.json(data)
            })
        }).catch((err) => {
            res.json(err)
        })
    },

    deleteNote: (req, res) => {
        Note.destroy({
            where: {
                TempNoteId: req.body.TempNoteId
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    }
}