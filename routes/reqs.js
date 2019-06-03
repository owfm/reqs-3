var express = require("express");
var router = express.Router();

var reqsController = require("../controllers/reqsController");

router.get("/", reqsController.getAllReqs);
router.get("/:id", reqsController.getReqById);
router.post("/", reqsController.postNewReq);
router.delete("/:id", reqsController.deleteSingleReq);
router.delete("/", reqsController.deleteAllReqs);

router.put("/:id", reqsController.patchReq);
module.exports = router;
