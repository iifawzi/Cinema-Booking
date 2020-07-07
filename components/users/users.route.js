const express = require("express");
const validate = require("../../helpers/validation");
const usersSchema = require("./users.validation");
const router = express.Router();
const usersController = require("./users.controller");



router.post("/signup",validate(usersSchema.signup,"body") ,usersController.signup);
module.exports = router;