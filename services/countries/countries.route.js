const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const countriesController = require("./countries.controller");
const countriesSchemas = require("./countries.validation");
const router = express.Router();

router.post("/addCountry", isAuth(), isAllowed(['admin']), validate(countriesSchemas.addCountry, 'body'), countriesController.addCountry);

module.exports = router;