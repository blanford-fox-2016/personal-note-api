'use strict'
const Notes = require('../models/Notes');
const slug = require('slug');

let getAllNotes = (req, res, next) => {
  Notes.find({}, (err, notes) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(notes);
    }
  })
}

let getNoteBySlug = (req, res, next) => {
  Notes.findOne({
    slug: req.params.slug
  }, (err, note) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(note);
    }
  })
}

let createNote = (req, res, next) => {
  Notes.create({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    slug: slug(req.body.title).toLowerCase()
  }, (err, note) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(err);
    }
  })
}

let editNoteById = (req, res, next) => {
  Notes.findOneAndUpdate({
    _id: req.params.id
  },
  req.body ,
  {
    new: true
  },
  (err, edited) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(edited);
    }
  })
}

let deleteNoteById = (req, res, next) => {
  Notes.remove({
    _id: req.params.id
  }, (err, deleted) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(deleted);
    }
  })
}

module.exports = {
  getAllNotes,
  getNoteBySlug,
  createNote,
  editNoteById,
  deleteNoteById
}
