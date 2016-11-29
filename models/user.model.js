'use strict'

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
let connection = mongoose.createConnection(process.env.DATABASE);
let userSchema = new mongoose.Schema({
    user_id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    notes: {
        type: Array,
        default: []
    }
});

userSchema.plugin(AutoIncrement, {inc_field: 'user_id'});
let User = connection.model('User', userSchema);
module.exports = User
