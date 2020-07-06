const express = require("express");
const router = express.Router();
const usersController = require("./users.controller");



router.get("/signup", usersController.signup);




module.exports = router;