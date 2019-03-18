var express = require("express");
var router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  // var url = req.originalUrl;
  // console.log(url);
  var current_url = req.originalUrl.substr(0, req.originalUrl.indexOf('?'));
  // console.log(url);
  res.render('location/createPp/loc_opts', { current_url: current_url });
});


module.exports = router;