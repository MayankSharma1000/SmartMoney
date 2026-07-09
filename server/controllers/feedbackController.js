const Feedback = require("../models/Feedback");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

/* ========================================= */
/* CREATE FEEDBACK */
/* ========================================= */

const createFeedback = asyncHandler(async (req, res) => {

  const { message } = req.body;

  if (!message || message.trim().length < 5) {
    return res.status(400).json({
      success: false,
      message: "Feedback must be at least 5 characters long."
    });
  }

  const feedback = await Feedback.create({
    user: req.user._id,
    name: req.user.name,
    email: req.user.email,
    message
  });

  return ApiResponse.success(
    res,
    feedback,
    "Feedback submitted successfully.",
    201
  );

});

/* ========================================= */
/* GET MY FEEDBACK */
/* ========================================= */

const getMyFeedback = asyncHandler(async (req, res) => {

  const feedback = await Feedback.find({
    user: req.user._id
  }).sort({
    createdAt: -1
  });

  return ApiResponse.success(
    res,
    feedback,
    "Feedback loaded successfully"
  );

});

module.exports = {
  createFeedback,
  getMyFeedback
};
