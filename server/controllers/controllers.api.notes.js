const models = require('../models')
const User = models.User
const Note = models.Note
const UserNote = models.UserNote
const decode = require('jwt-decode')

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
        console.log("ini header: ", decode(req.get("personalNoteToken")))
        const UserToken = decode(req.get("personalNoteToken"))
        UserNote.findAll({
            include: [
                {
                    model: User
                },
                {
                    model: Note
                }
            ],
            order: [
                ['updatedAt', 'DESC']
            ],
            where: {
                UserId: UserToken.id
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    getNoteById: (req, res) => {
        UserNote.findOne({
            include: [
                {
                    model: User
                },
                {
                    model: Note
                }
            ]
        }, {
            where: {
                UserId: req.params.id
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
        }).then((data) => {
            UserNote.create({
                UserId: req.body.UserId,
                NoteId: data.id
            }).then((data) => {
                console.log("ini data: ", data)
                UserNote.findOne({
                    include: [
                        {
                            model: User
                        },
                        {
                            model: Note
                        }
                    ],
                    where: {
                        NoteId: data.NoteId,
                        UserId: data.UserId
                    }
                }).then((data) => {
                    res.json(data)
                })
            })
        }).catch((err) => {
            res.json(err)
        })
    },

    updateNote: (req, res) => {
        console.log(req.body)
        Note.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                TempNoteId: req.body.TempNoteId
            }
        }).then((data) => {
            UserNote.findOne({
                include: [
                    {
                        model: User
                    },
                    {
                        model: Note
                    }
                ],
                where: {
                    NoteId: req.body.NoteId
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
    },

    shareNote: (req, res) => {
        const UserToken = decode(req.get("personalNoteToken"))
        // console.log("masuk share:", User.id)
        User.findAll({
            include: [
                {
                    model: UserNote
                }
            ],
            where: {
                id: {
                    $ne: UserToken.id
                }
            }
        }).then((data) => {
            data.map((item) => {
                UserNote.create({
                    UserId: item.id,
                    NoteId: req.body.id
                })
            })
        }).catch((err) => {
            res.json((err))
        })
    },

    isAuthenticateToken: (req, res, next) => {
        const UserToken = decode(req.get("personalNoteToken"))
        if (req.get("personalNoteToken")) {
            User.findOne({
                where: {
                    id: UserToken.id
                }
            }).then((data) => {
                if (data) return next()
            }).catch((err) => {
                res.json(err)
            })
        }
        else {
            res.json('not login');
        }
    }
}