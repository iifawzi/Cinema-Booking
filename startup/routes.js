const { Router } = require("express");
const router = Router();
const isAuth = require("../middlewares/is-auth");
const {usersRouter} = require("../services/users/index");
const {moviesRouter} = require("../services/movies");
const {cinemasRouter} = require("../services/cinemas");
const {adminsRouter} = require("../services/admins");
const isAllowed = require("../middlewares/is-allowed");
// Routes:
router.get("/welcome", isAuth(),isAllowed(["admin","moderator"]),(req, res) => {
    res.json("Welcome, We are working!");
});
router.use("/users", usersRouter);
router.use("/movies", moviesRouter);
router.use("/cinemas", cinemasRouter);
router.use("/admins", adminsRouter);


module.exports = router;