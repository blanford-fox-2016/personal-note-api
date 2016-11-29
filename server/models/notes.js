const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('./users')

const Note = new Schema({
    title: String,
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', Note)
