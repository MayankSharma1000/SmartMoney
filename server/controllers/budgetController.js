const Budget = require("../models/Budget");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const setBudget = asyncHandler(async (req, res) => {
    const { monthlyBudget, month, year } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authorized"
      });
    }

    const budgetAmount = Number(monthlyBudget);

    if (
      !Number.isFinite(budgetAmount) ||
      budgetAmount < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid monthly budget"
      });
    }

    const selectedMonth =
      month ||
      new Date().toLocaleString("default", {
        month: "long"
      });

    const validMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    if (!validMonths.includes(selectedMonth)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid budget month"
      });
    }

    const selectedYear =
      year === undefined ||
      year === null ||
      year === ""
        ? new Date().getFullYear()
        : Number(year);

    if (
      !Number.isInteger(selectedYear) ||
      selectedYear < 2020 ||
      selectedYear > 2100
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid budget year"
      });
    }

    const budget = await Budget.findOneAndUpdate(
      {
        user: req.user._id,
        month: selectedMonth,
        year: selectedYear
      },
      {
        user: req.user._id,
        monthlyBudget: budgetAmount,
        month: selectedMonth,
        year: selectedYear
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    return ApiResponse.success(
      res,
      budget,
      "Budget saved successfully"
    );
});

const getBudget = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authorized"
      });
    }

    const month = new Date().toLocaleString("default", {
      month: "long"
    });

    const year = new Date().getFullYear();

    const budget = await Budget.findOne({
      user: req.user._id,
      month,
      year
    });

    return ApiResponse.success(
      res,
      budget,
      "Budget fetched successfully"
    );
});

module.exports = {
  setBudget,
  getBudget
};
