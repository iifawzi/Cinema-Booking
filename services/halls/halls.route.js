const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const hallsController = require("./halls.controller");
const hallsSchemas = require("./halls.validation");
const router = express.Router();


router.post("/addHall", isAuth(), isAllowed(["cinema"]), validate(hallsSchemas.addHall,"body"), hallsController.add_hall);
router.post("/getHallsForMovie", validate(hallsSchemas.getHallsForMovie, "body"), hallsController.getHallsForMovie)
module.exports = router;