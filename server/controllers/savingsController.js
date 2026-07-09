const Savings = require("../models/Savings");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

/* ========================= */
/* CREATE SAVINGS GOAL */
/* ========================= */

const createSavingsGoal = asyncHandler(async (req, res) => {
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

    return ApiResponse.success(
      res,
      goal,
      "Savings goal created successfully",
      201
    );
});

/* ========================= */
/* GET SAVINGS GOALS */
/* ========================= */

const getSavingsGoals = asyncHandler(async (req, res) => {
    const goals = await Savings.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    return ApiResponse.success(
      res,
      {
        count: goals.length,
        goals
      },
      "Savings goals fetched successfully"
    );
});

/* ========================= */
/* UPDATE SAVINGS GOAL */
/* ========================= */

const updateSavingsGoal = asyncHandler(async (req, res) => {
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

    return ApiResponse.success(
      res,
      updatedGoal,
      "Savings goal updated successfully"
    );
});

/* ========================= */
/* DELETE SAVINGS GOAL */
/* ========================= */

const deleteSavingsGoal = asyncHandler(async (req, res) => {
    const goal = await Savings.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!goal) {
      return ApiResponse.success(
        res,
        null,
        "Savings goal deleted successfully"
      );
    }

    await goal.deleteOne();

    return ApiResponse.success(
      res,
      null,
      "Savings goal deleted successfully"
    );
});

module.exports = {
  createSavingsGoal,
  getSavingsGoals,
  updateSavingsGoal,
  deleteSavingsGoal
};
