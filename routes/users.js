var express = require("express");
var router = express.Router();

var userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
// router.delete("/:id", userController.deleteSingleUser);
router.patch("/:id", userController.patchUser);
module.exports = router;
