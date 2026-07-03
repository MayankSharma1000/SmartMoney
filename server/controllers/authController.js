const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/* ========================= */
/* REGISTER USER */
/* ========================= */

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number and be 8+ characters."
      });
    }

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists"
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword
      });

    res.status(201).json({
      success: true,

      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },

      token:
        generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });
  }
};

/* ========================= */
/* LOGIN USER */
/* ========================= */

const loginUser = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({
        email
      });

    if (
      !user ||
      !(await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials"
      });
    }

    res.status(200).json({
      success: true,

      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },

      token:
        generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });
  }
};

/* ========================= */
/* COMPLETE ONBOARDING */
/* ========================= */

const completeOnboarding = async (req, res) => {
  try {

    const {
      monthlyIncome,
      currency,
      employmentType
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.monthlyIncome = monthlyIncome;
    user.currency = currency;
    user.employmentType = employmentType;
    user.onboardingCompleted = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Onboarding completed successfully",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
};

module.exports = {
  registerUser,
  loginUser,
  completeOnboarding
};