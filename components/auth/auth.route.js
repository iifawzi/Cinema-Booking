const {Router} = require("express");
const authController = require("./auth.controller");
const router = Router();





router.get("/signin", authController.signIn);


module.exports = router;