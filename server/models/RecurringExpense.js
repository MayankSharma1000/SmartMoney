const mongoose = require("mongoose");

const recurringExpenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      default: "Bills"
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    frequency: {
      type: String,
      enum: ["Monthly", "Weekly", "Yearly"],
      default: "Monthly"
    },

    nextDueDate: {
      type: Date,
      required: true
    },

    paymentMethod: {
      type: String,
      default: "UPI"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "RecurringExpense",
  recurringExpenseSchema
);