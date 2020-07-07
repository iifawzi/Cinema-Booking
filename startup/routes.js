const { Router } = require("express");
const router = Router();
const {usersRouter} = require("../components/users/index");
// Routes:
router.get("/welcome", (req, res) => {
    res.json("Welcome, We are working!");
});
router.use("/users", usersRouter);


module.exports = router;