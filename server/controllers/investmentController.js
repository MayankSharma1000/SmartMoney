const Investment = require("../models/Investment");

/* ========================= */
/* CREATE INVESTMENT */
/* ========================= */

const createInvestment = async (req, res) => {
  try {
    const {
      name,
      type,
      investedAmount,
      currentValue,
      purchaseDate,
      platform,
      notes
    } = req.body;

    if (!name || !type || !investedAmount || !currentValue) {
      return res.status(400).json({
        success: false,
        message: "Name, type, invested amount and current value are required"
      });
    }

    const investment = await Investment.create({
      user: req.user._id,
      name,
      type,
      investedAmount,
      currentValue,
      purchaseDate,
      platform,
      notes
    });

    res.status(201).json({
      success: true,
      investment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ========================= */
/* GET INVESTMENTS */
/* ========================= */

const getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: investments.length,
      investments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ========================= */
/* UPDATE INVESTMENT */
/* ========================= */

const updateInvestment = async (req, res) => {
  try {
    const investment = await Investment.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!investment) {
      return res.status(404).json({
        success: false,
        message: "Investment not found"
      });
    }

    const updatedInvestment = await Investment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      investment: updatedInvestment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ========================= */
/* DELETE INVESTMENT */
/* ========================= */

const deleteInvestment = async (req, res) => {
  try {
    const investment = await Investment.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!investment) {
      return res.status(404).json({
        success: false,
        message: "Investment not found"
      });
    }

    await investment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Investment deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createInvestment,
  getInvestments,
  updateInvestment,
  deleteInvestment
};