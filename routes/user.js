var express = require("express");
var router = express.Router({ mergeParams: true });

router.get("/:id_user", (req, res) => {
  res.send("users page");
});


module.exports = router;