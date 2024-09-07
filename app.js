var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./src/model/index'); //引入 routes下的index.js 並宣告為變數 indexRouter
var usersRouter = require('./src/server/routes/users');
var api = require('./src/server/routes/article.route');
var cors =require('cors');
const db = require("./src/model");
const initRoutes = require("./src/server/routes/web");
var app = express();

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
initRoutes(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //設定抓取public裡的靜態檔案
app.use(cors());

app.use('/', indexRouter); //將上面引入檔案路由設定
app.use('/users', usersRouter);
app.use('/api', api);
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
