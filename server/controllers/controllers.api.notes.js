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
                title: 'title a',
                content: 'content a',
                UserId: data.id
            }).then((data) => {
                res.json(data)
            })
        }).catch((err) => {
            res.json(err)
        })
    },

    deleteAllUsers: (req, res) => {
        User.destroy({
            where: {

            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    deleteAllNotes: (req, res) => {
        Note.destroy({
            where: {

            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    getAllNotes: (req, res) => {
        Note.findAll().then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    getNoteById: (req, res) => {
        Note.findOne({
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
            TempNoteId: Date.now().toString(),
            title: 'title create',
            content: 'content create'
        }).then((data) => {
            res.json(data)
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
                id: req.body.id
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
                id: req.body.id
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    }
}