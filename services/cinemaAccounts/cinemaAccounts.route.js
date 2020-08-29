const express = require("express");
const router = express.Router();
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");
const validate = require("../../helpers/validation");
const cinemaAccountsController = require("./cinemaAccounts.controller");
const cinemaAccountsSchemas = require("./cinemaAccounts.validation");


router.post("/addAccount",validate(cinemaAccountsSchemas.addAccount,'body'),cinemaAccountsController.addAccount);


module.exports = router;