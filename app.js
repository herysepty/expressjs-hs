var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// hs start
//Databases mysql
var mysql = require('mysql');
/**
 * This middleware provides a consistent API
 * for MySQL connections during request/response life cycle
 */
var conn  = require('express-myconnection');
/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */
var config = require('./config')
var db_conf = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db
}
app.use(conn(mysql, db_conf, 'pool'));

//end hs
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/users', usersRouter);
// HS api endpoint
app.use('/api/v1/users', usersRouter.list);

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
//hs listen
app.listen(3000, function(){
    console.log('Server running at port 3000: http://127.0.0.1:3000')
})
module.exports = app;
