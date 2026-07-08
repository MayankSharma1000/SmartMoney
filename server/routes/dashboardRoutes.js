const express = require("express");

const {
  buildDashboard
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* ========================= */
/* DASHBOARD SUMMARY */
/* ========================= */

router.get("/summary", protect, buildDashboard);

module.exports = router;
