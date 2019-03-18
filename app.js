//Load modules
var express = require('express'),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  app = express();

//Load routers

var index = require('./routes/index');
var loc_fpt = require('./routes/loc_fpt');
var loc_cpp = require('./routes/loc_cpp');

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

app.listen(3000, () => {
  console.log("Server is running");
});