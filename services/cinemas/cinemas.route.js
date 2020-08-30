const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const cinemasController = require("./cinemas.controller");
const cinemasSchemas = require("./cinemas.validation");
const router = express.Router();


router.post("/addCinema", isAuth(), isAllowed(["admin"]), validate(cinemasSchemas.addCinema,"body"), cinemasController.add_cinema);
router.post("/getCinemasForMovie", validate(cinemasSchemas.getCinemasForMovie,"body"), cinemasController.getCinemasForMovie);
router.patch("/toggleCinemaStatus", isAuth(), isAllowed(['admin']), validate(cinemasSchemas.toggleCinemaStatus, 'body'), cinemasController.toggleCinemaStatus)

module.exports = router;