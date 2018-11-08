//app.js
const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user.router'); // Imports routes for the products
const app = express();

//const path = require('path');
const cookieParser = require('cookie-parser');
//const expressHandlebars = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

require('./config/passport');

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/fitTrainer';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/fitTrainer', user);

app.use(cookieParser());
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'codeworkrsecret',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success');
  res.locals.error_messages = req.flash('error');
  res.locals.isAuthenticated = req.user ? true : false;
  next();
});


let port = 1235;
app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});
