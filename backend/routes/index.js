var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/test", function(req, res, next) {
  console.log("hit index route.");
  res.set("Content-Type", "text/html");
  res.send("Test from route");
});

module.exports = router;
