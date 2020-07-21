const express = require("express");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const adminsController = require("./admins.controller");
const adminsSchemas = require("./admins.validation");
const router = express.Router();


router.post("/addAdmin", isAuth(), isAllowed(["admin"]), validate(adminsSchemas.addAdmin,"body"), adminsController.add_admin);
router.post("/signinAdmin", validate(adminsSchemas.signin,"body"), adminsController.signin)

module.exports = router;