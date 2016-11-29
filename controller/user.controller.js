'use strict'
const User = require('../models/user.model')

module.exports = {
  createUser: function(req, res) {
    User.create({
      name: req.body.name,
      age: req.body.age
    }, (err, data) => {
      if (err) {
        console.log(err);
        res.json({message: `Error: ${err}`})
      } else {
        res.json(data)
      }
    })
  },
  getAllUser: function(req, res) {
    User.find({}, (err, data)=> {
      if (err) {
        console.log(err);
        res.json({message: `Error: ${err}`})
      } else {
        res.json(data)
      }
    })
  },
  getOneUser: function(req, res) {
    User.findOne({
      user_id: req.params.id
    }, (err, data) => {
      if (err) {
        console.log(err);
        res.json({message: `Error: ${err}`})
      } else {
        res.json(data)
      }
    })
  },
  editUser: function(req, res) {
    User.findOneAndUpdate({
      user_id: req.body.id
    }, {
      name: req.body.name,
      age: req.body.age
    }, {
      new: true
    }, (err, data)=> {
      if (err) {
        console.log(err);
        res.json({message: `Error: ${err}`})
      } else {
        res.json(data)
      }
    })
  },
  deleteUser: function(req, res) {
    User.findOneAndRemove({
      user_id: req.body.id
    }, (err, data)=> {
      if (err) {
        console.log(err);
        res.json({message: `Error: ${err}`})
      } else {
        res.json(data)
      }
    })
  }
}
