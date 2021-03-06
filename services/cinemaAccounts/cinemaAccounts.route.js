const express = require("express");
const router = express.Router();
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const cinemaAccountsController = require("./cinemaAccounts.controller");
const cinemaAccountsSchemas = require("./cinemaAccounts.validation");


router.post("/addAccount",isAuth(),isAllowed(["csuperadmin","admin"]),validate(cinemaAccountsSchemas.addAccount,'body'),cinemaAccountsController.addAccount);
router.post("/signinAccount", validate(cinemaAccountsSchemas.signin,"body"), cinemaAccountsController.signin);
router.post("/refreshToken",validate(cinemaAccountsSchemas.refreshToken,"body") ,cinemaAccountsController.refreshToken);


module.exports = router;