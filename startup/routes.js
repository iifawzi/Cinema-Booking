const { Router } = require("express");
const router = Router();
const isAuth = require("../middlewares/is-auth");
const {usersRouter} = require("../services/users/index");
const { moviesRouter } = require("../services/movies");
// Routes:
router.get("/welcome", isAuth(),(req, res) => {
    res.json("Welcome, We are working!");
});
router.use("/users", usersRouter);
router.use("/movies", moviesRouter);


module.exports = router;