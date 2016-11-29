'use strict'

let note = require('../models/note.model')

module.exports = {
  addNote: function(req, res) {
    note.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id
    }, (err, data) => {
      if (err) {
        console.log(err);
        res.json({message: `Error: ${err}`})
      } else {
        res.json(data)
      }
    })
  },
  showAllNotes: function(req, res) {
    note.find({}, (err, data)=> {
      if (err) {
        console.log(err);
        res.json({message: `Error: ${err}`})
      } else {
        res.json(data)
      }
    })
  },
  getNoteById: function(req, res) {
    note.findOne({
      note_id: req.params.id
    }, (err, data)=> {
      if (err) {
        console.log(err);
        res.json({message: `Error: ${err}`})
      } else {
        res.json(data)
      }
    })
  },
  editNote: function(req, res) {
    note.findOneAndUpdate({
      note_id: req.params.id
    }, {
      title: req.body.title,
      content: req.body.content
    }, {
      new: true
    }, (err, data) => {
      if (err) {
        console.log(err);
        res.json({message: `Error: ${err}`})
      } else {
        console.log('edit controller :', data);
        res.json(data)
      }
    })
  },
  deleteNote: function(req, res) {
    note.findOneAndRemove({
      note_id: req.params.id
    }, (err, data) => {
      if (err) {
        console.log(err);
        res.json({message: `Error: ${err}`})
      } else {
        console.log('data delete :', data);
        res.json(data)
      }
    })
  }

}
