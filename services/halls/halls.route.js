const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const hallsController = require("./halls.controller");
const hallsSchemas = require("./halls.validation");
const router = express.Router();


router.post("/addHall", validate(hallsSchemas.addHall,"body"), hallsController.add_hall);

module.exports = router;