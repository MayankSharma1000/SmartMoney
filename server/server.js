require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const savingsRoutes = require("./routes/savingsRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const recurringExpenseRoutes = require("./routes/recurringExpenseRoutes");

const app = express();

/* ========================= */
/* DATABASE */
/* ========================= */

connectDB();

/* ========================= */
/* MIDDLEWARE */
/* ========================= */

app.use(
  cors({
    origin: ["http://localhost:5501", "http://localhost:5173"],
    credentials: true
  })
);

app.use(
    "/api/budget",
    budgetRoutes
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========================= */
/* ROUTES */
/* ========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Expense Tracker API Running 🚀"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/savings", savingsRoutes);
app.use("/api/investments", investmentRoutes);

/* ========================= */
/* ERROR HANDLER */
/* ========================= */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

app.use("/api/recurring-expenses", recurringExpenseRoutes);

/* ========================= */
/* SERVER */
/* ========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Smart Expense Tracker Server running on port ${PORT}`
  );
});