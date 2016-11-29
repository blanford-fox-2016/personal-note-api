import User from '../models/models.api.users'

let getAllUsers = (req, res) => {
  User.find((err, all_Users) => {
    if(err){
      res.json(err)
      console.log(err);
    }else{
      res.json(all_Users)
    }
  })
}

let getUserById = (req, res) => {
  User.findOne({
    id: req.params.id
  })
  // .populate('noteId')
  // .exec()
  .then((data_User) => {
    console.log(data_User);
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

let deleteAllUsers = (req, res) => {
  User.remove()
    .then((deleted_all) => {
      res.json(deleted_all)
    })
    .catch((err) => {
      res.json(err)
      console.log(err);
    })
}

export { getAllUsers, getUserById, addNewUser, deleteAllUsers }
