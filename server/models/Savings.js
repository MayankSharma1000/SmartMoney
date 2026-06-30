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
      trim: true
    },

    targetAmount: {
      type: Number,
      required: true,
      min: 0
    },

    currentAmount: {
      type: Number,
      default: 0,
      min: 0
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
      default: ""
    },

    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

savingsSchema.index({

  user:1,
  
  goalName:1
  
  });

module.exports = mongoose.model("Savings", savingsSchema);