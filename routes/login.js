var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', passport.authenticate('local'), (req, res) => {
  if (!req.user.admin && req.user) {
    res.redirect(req.session.returnTo || ('/user/' + req.user._id) || '/');
    delete req.session.returnTo; 
  }
  else if (req.user.admin) {
    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }
});


module.exports = router;