const express = require("express");
const router = express.Router();
const validate = require("../../helpers/validation");
const usersSchema = require("./users.validation");
const usersController = require("./users.controller");



router.post("/signup",validate(usersSchema.signup,"body") ,usersController.signup);
router.post("/signin",validate(usersSchema.signin,"body") ,usersController.signin);
router.post("/signin",validate(usersSchema.signin,"body") ,usersController.signin);
router.post("/refresh_token",validate(usersSchema.refresh_token,"body") ,usersController.refresh_userToken);
module.exports = router;