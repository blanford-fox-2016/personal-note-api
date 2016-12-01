'use strict'
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const Users = require('./models/Users');

const routes = require('./routes/index');
const auth = require('./routes/auth');
// const apiData = require('./routes/apiData');
// const apiDataDate = require('./routes/apiDataDate');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const cors = require('cors');
const jwt = require('express-jwt');

const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/personal-note', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database connected!');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(jwt({
  secret: 'secretlalala',
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}));

passport.use(new LocalStrategy(Users.authenticate()));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/auth', auth);
// app.use('/api/data', apiData);
// app.use('/api/datadate', apiDataDate);

passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());


// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


module.exports = app;
