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

    const normalizedTargetAmount =
      Number(targetAmount);

    const normalizedCurrentAmount =
      currentAmount === undefined ||
      currentAmount === null ||
      currentAmount === ""
        ? 0
        : Number(currentAmount);

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }

    if (
      !Number.isFinite(normalizedTargetAmount) ||
      normalizedTargetAmount < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid target amount"
      });
    }

    if (
      !Number.isFinite(normalizedCurrentAmount) ||
      normalizedCurrentAmount < 0 ||
      normalizedCurrentAmount >
        normalizedTargetAmount
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Current amount must be between 0 and the target amount"
      });
    }

    let normalizedTargetDate;

    if (targetDate) {
      normalizedTargetDate =
        new Date(targetDate);

      if (
        Number.isNaN(
          normalizedTargetDate.getTime()
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid target date"
        });
      }
    }

    const goal = await Savings.create({
      user: req.user._id,
      title,
      targetAmount: normalizedTargetAmount,
      currentAmount: normalizedCurrentAmount,
      ...(normalizedTargetDate && {
        targetDate:
          normalizedTargetDate
      }),
      category,
      notes,
      isCompleted:
        normalizedCurrentAmount >=
        normalizedTargetAmount
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

    const allowedFields = [
      "title",
      "targetAmount",
      "currentAmount",
      "targetDate",
      "category",
      "notes"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        goal[field] = req.body[field];
      }
    });

    if (
      req.body.targetDate !== undefined
    ) {
      const normalizedTargetDate =
        new Date(req.body.targetDate);

      if (
        Number.isNaN(
          normalizedTargetDate.getTime()
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid target date"
        });
      }

      goal.targetDate =
        normalizedTargetDate;
    }

    goal.isCompleted =
      Number(goal.currentAmount) >=
      Number(goal.targetAmount);

    const updatedGoal =
      await goal.save();

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
