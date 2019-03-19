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