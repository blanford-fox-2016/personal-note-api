'use strict'
const mongoose = require('mongoose');

let notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
});

let notes = mongoose.model('notes', notesSchema)

module.exports = notes
