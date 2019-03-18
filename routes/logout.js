var express = require('express');
var router = express.Router();
var auth = require('../auth');


router.get('/',(req, res) => {
  if (req.user) {
    console.log("Successfully Logged out as: " + req.user.username);
    req.session.destroy();
    res.clearCookie('session-id');
    req.logout();

    res.redirect('/');
  }
  else {
    res.send("You are not logged in");
  }
});

module.exports = router;