var express = require("express");
var db = require("../db");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});

module.exports = router;
