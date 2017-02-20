var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//Modules
var form_of_drugs = require('./routes/drugmodule/form_of_drugs');
var prescription_types = require('./routes/drugmodule/prescription_type');
var drug_companies = require('./routes/drugmodule/drug_companies');
var drugs = require('./routes/drugmodule/drugs');
var user= require('./routes/usermodule/users');
var posts=require('./routes/postmodule/posts');
var relationships=require('./routes/usermodule/relationships');

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
app.use('/', index);
app.use('/users', users);
app.use('/form_of_drugs',form_of_drugs);
app.use('/prescription_type',prescription_types);
app.use('/drug_companies',drug_companies);
app.use('/drugs',drugs);
app.use('/users',user);
app.use('/post',posts);
app.use('/relationships',relationships);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
