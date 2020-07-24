const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const slotsController = require("./slots.controller");
const slotsSchemas = require("./slots.validation");
const router = express.Router();


router.post("/addSlot", isAuth(), isAllowed(["cinema"]), validate(slotsSchemas.addSlot,"body"), slotsController.add_slot);

module.exports = router;