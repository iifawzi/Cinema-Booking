const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const slotsController = require("./slots.controller");
const slotsSchemas = require("./slots.validation");
const router = express.Router();


router.post("/addSlot", validate(slotsSchemas.addSlot,"body"), slotsController.add_slot);
router.patch("/toggleSlotStatus", isAuth(), isAllowed(['csuperadmin']), validate(slotsSchemas.toggleSlotStatus, 'body'), slotsController.toggleSlotStatus);
router.post("/getSlotSeats", validate(slotsSchemas.getSlotSeats, 'body'), slotsController.getSlotSeats);
router.post("/getSlots", isAuth(), isAllowed(['csuperadmin']),validate(slotsSchemas.getSlots,'body'),slotsController.getSlots);


module.exports = router;