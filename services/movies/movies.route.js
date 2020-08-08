const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const validate = require("../../helpers/validation");
const moviesController = require("./movies.controller");
const moviesSchema = require("./movies.validation");
const isAllowed = require("../../middlewares/is-allowed");
const router = express.Router();



router.post("/addMovie", isAuth(), isAllowed(["admin"]), validate(moviesSchema.addMovie,"body"), moviesController.addMovie);
router.post("/deleteMovie", validate(moviesSchema.deleteMovie,"body"), moviesController.deleteMovie); // will be deleted later
router.post("/getMoviesInCity", validate(moviesSchema.moviesInCity,"body"), moviesController.moviesInCity);

module.exports = router;