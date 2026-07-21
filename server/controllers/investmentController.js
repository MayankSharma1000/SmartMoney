const Investment = require("../models/Investment");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

/* ========================= */
/* CREATE INVESTMENT */
/* ========================= */

const createInvestment = asyncHandler(async (req, res) => {
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

    return ApiResponse.success(
      res,
      investment,
      "Investment created successfully",
      201
    );
});

/* ========================= */
/* GET INVESTMENTS */
/* ========================= */

const getInvestments = asyncHandler(async (req, res) => {
    const investments = await Investment.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    return ApiResponse.success(
      res,
      {
        count: investments.length,
        investments
      },
      "Investments fetched successfully"
    );
});

/* ========================= */
/* UPDATE INVESTMENT */
/* ========================= */

const updateInvestment = asyncHandler(async (req, res) => {
    const allowedFields = [
      "name",
      "type",
      "investedAmount",
      "currentValue",
      "purchaseDate",
      "platform",
      "notes"
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedInvestment =
      await Investment.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user._id
        },
        {
          $set: updates
        },
        {
          new: true,
          runValidators: true
        }
      );

    if (!updatedInvestment) {
      return res.status(404).json({
        success: false,
        message: "Investment not found"
      });
    }

    return ApiResponse.success(
      res,
      updatedInvestment,
      "Investment updated successfully"
    );
});

/* ========================= */
/* DELETE INVESTMENT */
/* ========================= */

const deleteInvestment = asyncHandler(async (req, res) => {
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

    return ApiResponse.success(
      res,
      null,
      "Investment deleted successfully"
    );
});

module.exports = {
  createInvestment,
  getInvestments,
  updateInvestment,
  deleteInvestment
};
