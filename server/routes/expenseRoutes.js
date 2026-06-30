const express = require("express");

const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

const validate =
require("../middleware/validate");

const expenseSchema =
require("../validators/expenseValidator");

const router = express.Router();

router
  .route("/")
  .post(
    protect,
    validate(expenseSchema),
    addExpense
  )
  .get(
    protect,
    getExpenses
  );

  router
  .route("/:id")
  .put(
    protect,
    validate(expenseSchema),
    updateExpense
  )
  .delete(
    protect,
    deleteExpense
  );

module.exports = router;