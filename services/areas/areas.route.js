const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const areasController = require("./areas.controller");
const areasSchemas = require("./areas.validation");
const router = express.Router();

router.post("/addArea", isAuth(), isAllowed(['admin']), validate(areasSchemas.addArea, 'body'), areasController.addArea);

module.exports = router;