var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig  = require('swig');
var consolidate = require('consolidate')

var routes = require('./routes/index');
var users = require('./routes/users');

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/math2');
var db = mongoose.connection
db.on('error', function (err) {
  console.log('connection error', err);
});
db.once('open', function () {
  console.log('connected.');
});


var app = express();

// view engine setup
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.engine('.html', consolidate.swig);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'))
app.use("/public", express.static(path.join(__dirname, 'public')));

// app.use(function(req, res, next){
//   console.log('auth!!!!!!!!!')
//   console.log('req', req.cookies, 'if req.cookies', req.cookies.user ? 1 : 0)
//   console.log('RES!!!!!!!!!!!')
//   console.log('res.req.cookies',res.req.cookies.user)
//   // for(key in res.req){
//   //   console.log(key)
//   // }
//   console.log('url', req.url.split('/')[1])
//   var need_auth = {
//       '/' : 1,
//       '/qwe' : 1
//   }
//   if(!(req.cookies.user || res.req.cookies.user) && need_auth[req.url]){
//     console.log('need_login')
//     res.redirect('/login?next=' + req.url)
//     // res.render('login', {title: 'Войдите под своим именем'});
//     console.log('res!!!!!!!!!!!!!!!!!!!!!', req.url.split('/')[1])
//   }
//   else{
//     console.log('without auth', req.url, 'need_auth[req.url]', need_auth[req.url])
//     next()
//   }
//
// })
app.use('/', routes);
app.use('/users', users);

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
