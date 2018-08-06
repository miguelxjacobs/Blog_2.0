var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Views
let routes = [
  require('./routes/index'),
  require('./routes/archive'),
  require('./routes/delete'),
  require('./routes/edit'),
  require('./routes/more'),
  require('./routes/new'),
  require('./routes/signIn'),
  require('./routes/signUp'),
  require('./routes/users')
];

// Linking database
app.locals.Posts = require('./db.json');

// SignIn page
app.locals.userID = "";
app.locals.user = "";

// Enable changes for logged in users ONLY
app.locals.signedIn = false;
app.locals.signedError = "";
app.locals.registeredError = "";

let Users = 0;

for(let i = 0; i < Users.length; i++) {
  if(Users[i].loggedIn == true) {

    app.locals.userID = Users[i].id;
    app.locals.user = Users[i].client;
    app.locals.signedIn = true;
  }
}

// /* CHANGED DEFAULT PORT */
// app.listen(8000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/************ DEFAULT ************/
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// Custom routes
app.use('/', routes[0]);
app.use('/archive', routes[1]);
app.use('/delete', routes[2]);
app.use('/edit', routes[3]);
app.use('/more', routes[4]);
app.use('/new', routes[5]);
app.use('/signIn', routes[6]);
app.use('/signUp', routes[7]);
app.use('/users', routes[8]);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
