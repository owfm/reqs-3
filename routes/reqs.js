var express = require("express");
var router = express.Router();
var passport = require("passport");

var reqsController = require("../controllers/reqsController");

const requireAuth = passport.authenticate("local", { session: false });

router.get("/", reqsController.getAllReqs);
router.get("/:id", requireAuth, reqsController.getReqById);
router.post("/", requireAuth, reqsController.postNewReq);
router.delete("/:id", requireAuth, reqsController.deleteSingleReq);
// TODO delete this route
router.delete("/", requireAuth, reqsController.deleteAllReqs);

router.put("/:id", requireAuth, reqsController.patchReq);
module.exports = router;
