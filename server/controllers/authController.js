const bcrypt = require("bcryptjs");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/* ========================= */
/* USER RESPONSE */
/* ========================= */

const buildUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  profilePicture: user.profilePicture || "",
  monthlyIncome:
    user.monthlyIncome ?? null,
  currency:
    user.currency || "INR",
  employmentType:
    user.employmentType || null,
  savingsTarget:
    user.savingsTarget || 0,
  onboardingCompleted:
    Boolean(user.onboardingCompleted),
  role:
    user.role || "user",
});

/* ========================= */
/* REGISTER USER */
/* ========================= */

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const normalizedEmail =
      email?.trim().toLowerCase();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !normalizedEmail ||
      !emailRegex.test(normalizedEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

    if (
      !password ||
      !passwordRegex.test(password)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number and be 8+ characters.",
      });
    }

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
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
        name: name?.trim(),
        email: normalizedEmail,
        password: hashedPassword,
      });

    return res.status(201).json({
      success: true,

      user:
        buildUserResponse(user),

      token:
        generateToken(user._id),
    });
  } catch (error) {
    console.error(
      "Register Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });
  }
};

/* ========================= */
/* LOGIN USER */
/* ========================= */

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const normalizedEmail =
      email?.trim().toLowerCase();

    const user =
      await User.findOne({
        email: normalizedEmail,
      }).select("+password");

    if (
      !user ||
      !password ||
      !(await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    return res.status(200).json({
      success: true,

      user:
        buildUserResponse(user),

      token:
        generateToken(user._id),
    });
  } catch (error) {
    console.error(
      "Login Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });
  }
};

/* ========================= */
/* COMPLETE ONBOARDING */
/* ========================= */

const completeOnboarding = async (
  req,
  res
) => {
  try {
    const {
      monthlyIncome,
      currency,
      employmentType,
    } = req.body;

    const income =
      Number(monthlyIncome);

    if (
      !Number.isFinite(income) ||
      income < 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid monthly income",
      });
    }

    const user =
      await User.findById(
        req.user._id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.monthlyIncome =
      income;

    user.currency =
      currency;

    user.employmentType =
      employmentType;

    user.onboardingCompleted =
      true;

    await user.save();

    return res.status(200).json({
      success: true,

      message:
        "Onboarding completed successfully",

      user:
        buildUserResponse(user),
    });
  } catch (error) {
    console.error(
      "Onboarding Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  completeOnboarding,
};
