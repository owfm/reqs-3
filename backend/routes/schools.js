var express = require("express");
var router = express.Router();
const passport = require("passport");
var schoolController = require("../controllers/schoolController");

const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", schoolController.getAllSchools);
router.get("/:id", schoolController.getSchoolById);
router.post("/", schoolController.postNewSchool);
router.delete("/:id", schoolController.deleteSingleSchool);

router.delete("/", schoolController.deleteAllSchools);
router.patch("/:id", schoolController.patchSchool);

router.put("/:id", schoolController.patchSchool);
module.exports = router;
