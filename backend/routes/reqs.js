var express = require("express");
var router = express.Router();

var Req = require("../models/req");

/* GET users listing. */
// router.get("/", function(req, res, next) {
// 	res.setHeader("Content-Type", "application/json");
// 	res.send(JSON.stringify({ message: "This came from reqs route!" }));
// });

router.get("/", function(req, res) {
	Req.find({}).exec(function(err, reqs) {
		if (err) {
			res.send({ message: "An error occured." });
		} else {
			console.log(reqs);
			res.send(JSON.stringify({ data: reqs, message: "Reqs collected." }));
		}
	});
});

router.post("/", function(request, response) {
	var newReq = new Req();
	newReq.title = request.body.title;
	newReq.equipment = request.body.equipment;
	newReq.notes = request.body.notes;
	newReq.save(function(err, req) {
		if (err) {
			res.send({ data: null, message: "Error saving req!" });
		} else {
			console.log(req);
			response.send({
				data: req,
				message: "Successfully saved."
			});
		}
	});
});

module.exports = router;
