var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
	res.setHeader("Content-Type", "application/json");
	res.end(JSON.stringify({ message: "This came from users route!" }));
});

module.exports = router;
