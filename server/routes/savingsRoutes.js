const express = require("express");

const {
  createSavingsGoal,
  getSavingsGoals,
  updateSavingsGoal,
  deleteSavingsGoal
} = require("../controllers/savingsController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/* ========================= */
/* SAVINGS GOALS ROUTES */
/* ========================= */

router
  .route("/")
  .post(protect, createSavingsGoal)
  .get(protect, getSavingsGoals);

router
  .route("/:id")
  .put(protect, updateSavingsGoal)
  .delete(protect, deleteSavingsGoal);

module.exports = router;