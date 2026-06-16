const express = require("express");

const {
  generateFinancialAdvice
} = require("../controllers/aiController");

const { protect } =
require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/financial-advice",
  protect,
  generateFinancialAdvice
);

module.exports = router;