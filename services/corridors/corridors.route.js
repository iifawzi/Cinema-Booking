const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const corridorsController = require("./corridors.controller");
const corridorsSchemas = require("./corridors.validation");
const router = express.Router();



module.exports = router;