import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import routeUsers from './routes/routes.api.users'

const app = express()

mongoose.connect('mongodb://localhost/db_personal_note')
mongoose.Promise = global.Promise

app.use(cors())
app.use(logger())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/users', routeUsers)

app.listen(3000, (err) => {
  if(err){
    console.log(err);
  }else{
    console.log(`server is running in port 3000`);
  }
})
