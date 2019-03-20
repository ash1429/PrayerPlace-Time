var express = require("express");
var router = express.Router({ mergeParams: true });
const url = require('url');

router.get("/", (req, res) => {

  // req.session.returnTo = req.originalUrl;
  
  // if(req.isAuthenticated()){
    var current_url = req.originalUrl.substr(0, req.originalUrl.indexOf('?'));
    res.render('location/createPp/loc_opts');
  // }
  // else{
    // res.redirect('/login');
  // }
});

router.get("/gps", (req, res) => {
  var current_url = req.originalUrl;
  // console.log(current_url);

  res.render('location/createPp/loc_gps');

});

router.post("/gps/new", (req, res) => {
  // console.log(req.body);
  obj = req.body;
    
  res.render('pp/new', {obj: obj});
});


module.exports = router;