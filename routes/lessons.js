var express = require("express");
var router = express.Router();
var lessonController = require("../controllers/lessonController");
var passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", requireAuth, lessonController.getAllLessons);
router.get("/:id", requireAuth, lessonController.getSingleLesson);
router.delete("/", requireAuth, lessonController.deleteAllLessons);
router.delete("/:id", requireAuth, lessonController.deleteSingleLesson);

module.exports = router;
