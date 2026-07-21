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

    const normalizedInvestedAmount =
      Number(investedAmount);

    const normalizedCurrentValue =
      Number(currentValue);

    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: "Name and investment type are required"
      });
    }

    if (
      !Number.isFinite(normalizedInvestedAmount) ||
      normalizedInvestedAmount < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid invested amount"
      });
    }

    if (
      currentValue === undefined ||
      currentValue === null ||
      currentValue === "" ||
      !Number.isFinite(normalizedCurrentValue) ||
      normalizedCurrentValue < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid current value"
      });
    }

    let normalizedPurchaseDate;

    if (purchaseDate) {
      normalizedPurchaseDate =
        new Date(purchaseDate);

      if (
        Number.isNaN(
          normalizedPurchaseDate.getTime()
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid purchase date"
        });
      }
    }

    const investment = await Investment.create({
      user: req.user._id,
      name,
      type,
      investedAmount: normalizedInvestedAmount,
      currentValue: normalizedCurrentValue,
      ...(normalizedPurchaseDate && {
        purchaseDate:
          normalizedPurchaseDate
      }),
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

    if (
      updates.investedAmount !== undefined
    ) {
      const normalizedInvestedAmount =
        Number(updates.investedAmount);

      if (
        !Number.isFinite(
          normalizedInvestedAmount
        ) ||
        normalizedInvestedAmount < 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid invested amount"
        });
      }

      updates.investedAmount =
        normalizedInvestedAmount;
    }

    if (
      updates.currentValue !== undefined
    ) {
      const normalizedCurrentValue =
        Number(updates.currentValue);

      if (
        !Number.isFinite(
          normalizedCurrentValue
        ) ||
        normalizedCurrentValue < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid current value"
        });
      }

      updates.currentValue =
        normalizedCurrentValue;
    }

    if (updates.purchaseDate !== undefined) {
      const normalizedPurchaseDate =
        new Date(updates.purchaseDate);

      if (
        Number.isNaN(
          normalizedPurchaseDate.getTime()
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid purchase date"
        });
      }

      updates.purchaseDate =
        normalizedPurchaseDate;
    }

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
