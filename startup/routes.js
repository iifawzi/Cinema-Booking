const { Router } = require("express");
const router = Router();
const {usersRouter} = require("../services/users/index");
// Routes:
router.get("/welcome", (req, res) => {
    res.json("Welcome, We are working!");
});
router.use("/users", usersRouter);


module.exports = router;