const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: [true, "Password is required"]
    },

    savingsTarget: {
      type: Number,
      default: 0
    },

    profilePicture: {
      type: String,
      default: ""
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    monthlyIncome: {
      type: Number,
      default: null
    },
    
    currency: {
      type: String,
      enum: [
        "INR",
        "USD",
        "EUR",
        "GBP",
        "AED",
        "SGD",
        "CAD",
        "AUD",
        "JPY"
      ],
      default: "INR"
    },
    
    employmentType: {
      type: String,
      enum: [
        "Student",
        "Salaried",
        "Business",
        "Freelancer",
        "Retired",
        "Other"
      ],
      default: null
    },
    
    onboardingCompleted: {
      type: Boolean,
      default: false
    }

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);