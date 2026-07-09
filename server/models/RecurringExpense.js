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
      required: [true, "Recurring expense title is required"],
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Bills",
        "Rent",
        "EMI",
        "Insurance",
        "Subscription",
        "Utilities",
        "Internet",
        "Education",
        "Health",
        "Other"
      ],
      default: "Bills"
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: 1
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
      enum: [
        "Cash",
        "UPI",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "Auto Debit",
        "Other"
      ],
      default: "Auto Debit"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

recurringExpenseSchema.set("toJSON", {
  virtuals: true,
  versionKey: false
});

recurringExpenseSchema.set("toObject", {
  virtuals: true,
  versionKey: false
});

recurringExpenseSchema.index({
  user: 1,
  nextDueDate: 1
});

recurringExpenseSchema.index({
  user: 1,
  isActive: 1
});

module.exports = mongoose.model(
  "RecurringExpense",
  recurringExpenseSchema
);
