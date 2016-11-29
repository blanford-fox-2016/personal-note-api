import mongoose from 'mongoose'

const Schema = mongoose.Schema

let NotesSchema = new Schema ({
  "id"          : {
    "type"      : Schema.Types.ObjectId,
    "required"  : true,
    "unique"    : true
  },
  "title"       : {
    "type"      : String,
    "required"  : true,
  },
  "content"     : {
    "type"      : String,
    "required"  : true,
  },
  "userId"      : [{
    "type"      : Schema.Types.ObjectId,
    "ref"       : "Users",
  }]
},{
  "timestamps"  : true
})

export default mongoose.model('Notes', NotesSchema)
