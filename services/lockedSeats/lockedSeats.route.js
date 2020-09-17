const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const lockedSeatsController = require("./lockedSeats.controller");
const lockedSeatsSchemas = require("./lockedSeats.validation");
const router = express.Router();

router.post("/lockSeats", isAuth(), isAllowed(['csuperadmin']), validate(lockedSeatsSchemas.lockSeats, 'body'), lockedSeatsController.lockSeats);

module.exports = router;