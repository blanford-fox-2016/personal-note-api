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
            name: 'user create',
            age: 99
        }).then((data) => {
            User.findOne({
                include: [
                    {
                        model: Note
                    }
                ]
            }, {
                where: {
                    TempUserId: data.TempUserId
                }
            }).then((data) => {
                res.json(data)
            })
        }).catch((err) => {
            res.json(err)
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
    }
}