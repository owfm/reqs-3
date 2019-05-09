var express = require("express");
var router = express.Router();
const passport = require("passport");
var schoolController = require("../controllers/schoolController");

const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", requireAuth, schoolController.getAllSchools);
router.get("/:id", requireAuth, schoolController.getSchoolById);
router.post("/", requireAuth, schoolController.postNewSchool);
router.delete("/:id", requireAuth, schoolController.deleteSingleSchool);
router.put("/:id", requireAuth, schoolController.patchSchool);
module.exports = router;
