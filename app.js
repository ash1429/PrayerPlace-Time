//Load modules
var express = require('express'),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  session = require("express-session"),
  app = express();

//Load routers
var index = require('./routes/index');
var loc_fpt = require('./routes/loc_fpt');
var loc_cpp = require('./routes/loc_cpp');
var login = require('./routes/login');
var signup = require('./routes/signup');
var logout = require('./routes/logout');

//for checking authorization
var auth = require('./auth');

//set up db
const url = 'mongodb://localhost:27017/prayerPlace';
mongoose.connect(url, { useNewUrlParser: true }, function (err) {
  if (!err) {
    console.log("connected to db");
  }
  else {
    console.log(err);
  }
});

//authentication using passport boiler plate
var passport = require('passport');
var authenticate = require('./authenticate');
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());



//set up body parser, view engine, public directory
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//to check a user is logged in or not
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//routing routers
app.use("/", index);
app.use("/loc_fpt", loc_fpt);
app.use("/loc_cpp", loc_cpp);
app.use('/signup', auth.notUser, signup);
app.use('/login', auth.notUser, login);
app.use('/logout', auth.user, logout);

app.listen(3000, () => {
  console.log("Server is running");
});