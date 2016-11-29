import Note from '../models/models.api.notes'
import User from '../models/models.api.users'

let getNoteById = (req, res) => {
  Note
    .findOne({
      id: req.params.id
    })
    .populate('userId')
    .then((get_one_note) => {
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

let editNote = (req, res) => {
  Note
    .findOneAndUpdate({
      id: req.body.id
    },{
      id: req.body.id,
      title: req.body.title,
      content: req.body.content
    },{
      new: true
    })
    .then((success_update) => {
      res.json(success_update)
    })
    .catch((err) => {
      console.log(err);
      res.json(err)
    })
}

let deleteNote = (req, res) => {
  Note
    .findOneAndRemove({
      id: req.body.id
    })
    .then((deleted_note) => {
      // console.log(deleted_note);
      User
        .findOneAndUpdate({
          id: deleted_note.userId
        }, {
          $pull: {
            noteId: deleted_note.id
          }
        },{
          new: true
        })
        .then((user_note_deleted) => {
          // console.log(user_note_deleted);
          console.log(`noteId in ${user_note_deleted.name} has deleted`);

          res.json(deleted_note)
        })
        .catch((err) => {
          console.log(err);
          res.json(err)
        })
    })
    .catch((err) => {
      console.log(err);
      res.json(err)
    })
}

export {
  getNoteById,
  addNewNote,
  editNote,
  deleteNote
}
