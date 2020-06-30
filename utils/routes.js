const { authRouter } = require("../components/auth/index");
const { Router } = require("express");
const router = Router();

// Routes:
router.get("/test", (req, res, next) => {
  res.json("jhdhjd");
});

router.use("/auth", authRouter);

module.exports = router;