const Budget = require("../models/Budget");

const setBudget = async (req, res) => {
  try {
    const { monthlyBudget, month, year } = req.body;

    const existingBudget =
      await Budget.findOne({
        user: req.user._id,
        month,
        year
      });

    if (existingBudget) {
      existingBudget.monthlyBudget =
        monthlyBudget;

      await existingBudget.save();

      return res.status(200).json({
        success: true,
        budget: existingBudget
      });
    }

    const budget = await Budget.create({
      user: req.user._id,
      monthlyBudget,
      month,
      year
    });

    res.status(201).json({
      success: true,
      budget
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getBudget = async (req, res) => {
  try {
    const month =
      new Date().toLocaleString("default", {
        month: "long"
      });

    const year = new Date().getFullYear();

    const budget = await Budget.findOne({
      user: req.user._id,
      month,
      year
    });

    res.status(200).json({
      success: true,
      budget
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  setBudget,
  getBudget
};