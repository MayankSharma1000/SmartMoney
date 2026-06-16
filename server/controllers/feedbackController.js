const Feedback = require("../models/Feedback");

const createFeedback = async (req, res) => {
  try {
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

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback
    });
  } catch (error) {
    console.error("Feedback Error:", error);

    res.status(500).json({
      success: false,
      message: "Feedback could not be submitted."
    });
  }
};

const getMyFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Feedback could not be loaded."
    });
  }
};

module.exports = {
  createFeedback,
  getMyFeedback
};