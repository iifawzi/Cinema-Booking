const express = require("express");
const router = express.Router();
const validate = require("../../helpers/validation");
const usersSchema = require("./users.validation");
const usersController = require("./users.controller");
const isAuth = require("../../middlewares/is-auth");



router.post("/signup",isAuth(),validate(usersSchema.signup,"body") ,usersController.signup);
module.exports = router;