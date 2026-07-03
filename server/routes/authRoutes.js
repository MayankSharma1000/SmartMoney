const express = require("express");

const {
  registerUser,
  loginUser,
  completeOnboarding
} = require("../controllers/authController");

const {
  protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/onboarding", protect, completeOnboarding);

module.exports = router;