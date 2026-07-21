const request = require("supertest");

const app = require("../app");
const User = require("../models/User");
const Expense = require("../models/Expense");
const Savings = require("../models/Savings");
const Investment = require("../models/Investment");

async function registerUser(overrides = {}) {
  const payload = {
    name: "Admin Test User",
    email: `admin-test-${Date.now()}-${Math.random()}@example.com`,
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

describe("Admin API", () => {
  test(
    "GET /api/admin/dashboard rejects unauthenticated request",
    async () => {
      const response = await request(app)
        .get("/api/admin/dashboard")
        .expect(401);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "GET /api/admin/dashboard rejects non-admin user",
    async () => {
      const { token } = await registerUser();

      const response = await request(app)
        .get("/api/admin/dashboard")
        .set("Authorization", `Bearer ${token}`)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Access denied"
      );
    }
  );

  test(
    "GET /api/admin/dashboard returns zero financial totals when no financial records exist",
    async () => {
      const admin = await registerUser();

      admin.user.role = "admin";
      await admin.user.save();

      const response = await request(app)
        .get("/api/admin/dashboard")
        .set(
          "Authorization",
          `Bearer ${admin.token}`
        )
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.totalUsers).toBe(1);
      expect(response.body.data.totalExpenses).toBe(0);
      expect(response.body.data.totalSavings).toBe(0);
      expect(
        response.body.data.totalInvestments
      ).toBe(0);
    }
  );

  test(
    "GET /api/admin/dashboard aggregates application-wide financial data",
    async () => {
      const admin = await registerUser();

      admin.user.role = "admin";
      await admin.user.save();

      const second = await registerUser({
        name: "Second User"
      });

      await Expense.create([
        {
          user: admin.user._id,
          title: "Admin Expense",
          category: "Food",
          amount: 1200,
          paymentMethod: "UPI"
        },
        {
          user: second.user._id,
          title: "User Expense",
          category: "Bills",
          amount: 800,
          paymentMethod: "Cash"
        }
      ]);

      await Savings.create([
        {
          user: admin.user._id,
          title: "Admin Savings",
          targetAmount: 10000,
          currentAmount: 3000
        },
        {
          user: second.user._id,
          title: "User Savings",
          targetAmount: 20000,
          currentAmount: 7000
        }
      ]);

      await Investment.create([
        {
          user: admin.user._id,
          name: "Admin Investment",
          type: "Stock",
          investedAmount: 4000,
          currentValue: 5000,
          purchaseDate: new Date()
        },
        {
          user: second.user._id,
          name: "User Investment",
          type: "Stock",
          investedAmount: 6000,
          currentValue: 8000,
          purchaseDate: new Date()
        }
      ]);

      const response = await request(app)
        .get("/api/admin/dashboard")
        .set(
          "Authorization",
          `Bearer ${admin.token}`
        )
        .expect(200);

      expect(response.body.success).toBe(true);

      expect(response.body.data).toEqual(
        expect.objectContaining({
          totalUsers: 2,
          totalExpenses: 2000,
          totalSavings: 10000,
          totalInvestments: 13000
        })
      );
    }
  );
});
