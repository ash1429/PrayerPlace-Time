var Prayerplace = require('./models/prayer_place');

var auth = {};

auth.user = function auth(req, res, next) {
  req.session.returnTo = req.originalUrl;
  if (req.user && req.isAuthenticated()){
    next();
  }
  else{
    res.redirect('/login');
  }
}


auth.ownership = function (req, res, next){
  req.session.returnTo = req.originalUrl;
  Prayerplace.findById(req.params.id_pp, (err, obj) => {
    if (err) res.send(err);
    else if (obj.provider.id) {
      if((obj.provider.id).equals(req.user._id))
        next();
      else {
        res.send("You are not Authorized");
      }
    }
    else {
      res.send("You are not Authorized");
    }
  })
};

auth.admin = function auth(req, res, next) {
  if (req.user && req.isAuthenticated() && req.user.admin) {
    next();
  }
  else {
    res.send('You are not authorized');
  }
};

auth.notUser = function auth(req, res, next) {
  if (!req.user && req.isUnauthenticated()) {
    next();
  }
  else {
    res.send('You are already authenticated');
  }
};

module.exports = auth;