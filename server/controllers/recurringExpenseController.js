const RecurringExpense = require("../models/RecurringExpense");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const createRecurringExpense = asyncHandler(async (req, res) => {
    const { title, category, amount, frequency, nextDueDate, paymentMethod } =
      req.body;

    const recurringAmount =
      Number(amount);

    if (!title || !nextDueDate) {
      return res.status(400).json({
        success: false,
        message: "Title and next due date are required"
      });
    }

    if (
      !Number.isFinite(recurringAmount) ||
      recurringAmount < 1
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid recurring expense amount"
      });
    }

    const recurringExpense = await RecurringExpense.create({
      user: req.user._id,
      title,
      category,
      amount: recurringAmount,
      frequency,
      nextDueDate,
      paymentMethod
    });

    return ApiResponse.success(
      res,
      recurringExpense,
      "Recurring expense created successfully",
      201
    )
});

const getRecurringExpenses = asyncHandler(async (req, res) => {
    const recurringExpenses = await RecurringExpense.find({
      user: req.user._id
    }).sort({ nextDueDate: 1 });

    return ApiResponse.success(
      res,
      recurringExpenses,
      "Recurring expenses fetched successfully"
    );
});

const deleteRecurringExpense = asyncHandler(async (req, res) => {
    const recurringExpense = await RecurringExpense.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!recurringExpense) {
      return res.status(404).json({
        success: false,
        message: "Recurring expense not found"
      });
    }

    await recurringExpense.deleteOne();

    return ApiResponse.success(
      res,
      null,
      "Recurring expense deleted successfully"
    );
});

module.exports = {
  createRecurringExpense,
  getRecurringExpenses,
  deleteRecurringExpense
};
