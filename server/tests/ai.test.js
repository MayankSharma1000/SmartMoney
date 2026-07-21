const request = require("supertest");

const app = require("../app");
const User = require("../models/User");
const Expense = require("../models/Expense");
const Savings = require("../models/Savings");
const Investment = require("../models/Investment");

async function registerUser(overrides = {}) {
  const payload = {
    name: "AI Test User",
    email: `ai-test-${Date.now()}-${Math.random()}@example.com`,
    password: "Password123!",
    ...overrides
  };

  const response = await request(app)
    .post("/api/auth/register")
    .send(payload)
    .expect(201);

  return {
    user: await User.findOne({
      email: payload.email
    }),
    token: response.body.token
  };
}

describe("Financial Advice API", () => {
  test(
    "POST /api/ai/financial-advice rejects unauthenticated request",
    async () => {
      const response = await request(app)
        .post("/api/ai/financial-advice")
        .expect(401);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "POST /api/ai/financial-advice returns zero-state advice",
    async () => {
      const { token } = await registerUser();

      const response = await request(app)
        .post("/api/ai/financial-advice")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(
        true
      );

      expect(response.body.data).toContain(
        "You currently have ₹0 in savings."
      );

      expect(response.body.data).toContain(
        "Your investments are valued at ₹0."
      );
    }
  );

  test(
    "POST /api/ai/financial-advice generates advice from authenticated user's financial data",
    async () => {
      const { user, token } =
        await registerUser();

      await Expense.create({
        user: user._id,
        title: "Monthly Expense",
        category: "Bills",
        amount: 10000,
        paymentMethod: "UPI"
      });

      await Savings.create({
        user: user._id,
        title: "Emergency Fund",
        targetAmount: 10000,
        currentAmount: 1000
      });

      await Investment.create({
        user: user._id,
        name: "Index Fund",
        type: "Stock",
        investedAmount: 100,
        currentValue: 100,
        purchaseDate: new Date()
      });

      const response = await request(app)
        .post("/api/ai/financial-advice")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      expect(response.body.data).toContain(
        "Your savings are below recommended levels. Aim to save at least 20% of your monthly spending."
      );

      expect(response.body.data).toContain(
        "Consider allocating a portion of your savings toward long-term investments."
      );

      expect(response.body.data).toContain(
        "You currently have ₹1,000 in savings."
      );

      expect(response.body.data).toContain(
        "Your investments are valued at ₹100."
      );
    }
  );

  test(
    "POST /api/ai/financial-advice isolates financial data between users",
    async () => {
      const first = await registerUser({
        name: "First AI User"
      });

      const second = await registerUser({
        name: "Second AI User"
      });

      await Savings.create({
        user: first.user._id,
        title: "First Savings",
        targetAmount: 10000,
        currentAmount: 2000
      });

      await Investment.create({
        user: first.user._id,
        name: "First Investment",
        type: "Stock",
        investedAmount: 500,
        currentValue: 1000,
        purchaseDate: new Date()
      });

      await Savings.create({
        user: second.user._id,
        title: "Second Savings",
        targetAmount: 50000,
        currentAmount: 40000
      });

      await Investment.create({
        user: second.user._id,
        name: "Second Investment",
        type: "Stock",
        investedAmount: 10000,
        currentValue: 30000,
        purchaseDate: new Date()
      });

      const response = await request(app)
        .post("/api/ai/financial-advice")
        .set(
          "Authorization",
          `Bearer ${first.token}`
        )
        .expect(200);

      expect(response.body.data).toContain(
        "You currently have ₹2,000 in savings."
      );

      expect(response.body.data).toContain(
        "Your investments are valued at ₹1,000."
      );

      expect(response.body.data).not.toContain(
        "You currently have ₹40,000 in savings."
      );

      expect(response.body.data).not.toContain(
        "Your investments are valued at ₹30,000."
      );
    }
  );
});
