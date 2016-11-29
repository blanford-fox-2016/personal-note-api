import User from '../models/models.api.users'

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

export { addNewUser }
