const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const connectFlash = require('connect-flash');
const uuid = require('uuid');
const logger = require('./tools/logging');

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const jsonRouter = require('./routes/json');
const apiRouter = {
  v1: require('./routes/api/v1/api')
};

// middlewares
const {header, validationResult} = require('express-validator');
const validation = require('./middlewares/validation');
const statistics = require('./middlewares/stastics');
const userValidation = require('./middlewares/userValidation');

// tools
const response = require('./tools/response');
const {setUserLogPath} = require('./tools/common');

const app = express();

require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET_SALT));
app.use(expressSession({
  secret           : process.env.SECRET_SALT,
  cookie           : {
    maxAge: 4000000
  },
  resave           : false,
  saveUninitialized: false,
}));
app.use(connectFlash());
app.use(express.static(path.join(__dirname, 'public')));

// set request uuid && default log path
app.use((req, res, next) => {
  req.uuid = uuid.v4();
  req.logPath = setUserLogPath(req);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// temp json router
app.use('/json', jsonRouter);

// api router
app.use('/api/v1',
  validation('v1'),
  userValidation(),
  statistics(),
  apiRouter.v1
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  response.notFound(req, res);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  response.error(req, res, err);
});

module.exports = app;
