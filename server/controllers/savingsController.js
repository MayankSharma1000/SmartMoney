const Savings = require("../models/Savings");

/* ========================= */
/* CREATE SAVINGS GOAL */
/* ========================= */

const createSavingsGoal = async (req, res) => {
  try {
    const {
      title,
      targetAmount,
      currentAmount,
      targetDate,
      category,
      notes
    } = req.body;

    if (!title || !targetAmount) {
      return res.status(400).json({
        success: false,
        message: "Title and target amount are required"
      });
    }

    const goal = await Savings.create({
      user: req.user._id,
      title,
      targetAmount,
      currentAmount,
      targetDate,
      category,
      notes
    });

    res.status(201).json({
      success: true,
      goal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ========================= */
/* GET SAVINGS GOALS */
/* ========================= */

const getSavingsGoals = async (req, res) => {
  try {
    const goals = await Savings.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: goals.length,
      goals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ========================= */
/* UPDATE SAVINGS GOAL */
/* ========================= */

const updateSavingsGoal = async (req, res) => {
  try {
    const goal = await Savings.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Savings goal not found"
      });
    }

    const updatedGoal = await Savings.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      goal: updatedGoal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ========================= */
/* DELETE SAVINGS GOAL */
/* ========================= */

const deleteSavingsGoal = async (req, res) => {
  try {
    const goal = await Savings.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Savings goal not found"
      });
    }

    await goal.deleteOne();

    res.status(200).json({
      success: true,
      message: "Savings goal deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createSavingsGoal,
  getSavingsGoals,
  updateSavingsGoal,
  deleteSavingsGoal
};