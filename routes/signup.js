var express = require('express');
var router = express.Router();
var User = require('../models/users');
var passport = require('passport');


router.get('/', (req, res, next) => {
  res.render('signup');
});

router.post('/', (req, res, next) => {
  User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, (err, user) => {
    if (err) { res.send(err.message); }
    else {
      passport.authenticate("local")(req, res, () => {
        if (user.username === 'admin') {
          user.admin = true;
          user.save((err, user) => {
            if (err) { res.send(err); }
            else {
              // console.log("Successfully signed up as: " + user.username);
              res.redirect('/admin');
            }
          });
        }
        else if (!user.admin && user.username) {
          // console.log("Successfully signed up as: " + user.username);
          res.redirect(req.session.returnTo || '/');
          delete req.session.returnTo;        
        }
        else {
          res.send('something went wrong');
        }
      });
    }
  });
});


module.exports = router;