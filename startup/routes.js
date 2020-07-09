const { Router } = require("express");
const router = Router();
const {usersRouter} = require("../services/users/index");
const isAuth = require("../middlewares/is-auth");
// Routes:
router.get("/welcome", isAuth(),(req, res) => {
    res.json("Welcome, We are working!");
});
router.use("/users", usersRouter);


module.exports = router;