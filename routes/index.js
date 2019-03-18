var express = require("express");
var router = express.Router({ mergeParams: true });

router.get("/", (req,res)=>{
  res.render('index');
});

router.get("/login", (req,res)=>{
  res.render('login');
});

router.get("/register", (req,res)=>{
  res.render('register');
});

module.exports = router;