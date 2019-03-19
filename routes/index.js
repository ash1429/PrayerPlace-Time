var express = require("express");
var router = express.Router({ mergeParams: true });

router.get("/", (req,res)=>{
  res.render('index');
});

router.post("/test", (req,res)=>{
  console.log(req.body);
  
  res.send("testing");
});

module.exports = router;