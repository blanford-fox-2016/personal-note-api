const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMonggose = require('passport-local-mongoose'),
    Note = require('./notes')

const User = new Schema({
    username: String,
    password: String,
    avatar: String,
   	notes: [{
   		type: Schema.Types.ObjectId,
        ref: 'Note'
   	}]
}, {
    timestamps: true
})

User.plugin(passportLocalMonggose)

module.exports = mongoose.model('User', User)