const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const hallsController = require("./halls.controller");
const hallsSchemas = require("./halls.validation");
const router = express.Router();


router.post("/addHall", isAuth(), isAllowed(["csuperadmin"]), validate(hallsSchemas.addHall,"body"), hallsController.add_hall);
router.patch("/toggleHallStatus", isAuth(), isAllowed(['csuperadmin']), validate(hallsSchemas.toggleHallStatus, 'body'), hallsController.toggleHallStatus);
router.delete("/deleteHall", isAuth(), isAllowed(['csuperadmin']), validate(hallsSchemas.deleteHall,"body"), hallsController.deleteHall)

module.exports = router;