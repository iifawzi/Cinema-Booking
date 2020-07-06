const { Router } = require("express");
const router = Router();

// Routes:
router.get("/welcome", (req, res, next) => {
  res.json("Welcome, We are working!");
});


module.exports = router;