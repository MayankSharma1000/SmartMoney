const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    monthlyBudget: {
      type: Number,
      required: [true, "Monthly budget is required"],
      min: 1
    },

    month: {
      type: String,
      required: [true, "Month is required"],
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    },

    year: {
      type: Number,
      required: [true, "Year is required"],
      min: 2020,
      max: 2100
    },
  },
  {
    timestamps: true
  }
);

budgetSchema.set("toJSON", {
  virtuals: true,
  versionKey: false
});

budgetSchema.set("toObject", {
  virtuals: true,
  versionKey: false
});

budgetSchema.index(
  {
    user: 1,
    month: 1,
    year: 1
  },
  {
    unique: true
  }
);

module.exports = mongoose.model(
  "Budget",
  budgetSchema
);
