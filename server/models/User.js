const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 60
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address."
      ]
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false
    },

    savingsTarget: {
      type: Number,
      default: 0,
      min: 0
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
      default: null,
      min: 0
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
    timestamps: true,
    versionKey: false
  }
);

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret.password;
    return ret;
  }
});

userSchema.set("toObject", {
  virtuals: true,
  versionKey: false
});

userSchema.index({
  email: 1
});

module.exports = mongoose.model("User", userSchema);
