const Expense = require("../models/Expense");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

/* ========================= */
/* ADD EXPENSE */
/* ========================= */
const addExpense = asyncHandler(async (req, res) => {
    const {
      title,
      category,
      amount,
      date,
      note,
      paymentMethod
    } = req.body;

    if (!title || !category || !amount) {
      return res.status(400).json({
        success: false,
        message: "Title, category and amount are required"
      });
    }

    const expense = await Expense.create({
      user: req.user._id,
      title,
      category,
      amount,
      date,
      note,
      paymentMethod
    });

    return ApiResponse.success(
      res,
      expense,
      "Expense created successfully",
      201
    );
});

/* ========================= */
/* GET USER EXPENSES */
/* ========================= */

const getExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({
      user: req.user._id
    }).sort({ date: -1 });

    return ApiResponse.success(
      res,
      {
        count: expenses.length,
        expenses
      },
      "Expenses fetched successfully"
    );
});

/* ========================= */
/* UPDATE EXPENSE */
/* ========================= */

const updateExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    return ApiResponse.success(
      res,
      updatedExpense,
      "Expense updated successfully"
    );
});

/* ========================= */
/* DELETE EXPENSE */
/* ========================= */

const deleteExpense = asyncHandler(async (req, res) => {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    await expense.deleteOne();

    return ApiResponse.success(
      res,
      null,
      "Expense deleted successfully"
    );
});

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};
