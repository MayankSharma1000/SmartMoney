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

    const validCategories = [
      "Bills",
      "Rent",
      "EMI",
      "Insurance",
      "Subscription",
      "Utilities",
      "Internet",
      "Education",
      "Health",
      "Other"
    ];

    const validFrequencies = [
      "Weekly",
      "Monthly",
      "Quarterly",
      "Yearly"
    ];

    const validPaymentMethods = [
      "Cash",
      "UPI",
      "Credit Card",
      "Debit Card",
      "Net Banking",
      "Auto Debit",
      "Other"
    ];

    if (
      category !== undefined &&
      !validCategories.includes(category)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid recurring expense category"
      });
    }

    if (
      frequency !== undefined &&
      !validFrequencies.includes(frequency)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid recurring expense frequency"
      });
    }

    if (
      paymentMethod !== undefined &&
      !validPaymentMethods.includes(paymentMethod)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid payment method"
      });
    }

    const normalizedNextDueDate =
      new Date(nextDueDate);

    if (
      Number.isNaN(
        normalizedNextDueDate.getTime()
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid next due date"
      });
    }

    const recurringExpense =
      await RecurringExpense.create({
        user: req.user._id,
        title,
        category,
        amount: recurringAmount,
        frequency,
        nextDueDate:
          normalizedNextDueDate,
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
