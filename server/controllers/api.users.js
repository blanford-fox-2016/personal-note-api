//DATA WITH MONGOOSE MODEL

const User = require('../models/users')
const Note = require('../models/notes')

//CONTROLLING

module.exports = {
    //get all
    getDatas: (req, res) => {
        User
            .find({})
            .populate('notes')
            .exec((err, data) => {
                if (err) res.status(400).json({ 'error': `Error: ${err}` })
                else if (!data) res.status(404).json({ 'message': 'Failed to get all' })
                res.status(200).json(data)
            })
    },

    //post one
    postData: (req, res) => {
        const user = {
            name: req.body.name,
            age: req.body.age
        }
        User.create(user, (err, data) => {
            if (err) res.status(400).json({ 'error': `Error: ${err}` })
            else if (!data) res.status(304).json({ 'message': 'Failed to post' })
            res.status(200).json({ 'message': 'Add data successful', data })
        })
    },

    //get one
    getData: (req, res) => {
        User
            .findOne({ _id: req.params.id })
            .exec((err, data) => {
                if (err) res.status(400).json({ 'error': `Error: ${err}` })
                else if (!data) res.status(404).json({ 'message': 'Failed to get' })
                res.status(200).json(data)
            })
    },

    //delete one
    deleteData: (req, res) => {
        User
            .findOneAndRemove({ _id: req.params.id })
            .exec((err, data) => {
                if (err) res.status(400).json({ 'error': `Error: ${err}` })
                else if (!data) res.status(404).json({ 'message': 'No data found' })
                res.status(200).json({ 'message': `Data ${req.params.id} has been deleted` })
            })
    },

    //update one
    updateData: (req, res) => {
        User
            .findOne({ _id: req.params.id })
            .exec((err, user) => {
                user.name = req.body.name
                user.age = req.body.age

                user.save((err, data) => {
                    if (err) res.status(400).json({ 'error': `Error: ${err}` })
                    res.status(200).json({ 'message': 'Edit data successful', data })
                })

            })

    }
}
