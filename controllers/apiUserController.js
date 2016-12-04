'use strict'
const Users = require('../models/Users');

let getAllUsers = (req, res, next) => {
  Users.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  })
}

let getUserByUsername = (req, res, next) => {
  Users.findOne({
    username: req.params.username
  }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  })
}

let editUserById = (req, res, next) => {
  Users.update({
    _id: req.params.id
  },
  {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username
  }, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      res.json(user)
    }
  })
}

let deleteUserById = (req, res, next) => {
  Users.remove({
    _id: req.params.id
  }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.json(user)
    }
  })
}

module.exports = {
  getAllUsers,
  getUserByUsername,
  editUserById,
  deleteUserById
}
