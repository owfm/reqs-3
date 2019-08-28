var express = require("express");
var router = express.Router();
var passport = require("passport");

var userController = require("../controllers/userController");

const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
// router.delete("/:id", userController.deleteSingleUser);
router.patch("/:id", userController.patchUser);
module.exports = router;
