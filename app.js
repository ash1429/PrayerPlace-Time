//Load modules
var express = require('express'),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  session = require("express-session"),
  app = express();


  
// const url = 'mongodb://localhost:27017/pp';
// mongoose.connect(url, { useNewUrlParser: true }, function (err) {
//   if (!err) {
//     console.log("connected to db");
//   }
//   else {
//     console.log(err);
//   }
// });

const url = 'mongodb+srv://hola:hola@cluster0-wn6yj.mongodb.net/test?retryWrites=true';
mongoose.connect(url, { useNewUrlParser: true }, function (err) {
  if (!err) {
    console.log("connected to db");
  }
  else {
    console.log(err);
  }
});


//Load routers
var index = require('./routes/index');
var loc_fpt = require('./routes/loc_fpt');
var loc_cpp = require('./routes/loc_cpp');
var login = require('./routes/login');
var signup = require('./routes/signup');
var logout = require('./routes/logout');
var prayer_place = require('./routes/prayer_place');
var user = require('./routes/user');

//for checking authorization
var auth = require('./auth');

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
app.use('/signup', auth.notUser, signup);
app.use('/login', auth.notUser, login);
app.use('/logout', auth.user, logout);
app.use('/user', user);

app.use("/loc_fpt", loc_fpt);

app.use("/loc_cpp", auth.user, loc_cpp);
// app.use("/loc_cpp", loc_cpp);

app.use("/prayerplace", prayer_place);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server Has Started!");
});