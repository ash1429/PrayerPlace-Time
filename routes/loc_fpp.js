var express = require("express");
var router = express.Router({ mergeParams: true });
Prayerplace = require('../models/prayer_place');

router.get("/", (req, res) => {
  res.render('location/findPp/loc_opts');
});



router.get("/find", (req, res) => {
  var current_url = req.originalUrl;
  res.render('location/findPp/loc_find', { current_url: current_url });

});

router.get("/gps", (req, res) => {
  var current_url = req.originalUrl;
  // console.log(current_url);

  res.render('location/findPp/loc_gps');

});

router.get("/find/confirm", (req, res) => {

  obj = { latitude: req.query.lat, longitude: req.query.lon };
  console.log(obj);

  res.render('location/findPp/loc_find_confirm', { obj: obj });
});

router.post("/show", (req, res) => {
  console.log("req.body");
  console.log(req.body);
  var obj = {
    'location.suburb': req.body.location.suburb,
    'location.city': req.body.location.city,
    'location.state': req.body.location.state,
    'location.country': req.body.location.country,
  };
  Prayerplace.find(obj, (err, pps) => {
    if (err) res.send(err);
    else {
      console.log(pps.length);
      console.log(pps);
      res.render("fpp/show", { pps: pps });


    }
  });
});

module.exports = router;