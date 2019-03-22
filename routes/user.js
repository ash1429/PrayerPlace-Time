var express = require("express");
var router = express.Router({ mergeParams: true });
var User = require('../models/users');
var Prayerplace = require('../models/prayer_place');

router.get("/:id_user", (req, res) => {
  
  // console.log();
  // if ((req.user._id).equals(req.params.id_user)){
    User.findById(req.params.id_user, (err, foundUser)=>{
  
      if(err) res.send(err);
      else{
        Prayerplace.find({'provider.id': req.params.id_user}, (err, foundPP)=>{
          if(err) res.send(err);
          else{
            var obj = {user: foundUser, pp: foundPP};
            // console.log("length: ", obj.pp.length);
            // console.log("obj.pp: ", obj.pp);
            // console.log(obj);
            res.render('user', {obj: obj})
          }
        });
      }
    });
  // }
/*   else{
    res.send("You are not authorized");
  }  */
});



module.exports = router;