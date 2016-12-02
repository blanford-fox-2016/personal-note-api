const jwt = require('jsonwebtoken')
const decodeJwt = require('jwt-decode')
const models = require('../models')
const User = models.User
const Note = models.Note

module.exports = {
    seedUser: (req, res) => {
        User.create({
            TempUserId: Date.now().toString(),
            name: 'name a',
            age: 11
        }).then((data) => {
            res.json(data)
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

    getAllUsers: (req, res) => {
        User.findAll({
            include: [
                {
                    model: Note
                }
            ]
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    getUserById: (req, res) => {
        User.findOne({
            include: [
                {
                    model: Note
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

    createUser: (req, res) => {
        User.create({
            TempUserId: Date.now().toString(),
            name: req.body.name,
            age: req.body.age
        }).then((data) => {
            User.findOne({
                where: {
                    TempUserId: data.TempUserId
                }
            }).then((data) => {
                // console.log(data)
                res.json(data)
                // res.status(200).json({
                //     token: jwt.sign({
                //         id: data.id,
                //         name: data.name
                //     }, process.env.SESSION_SECRET)
                // })
            })
        }).catch((err) => {
            // res.json(err)
        })
    },

    updateUser: (req, res) => {
        User.update({
            name: req.body.name,
            age: req.body.age
        }, {
            where: {
                id: req.body.id
            }
        }).then(() => {
            User.findOne({
                include: [
                    {
                        model: Note
                    }
                ]
            }, {
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

    deleteUser: (req, res) => {
        User.destroy({
            where: {
                id: req.body.id
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    decodeUser: (req, res) => {
        console.log(req.body)
    }
}