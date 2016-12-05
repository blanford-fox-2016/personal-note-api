'use strict'

//==========CONFIG==========

require('dotenv').config()

//==========GRAB DEPENDENCIES==========

const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),

    //Initiate Express
    app = express(),
    router = express.Router(),

    //Data and modeling
    mongoose = require('mongoose'),
    
    //JSONWebToken
    jwt = require('jsonwebtoken'),

    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,

    //App modules
    apiUsers = require('./routes/api.users'),
    apiNotes = require('./routes/api.notes'),

    //model
    User = require('./models/users')

//==========APP CONFIGURATION==========

//Express
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

//MongoDB
mongoose.Promise = global.Promise // native Node.js promise
mongoose.connect(process.env.MONGODB_URI)

//Passport Configuration
passport.use(new LocalStrategy(User.authenticate()))

//==========REGISTER ROUTES==========

app.use('/api', apiUsers)
app.use('/api', apiNotes)

//==========RUN THE APP==========

const host = process.env.HOST || "localhost",
    port = process.env.PORT || "3000"

app.listen(port, host, (err) => {
    if (err) console.log(err)
    console.log(`Server is running on ${host}:${port}`)
})