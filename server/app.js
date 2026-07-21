const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const savingsRoutes = require("./routes/savingsRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const recurringExpenseRoutes = require("./routes/recurringExpenseRoutes");
const aiRoutes = require("./routes/aiRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const adminRoutes = require("./routes/adminRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

/* ========================= */
/* LOGGING */
/* ========================= */

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

/* ========================= */
/* SECURITY */
/* ========================= */

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many login attempts. Try again later."
  }
});

/* ========================= */
/* MIDDLEWARE */
/* ========================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5501"
    ],
    credentials: true
  })
);

app.use(helmet());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(mongoSanitize());

/* ========================= */
/* HEALTH CHECK */
/* ========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Expense Tracker API Running 🚀"
  });
});

/* ========================= */
/* ROUTES */
/* ========================= */

if (process.env.NODE_ENV === "test") {
  app.use("/api/auth", authRoutes);
} else {
  app.use(
    "/api/auth",
    authLimiter,
    authRoutes
  );
}
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/savings", savingsRoutes);
app.use("/api/investments", investmentRoutes);
app.use(
  "/api/recurring-expenses",
  recurringExpenseRoutes
);
app.use("/api/ai", aiRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);

/* ========================= */
/* ERROR HANDLER */
/* ========================= */

app.use(errorHandler);

module.exports = app;
