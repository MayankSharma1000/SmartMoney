const Budget = require("../models/Budget");

const setBudget = async (req, res) => {
  try {
    const { monthlyBudget, month, year } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authorized"
      });
    }

    const budgetAmount = Number(monthlyBudget);

    if (!budgetAmount || budgetAmount <= 0) {
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

    const selectedYear =
      Number(year) || new Date().getFullYear();

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

    return res.status(200).json({
      success: true,
      message: "Budget saved successfully",
      budget
    });
  } catch (error) {
    console.error("Budget Save Error:", error);

    return res.status(500).json({
      success: false,
      message: "Budget could not be saved"
    });
  }
};

const getBudget = async (req, res) => {
  try {
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

    return res.status(200).json({
      success: true,
      budget
    });
  } catch (error) {
    console.error("Budget Fetch Error:", error);

    return res.status(500).json({
      success: false,
      message: "Budget could not be fetched"
    });
  }
};

module.exports = {
  setBudget,
  getBudget
};