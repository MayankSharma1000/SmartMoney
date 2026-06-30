const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: [true, "Investment name is required"],
      trim: true
    },

    type: {
      type: String,
      required: true,
      enum: [
        "Stock",
        "Mutual Fund",
        "ETF",
        "Gold",
        "Crypto",
        "Bond",
        "Fixed Deposit",
        "PPF",
        "NPS",
        "Other"
      ]
    },

    investedAmount: {
      type: Number,
      required: true,
      min: 0
    },

    currentValue: {
      type: Number,
      required: true,
      min: 0
    },

    purchaseDate: {
      type: Date,
      default: Date.now
    },

    platform: {
      type: String,
      default: ""
    },

    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

/* ========================= */
/* VIRTUALS */
/* ========================= */

investmentSchema.virtual("profit").get(function () {
  return this.currentValue - this.investedAmount;
});

investmentSchema.virtual("returnPercentage").get(function () {
  if (this.investedAmount === 0) return 0;

  return (
    ((this.currentValue - this.investedAmount) /
      this.investedAmount) *
    100
  ).toFixed(2);
});

/* Include virtuals in JSON responses */
investmentSchema.set("toJSON", {
  virtuals: true
});

investmentSchema.set("toObject", {
  virtuals: true
});

module.exports = mongoose.model(
  "Investment",
  investmentSchema
);


investmentSchema.index({

  user:1,
  
  type:1
  
  });