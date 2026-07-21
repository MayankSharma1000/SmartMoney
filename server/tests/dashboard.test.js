const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");

const User = require("../models/User");
const Expense = require("../models/Expense");
const Savings = require("../models/Savings");
const Investment = require("../models/Investment");
const Budget = require("../models/Budget");

const createUserAndLogin = async (
  overrides = {}
) => {
  const userData = {
    name: "Dashboard Test User",
    email: `dashboard-${new mongoose.Types.ObjectId()}@example.com`,
    password: "Password123!",
    ...overrides
  };

  await request(app)
    .post("/api/auth/register")
    .send(userData)
    .expect(201);

  const loginResponse = await request(app)
    .post("/api/auth/login")
    .send({
      email: userData.email,
      password: userData.password
    })
    .expect(200);

  const token =
    loginResponse.body?.data?.token ||
    loginResponse.body?.token;

  const user = await User.findOne({
    email: userData.email
  });

  return {
    user,
    token
  };
};

describe("Dashboard API", () => {
  test(
    "GET /api/dashboard/summary rejects unauthenticated request",
    async () => {
      const response = await request(app)
        .get("/api/dashboard/summary")
        .expect(401);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "GET /api/dashboard/summary returns zero-state dashboard",
    async () => {
      const { user, token } =
        await createUserAndLogin();

      const response = await request(app)
        .get("/api/dashboard/summary")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

      expect(response.body.success).toBe(true);

      const data = response.body.data;

      expect(data.user.email).toBe(user.email);

      expect(data.totalExpenses).toBe(0);
      expect(data.totalSavings).toBe(0);
      expect(data.totalSavingsTarget).toBe(0);
      expect(data.totalInvested).toBe(0);
      expect(data.currentInvestmentValue).toBe(0);
      expect(data.investmentProfit).toBe(0);

      expect(data.expenseCount).toBe(0);
      expect(data.savingsGoalCount).toBe(0);
      expect(data.investmentCount).toBe(0);

      expect(data.recentTransactions).toEqual([]);
      expect(Array.isArray(data.categoryChart)).toBe(true);
      expect(Array.isArray(data.monthlyChart)).toBe(true);
      expect(Array.isArray(data.insights)).toBe(true);

      expect(
        typeof data.financialHealthScore
      ).toBe("number");

      expect(
        typeof data.financialHealthLabel
      ).toBe("string");

      expect(data.healthBreakdown).toEqual(
        expect.objectContaining({
          savingsStrength: expect.any(Number),
          investmentStrength:
            expect.any(Number),
          budgetDiscipline:
            expect.any(Number),
          expenseControl: expect.any(Number)
        })
      );
    }
  );

  test(
    "GET /api/dashboard/summary aggregates current financial data",
    async () => {
      const { user, token } =
        await createUserAndLogin();

      const now = new Date();

      await User.findByIdAndUpdate(
        user._id,
        {
          monthlyIncome: 50000,
          currency: "INR",
          onboardingCompleted: true
        }
      );

      await Expense.create([
        {
          user: user._id,
          title: "Groceries",
          category: "Food",
          amount: 1500,
          paymentMethod: "UPI",
          date: now
        },
        {
          user: user._id,
          title: "Transport",
          category: "Transport",
          amount: 500,
          paymentMethod: "Cash",
          date: now
        }
      ]);

      await Savings.create([
        {
          user: user._id,
          title: "Emergency Fund",
          targetAmount: 10000,
          currentAmount: 4000
        },
        {
          user: user._id,
          title: "Travel Fund",
          targetAmount: 20000,
          currentAmount: 6000
        }
      ]);

      await Investment.create([
        {
          user: user._id,
          name: "Index Fund",
          type: "Mutual Fund",
          investedAmount: 10000,
          currentValue: 12000
        },
        {
          user: user._id,
          name: "Gold Holding",
          type: "Gold",
          investedAmount: 5000,
          currentValue: 4500
        }
      ]);

      const month =
        now.toLocaleString("default", {
          month: "long"
        });

      const year = now.getFullYear();

      await Budget.create({
        user: user._id,
        monthlyBudget: 25000,
        month,
        year
      });

      const response = await request(app)
        .get("/api/dashboard/summary")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

      const data = response.body.data;

      expect(data.monthlyIncome).toBe(50000);
      expect(data.monthlyBudget).toBe(25000);

      expect(data.totalExpenses).toBe(2000);

      expect(data.totalSavings).toBe(10000);
      expect(data.totalSavingsTarget).toBe(
        30000
      );

      expect(data.totalInvested).toBe(15000);

      expect(
        data.currentInvestmentValue
      ).toBe(16500);

      expect(data.investmentProfit).toBe(1500);

      expect(data.expenseCount).toBe(2);
      expect(data.savingsGoalCount).toBe(2);
      expect(data.investmentCount).toBe(2);

      expect(data.user.currency).toBe("INR");
      expect(
        data.user.onboardingCompleted
      ).toBe(true);

      expect(data.period.month).toBe(month);
      expect(data.period.year).toBe(year);
    }
  );

  test(
    "GET /api/dashboard/summary excludes expenses outside current month",
    async () => {
      const { user, token } =
        await createUserAndLogin();

      const now = new Date();

      const previousMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        15,
        12,
        0,
        0
      );

      await Expense.create([
        {
          user: user._id,
          title: "Current Expense",
          category: "Food",
          amount: 700,
          paymentMethod: "UPI",
          date: now
        },
        {
          user: user._id,
          title: "Old Expense",
          category: "Shopping",
          amount: 9000,
          paymentMethod: "Cash",
          date: previousMonth
        }
      ]);

      const response = await request(app)
        .get("/api/dashboard/summary")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

      const data = response.body.data;

      expect(data.totalExpenses).toBe(700);
      expect(data.expenseCount).toBe(1);

      expect(
        data.recentTransactions
          .map((item) => item.title)
      ).toContain("Current Expense");

      expect(
        data.recentTransactions
          .map((item) => item.title)
      ).not.toContain("Old Expense");
    }
  );

  test(
    "GET /api/dashboard/summary isolates financial data between users",
    async () => {
      const first =
        await createUserAndLogin();

      const second =
        await createUserAndLogin();

      const now = new Date();

      await Expense.create({
        user: first.user._id,
        title: "First User Expense",
        category: "Food",
        amount: 1000,
        paymentMethod: "UPI",
        date: now
      });

      await Expense.create({
        user: second.user._id,
        title: "Second User Expense",
        category: "Shopping",
        amount: 9999,
        paymentMethod: "Cash",
        date: now
      });

      await Savings.create({
        user: second.user._id,
        title: "Other User Savings",
        targetAmount: 50000,
        currentAmount: 40000
      });

      await Investment.create({
        user: second.user._id,
        name: "Other User Investment",
        type: "Stock",
        investedAmount: 30000,
        currentValue: 35000
      });

      const response = await request(app)
        .get("/api/dashboard/summary")
        .set(
          "Authorization",
          `Bearer ${first.token}`
        )
        .expect(200);

      const data = response.body.data;

      expect(data.totalExpenses).toBe(1000);
      expect(data.totalSavings).toBe(0);
      expect(data.totalInvested).toBe(0);
      expect(
        data.currentInvestmentValue
      ).toBe(0);

      expect(data.expenseCount).toBe(1);
      expect(data.savingsGoalCount).toBe(0);
      expect(data.investmentCount).toBe(0);

      expect(
        data.recentTransactions
          .map((item) => item.title)
      ).toContain("First User Expense");

      expect(
        data.recentTransactions
          .map((item) => item.title)
      ).not.toContain("Second User Expense");
    }
  );

  test(
    "GET /api/dashboard/summary returns recent transactions newest first",
    async () => {
      const { user, token } =
        await createUserAndLogin();

      const now = new Date();

      const olderDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        5,
        10,
        0,
        0
      );

      const newerDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        20,
        10,
        0,
        0
      );

      await Expense.create([
        {
          user: user._id,
          title: "Older Expense",
          category: "Bills",
          amount: 300,
          paymentMethod: "UPI",
          date: olderDate
        },
        {
          user: user._id,
          title: "Newer Expense",
          category: "Food",
          amount: 400,
          paymentMethod: "Cash",
          date: newerDate
        }
      ]);

      const response = await request(app)
        .get("/api/dashboard/summary")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

      const transactions =
        response.body.data.recentTransactions;

      expect(transactions).toHaveLength(2);

      expect(transactions[0].title).toBe(
        "Newer Expense"
      );

      expect(transactions[1].title).toBe(
        "Older Expense"
      );
    }
  );
});
