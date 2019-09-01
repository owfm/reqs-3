var express = require("express");
var router = express.Router();
var passport = require("passport");

const multer = require("multer");
const upload = multer({ dest: "tmp/csv/" });

const requireAuth = passport.authenticate("jwt", { session: false });

const uploadController = require("../controllers/uploadController");

router.post(
  "/timetable",
  upload.single("file"),
  requireAuth,
  uploadController.timetable
);
router.post(
  "/createusers",
  upload.single("file"),
  requireAuth,
  uploadController.createusers
);
module.exports = router;
