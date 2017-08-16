var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

//Modules
var blood_types = require('./routes/generalhealthmodule/blood_types');
var drug_companies = require('./routes/drugmodule/drug_companies');
var drugs = require('./routes/drugmodule/drugs');
var form_of_drugs = require('./routes/drugmodule/form_of_drugs');
var hospitals = require('./routes/hospitalmodule/hospitals');
var prescription_types = require('./routes/drugmodule/prescription_type');
var user = require('./routes/usermodule/users');
var patients = require('./routes/usermodule/patients');
var posts = require('./routes/postmodule/posts');
var relationships = require('./routes/usermodule/relationships');
var treatments = require('./routes/treatmentmodule/treatments');
var user_disease_history = require('./routes/generalhealthmodule/user_disease_history');
var user_drug_usage_history = require('./routes/generalhealthmodule/user_drug_usage_history');
var user_treatment_history = require('./routes/generalhealthmodule/user_treatment_history');
var diseases = require('./routes/diseasemodule/diseases');
var image_input = require('./routes/imagemodule/image_input');
var message = require('./routes/messagemodule/message');
var conversation = require('./routes/messagemodule/conversation');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/drugModule', drug_companies);
app.use('/drugModule', drugs);
app.use('/drugModule', form_of_drugs);
app.use('/drugModule', prescription_types);
app.use('/diseaseModule', diseases);
app.use('/generalHealthModule', blood_types);
app.use('/generalHealthModule', user_disease_history);
app.use('/generalHealthModule', user_drug_usage_history);
app.use('/generalHealthModule',user_treatment_history);
app.use('/hospitalModule', hospitals);
app.use('/treatmentModule', treatments);
app.use('/userModule', user);
app.use('/userModule', patients);
app.use('/userModule', relationships);
app.use('/postModule', posts);
app.use('/imageModule', image_input);
app.use('/messageModule', message);
app.use('/messageModule', conversation);

app.use('/images', express.static(path.join(__dirname, 'uploads')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
