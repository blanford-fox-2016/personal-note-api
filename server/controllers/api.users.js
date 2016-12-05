'use strict'

//DATA WITH MONGOOSE MODEL
const User = require('../models/users')
const Note = require('../models/notes')
const jwt = require('jsonwebtoken')
const passport = require('passport')
//CONTROLLING

module.exports = {
    //get all
    getDatas: (req, res) => {
        User
            .find({})
            .populate('notes')
            .exec((err, data) => {
                if (err) {
                    res.status(400).json({ 'error': `Error: ${err}` })
                } else if (!data) {
                    res.status(404).json({ 'message': 'Failed to get all' })
                } else {
                    res.status(200).json(data)
                }
            })
    },

    //post one
    // postData: (req, res) => {
    //     const user = {
    //         name: req.body.name,
    //         age: req.body.age
    //     }
    //     User.create(user, (err, data) => {
    //         if (err) res.status(400).json({ 'error': `Error: ${err}` })
    //         else if (!data) res.status(304).json({ 'message': 'Failed to post' })
    //         res.status(200).json({ 'message': 'Add data successful', data })
    //     })
    // },

    //post one
    registerLocalUser: (req, res, next) => {
        User.register(new User({
                username: req.body.username,
                avatar: req.body.avatar
            }),
            req.body.password,
            (err, new_user) => {
                if (err) res.status(400).json({ 'error': `Register Error: ${err}` })
                if (!new_user) res.status(404).json({ 'message': 'Failed to register a user' })

                passport.authenticate('local', {
                    successRedirect: '/',
                    successFlash: true,
                    // failureRedirect: '/register',
                    failureFlash: true
                }, (err, user, info) => {
                    if (err) return res.status(400).json({ 'error': `Login Error: ${err}` })
                    if (!user) return res.status(404).json({ 'message': 'Register succeded but sign in falied' })

                    return res.status(200).json({
                        token: jwt.sign({
                            sub: user._id,
                            username: user.username,
                            avatar: user.avatar
                        }, 'secret')
                    })
                })(req, res, next)
            })
    },

    loginUser: (req, res, next) => {
        passport.authenticate('local', {},
            (err, user, info) => {
                if (err) {
                    return res.json(err)
                } else {
                    return res.status(200).json({
                        token: jwt.sign({
                            sub: user._id,
                            username: user.username
                        }, 'secret')
                    })
                }
            })(req, res, next)
    },

    //get one
    getData: (req, res) => {
        User
            .findOne({ _id: req.params.id })
            .populate('notes')
            .exec((err, data) => {
                if (err) {
                    res.json({ 'error': `Error: ${err}` })
                } else if (!data) {
                    res.json({ 'message': 'Failed to get' })
                } else {
                    res.json(data)
                }
            })
    },

    //delete one
    deleteData: (req, res) => {
        User
            .findOneAndRemove({ _id: req.params.id })
            .exec((err, data) => {
                if (err) {
                    res.json({ 'error': `Error: ${err}` })
                }
                else if (!data) {
                    res.json({ 'message': 'No data found' })
                }
                else {
                    res.json({ 'message': `Data has been deleted` })
                }
            })
    },

    //update one
    updateData: (req, res) => {
        User
            .findOne({ _id: req.params.id })
            .exec((err, user) => {
                user.username = req.body.username
                user.avatar = req.body.avatar

                user.save((err, data) => {
                    if (err){
                      res.json({ 'error': `Error: ${err}` })  
                  } else {
                     res.json({ 'message': 'Edit data successful', data })
                  }
                })

            })

    }
}
