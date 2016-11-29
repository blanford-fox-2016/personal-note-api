import Note from '../models/models.api.notes'
import User from '../models/models.api.users'

let getNoteById = (req, res) => {
  Note
    .findOne({
      id: req.params.id
    })
    .then((get_one_note) => {
      console.log(get_one_note);
      res.json(get_one_note)
    })
    .catch((err) => {
      console.log(err);
      res.json(err)
    })
}

let addNewNote = (req, res) => {
  let newNote = new Note({
    "title": req.body.title,
    "content": req.body.content,
    "userId": req.body.userId
  })

  newNote.id = newNote._id

  newNote.save((err) => {
    if(err){
      console.log(err);
      res.json(err)
    }else{
      User
        .findOneAndUpdate({
          id: newNote.userId
        }, {
          $push: {
            noteId: newNote.id
          }
        })
        .then((user_updated) => {
          console.log(`noteId in ${user_updated.name} has edited`);
          res.json(newNote)
        })
        .catch((err) => {
          console.log(err);
          res.json(err)
        })
    }
  })
}

export {
  getNoteById,
  addNewNote
}
