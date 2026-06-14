const express = require("express");

const {
  createRecurringExpense,
  getRecurringExpenses,
  deleteRecurringExpense
} = require("../controllers/recurringExpenseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(protect, createRecurringExpense)
  .get(protect, getRecurringExpenses);

router.route("/:id").delete(protect, deleteRecurringExpense);

module.exports = router;