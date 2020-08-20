const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const corridorsController = require("./corridors.controller");
const corridorsSchemas = require("./corridors.validation");
const router = express.Router();

router.post("/addCorridor", isAuth(), isAllowed(['cinema']), validate(corridorsSchemas.addCorridor, 'body'), corridorsController.addCorridor);

module.exports = router;