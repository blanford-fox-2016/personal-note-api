const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Note = require('./notes')

const User = new Schema({
    name: String,
    age: Number,
   	notes: [{
   		type: Schema.Types.ObjectId,
        ref: 'Note'
   	}]
}, {
    timestamps: true
})

module.exports = mongoose.model('User', User)