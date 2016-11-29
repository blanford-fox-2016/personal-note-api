import mongoose from 'mongoose'

const Schema = mongoose.Schema

let UsersSchema = new Schema ({
  "id"          : {
    "type"      : Schema.Types.ObjectId,
    "required"  : true,
    "unique"    : true
  },
  "name"        : {
    "type"      : String,
    "required"  : true,
  },
  "age"         : {
    "type"      : Number,
    "required"  : true,
  },
  "email"       : {
    "type"      : String,
    "required"  : true,
  },
  "noteId"      : [{
    "type"      : Schema.Types.ObjectId,
    "ref"       : "Notes",
  }]
})

export default mongoose.model('Users', UsersSchema)
