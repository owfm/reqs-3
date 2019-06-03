var express = require("express");
var router = express.Router();
var lessonController = require("../controllers/lessonController");

// const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", lessonController.getAllLessons);
router.get("/:id", lessonController.getSingleLesson);
router.delete("/", lessonController.deleteAllLessons);
router.delete("/:id", lessonController.deleteSingleLesson);

module.exports = router;
