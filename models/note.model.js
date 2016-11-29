'use strict'

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
let connection = mongoose.createConnection(process.env.DATABASE);
let noteSchema = new mongoose.Schema({
    note_id: {
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    user_id: {
      type: Number
    }
});

noteSchema.plugin(AutoIncrement, {inc_field: 'note_id'});
let Note = connection.model('Note', noteSchema);
module.exports = Note
