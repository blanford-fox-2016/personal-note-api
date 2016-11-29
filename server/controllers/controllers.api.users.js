import User from '../models/models.api.users'

let getAllUsers = (req, res) => {
  User.find()
    .populate('noteId')
    .then((all_Users) => {
      res.json(all_Users)
    })
    .catch((err) => {
      console.log(err);
      res.json(err)
    })
}

let getUserById = (req, res) => {
  User.findOne({
    id: req.params.id
  })
  .populate('noteId')
  .then((data_User) => {
    res.json(data_User)
  })
  .catch((err) => {
    res.json(err)
    console.log(err);
  })
}

let addNewUser = (req, res) => {
  let newUser = new User({
    name: req.body.name,
    "age" : req.body.age,
    "email" : req.body.email
  })

  newUser.id = newUser._id

  newUser.save((err) => {
    if(err){
      console.log(err)
      res.json(err)
    }else{
      res.json(newUser)
    }
  })
}

let editUser = (req, res) => {
  User
    .findOneAndUpdate({
      id: req.body.id
    },{
      name: req.body.name,
      age: req.body.age,
      email: req.body.email
    },{
      new: true
    })
    .then((edited_user) => {
      res.json(edited_user)
    })
    .catch((err) => {
      res.json(err)
      console.log(err);
    })
}

let deleteUser = (req, res) => {
  User
    .findOneAndRemove({
      id: req.body.id
    })
    .then((deleted_User) => {
      res.json(deleted_User)
    })
    .catch((err) => {
      console.log(err);
      res.json(err)
    })
}

let deleteAllUsers = (req, res) => {
  User.remove()
    .then((deleted_all) => {
      res.json(deleted_all)
    })
    .catch((err) => {
      console.log(err);
      res.json(err)
    })
}

export {
  getAllUsers,
  getUserById,
  addNewUser,
  editUser,
  deleteUser,
  deleteAllUsers
}
