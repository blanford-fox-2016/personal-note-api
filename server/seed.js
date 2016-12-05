
const models = require('./models')
const User = models.User
const Note = models.Note

for(var i = 0; i < 5; i++) {
  User.create({
      TempUserId: Date.now().toString(),
      name: `name ${i+1}`,
      age: 11
  }).then((data) => {
      Note.create({
          TempNoteId: Date.now().toString(),
          title: `note ${i+1}`,
          content: `content ${i+1}`,
          UserId: data.id
      }).then((data) => {
          console.log(data);
      })
  })
}
