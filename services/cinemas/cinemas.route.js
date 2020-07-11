const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const cinemasController = require("./cinemas.controller");
const cinemasSchemas = require("./cinemas.validation");
const router = express.Router();


router.post("/add", isAuth(), isAllowed(["user"]), validate(cinemasSchemas.addCinema,"body"), cinemasController.add_cinema);

module.exports = router;