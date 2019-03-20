var express = require("express");
var router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  res.render('location/findPt/loc_opts');
});

router.get("/loc_search_fpt", (req, res) => {
  var current_url = req.originalUrl;
  res.render('location/findPt/loc_search', { current_url: current_url });

});

router.get("/loc_search_fpt/show_pt", (req, res) => {
  var obj = req.query;
  // console.log(obj);
    
  res.render('location/findPt/loc_show',{ obj: obj});

});

router.get("/loc_gps_fpt", (req, res) => {
  // var current_url = req.originalUrl;
  // console.log(current_url);
  
  res.render('location/findPt/loc_gps');

});

router.get("/loc_gps_fpt/show_pt", (req, res) => {
  var obj = req.query;
  // console.log(obj);
  res.render('location/findPt/loc_show', { obj: obj });
});

module.exports = router;