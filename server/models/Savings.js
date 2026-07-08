const mongoose = require("mongoose");

const savingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: [true, "Savings goal title is required"],
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    targetAmount: {
      type: Number,
      required: [true, "Target amount is required"],
      min: 1
    },

    currentAmount: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator(value) {
          return value <= this.targetAmount;
        },
        message: "Current amount cannot exceed target amount."
      }
    },

    targetDate: {
      type: Date
    },

    category: {
      type: String,
      enum: [
        "Emergency Fund",
        "Car",
        "House",
        "Travel",
        "Wedding",
        "Education",
        "Retirement",
        "Other"
      ],
      default: "Other"
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 500,
      default: ""
    },

    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

savingsSchema.index({
  user: 1,
  title: 1
});

savingsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false
});

module.exports = mongoose.model("Savings", savingsSchema);
