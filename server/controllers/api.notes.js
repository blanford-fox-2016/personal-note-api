//DATA WITH MONGOOSE MODEL

const Note = require('../models/notes')
const User = require('../models/users')

//CONTROLLING

module.exports = {
    //get all
    getDatas: (req, res) => {
        Note
            .find({})
            .populate('user')
            .exec((err, datas) => {
                if (err) res.json({ 'error': `Error: ${err}` })
                else if (!datas) res.json({ 'message': 'Failed to get all' })
                res.json(datas)
            })
    },

    //post one
    postData: (req, res) => {
        const note = {
            title: req.body.title,
            content: req.body.content,
            user: req.body.userid
        }
        Note.create(note, (err, data) => {
            User.findOneAndUpdate({ _id: req.body.userid }, { $push: { notes: data._id } }, { new: true }, (err, data2) => {
                if (err) {
                    res.json({ 'error': `Error: ${err}` })
                } else if (!data2) {
                    res.json({ 'message': 'Failed to update user' })
                } else {
                    res.status(200).json({ 'message': 'Add data successful', data })
                }
            })
        })
    },

    //get one
    getData: (req, res) => {
        Note
            .findOne({ _id: req.params.id })
            .populate('user')
            .exec((err, data) => {
                if (err) res.json({ 'error': `Error: ${err}` })
                else if (!data) res.json({ 'message': 'Failed to get' })
                res.status(200).json(data)
            })
    },

    //delete one
    deleteData: (req, res) => {
        Note.findOneAndRemove({
            _id: req.params.id
        }, (err, data) => {
            if (err) res.json({ 'error': `Error: ${err}` })
            else if (!data) res.json({ 'message': 'No data found' })
            res.status(200).json({ 'message': `Data has been deleted` })
        })
    },

    //update one
    updateData: (req, res) => {
        Note.findOneAndUpdate({
            _id: req.params.id
        }, {
            title: req.body.title,
            content: req.body.content
        }, {
            new: true
        }, (err, data) => {
            if (err) res.json({ 'error': `Error: ${err}` })
            else if (!data) res.json({ 'message': 'Failed to update' })
            res.status(200).json({ 'message': 'Edit data successful', data })
        })
    }
}
