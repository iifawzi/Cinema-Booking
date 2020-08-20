const express = require("express");
const router = express.Router();
const validate = require("../../helpers/validation");
const ticketsSchema = require("./tickets.validation");
const ticketsController = require("./tickets.controller");
const isAuth = require("../../middlewares/is-auth");
const isAllowed = require("../../middlewares/is-allowed");


router.post("/addTicket", isAuth(), isAllowed(["user"]) , validate(ticketsSchema.addTicket,"body") , ticketsController.addTicket);
module.exports = router;