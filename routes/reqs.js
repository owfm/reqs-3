var express = require("express");
var router = express.Router();
var passport = require("passport");

var reqsController = require("../controllers/reqsController");

const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", reqsController.getAllReqs);
router.get("/:id", reqsController.getReqById);
router.post("/", reqsController.postNewReq);
router.delete("/:id", reqsController.deleteSingleReq);
// TODO delete this route
router.delete("/", reqsController.deleteAllReqs);

router.put("/:id", reqsController.patchReq);
module.exports = router;
