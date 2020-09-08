const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const lockedSeatsController = require("./lockedSeats.controller");
const lockedSeatsSchemas = require("./lockedSeats.validation");
const router = express.Router();

router.post("/lockSeat", isAuth(), isAllowed(['csuperadmin']), validate(lockedSeatsSchemas.lockSeat, 'body'), lockedSeatsController.lockSeat);

module.exports = router;