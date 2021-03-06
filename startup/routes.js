const { Router } = require("express");
const router = Router();
const isAuth = require("../middlewares/is-auth");
const {usersRouter} = require("../services/users");
const {moviesRouter} = require("../services/movies");
const {cinemasRouter} = require("../services/cinemas");
const {adminsRouter} = require("../services/admins");
const {hallsRouter} = require("../services/halls");
const {slotsRouter} = require("../services/slots");
const {countriesRouter} = require("../services/countries");
const {areasRouter} = require("../services/areas");
const {lockedSeatsRouter} = require("../services/lockedSeats");
const {corridorsRouter} = require("../services/corridors");
const {ticketsRouter} = require("../services/tickets");
const {cinemaAccountsRouter} = require("../services/cinemaAccounts");
const isAllowed = require("../middlewares/is-allowed");
// Routes:
router.get("/welcome", isAuth(),isAllowed(["admin","moderator"]),(req, res) => {
    res.json("Welcome, We are working!");
});
router.get("/test",(req, res) => {
    res.json("Test, server's working!");
});
router.use("/users", usersRouter);
router.use("/movies", moviesRouter);
router.use("/cinemas", cinemasRouter);
router.use("/admins", adminsRouter);
router.use("/halls", hallsRouter);
router.use("/slots", slotsRouter);
router.use("/countries", countriesRouter);
router.use("/areas", areasRouter);
router.use("/lockedSeats", lockedSeatsRouter);
router.use("/corridors", corridorsRouter);
router.use("/tickets", ticketsRouter);
router.use("/cinemaAccounts",cinemaAccountsRouter);


module.exports = router;