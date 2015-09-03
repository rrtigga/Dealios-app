var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//connect to Mongo
mongoose.connect('mongodb://localhost/Dealios-app');

// grab the user model
var User = require('./models/user.js');



//successfully registers the user data POST
app.post('/registerUser', function(req, res){
  new User({
    username    : req.body.username,
    email_address: req.body.email,
    password   : req.body.password        
  }).save(function(err, doc){
    if(err) res.json(err);
    else{  res.send('Successfully inserted!');
    console.log("Successfully inserted");


  }
  });
});
//=====
app.get('/test', function(req, res){
  // get all the users
  User.find({}, function(err, users) {
    if (err) throw err;

    // object of all the users
    console.log(users);
  });
});


app.post('/view', function(req,res){
  
  User.findOne({username:req.body.loginUser}, function(err, founduser) {
    if (err) 
     // no user found, create one
      throw err; 
    else
        if (founduser.password == req.body.loginPassword)  // cool, user confirmed 
          res.send('Successfully logged in!');
        else
          res.send('You do not have an account');
  });

});

//====================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
