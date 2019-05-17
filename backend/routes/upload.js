var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "tmp/csv/" });

const uploadController = require("../controllers/uploadController");

router.post("/timetable", upload.single("file"), uploadController.timetable);

module.exports = router;
