var express = require("express");
var router = express.Router({ mergeParams: true });
var auth = require('../auth');
var Prayerplace = require('../models/prayer_place');


router.post("/", auth.user, (req, res) => {

  // console.log(req.user);
  // console.log(req.body);

  var location = req.body.location;
  var lat = req.body.lat;
  var lon = req.body.lon;
  
  var fajr = req.body.fajr;
  var dhuhr = req.body.dhuhr;
  var asr = req.body.asr;
  var maghrib = req.body.maghrib;
  var isha = req.body.isha;
  var jumma = req.body.jumma;

  var privilege = req.body.privilege;

  var provider = {
    id: req.user._id,
    username: req.user.username,
    email: req.user.email
  }
  
  var newPrayerPlace = {location, lat, lon, fajr, dhuhr, asr, maghrib, isha, jumma, privilege, provider};
  
  Prayerplace.findOne({ 'location': location }, (err, ppData) => {
    if (err) console.log(err);
    else if(ppData){
      res.send("already a prayer place by this name and place exist");
    }
    else{
      Prayerplace.create(newPrayerPlace, (err, ppData) => {
        if (err) console.log(err);
        else {
          res.redirect('/prayerplace/' + ppData._id);
        }
      });
    }
  });

});

router.get("/:id_pp", (req, res) => {
  req.session.returnTo = req.originalUrl;
  Prayerplace.findById(req.params.id_pp, (err, ppData) => {
    if (err) console.log(err);
    else {
      // console.log(ppData);
      
      res.render('pp/show', { obj: ppData });
    }

  });
});

router.get("/:id_pp/edit", auth.user, auth.ownership, (req, res) => {
  Prayerplace.findById(req.params.id_pp, (err, obj)=>{
    if(err) res.send(err);
    else{
      res.render("pp/edit", {obj: obj});
    }
  });
});

router.post("/:id_pp/edit/posting", auth.user, auth.ownership, (req, res) => {
  // console.log(req.body);
  
  var location = req.body.location;
  var lat = req.body.lat;
  var lon = req.body.lon;

  var fajr = req.body.fajr;
  var dhuhr = req.body.dhuhr;
  var asr = req.body.asr;
  var maghrib = req.body.maghrib;
  var isha = req.body.isha;
  var jumma = req.body.jumma;

  var privilege = req.body.privilege;

  var provider = {
    id: req.user._id,
    username: req.user.username,
    email: req.user.email
  }

  var editedPrayerPlace = { location, lat, lon, fajr, dhuhr, asr, maghrib, isha, jumma, privilege, provider };
  console.log("Posted Edited Data\n\n");
  console.log(editedPrayerPlace);
  console.log("\n\n");
  
  console.log(req.params.id_pp);
  
  Prayerplace.findOneAndUpdate({ '_id': req.params.id_pp}, editedPrayerPlace, (err, data)=>{
    if(err) res.send(err);
    else{
      console.log("Edited Data");
      console.log(data);
      res.redirect('/prayerplace/' + req.params.id_pp);
      
    }
  });


});

module.exports = router;