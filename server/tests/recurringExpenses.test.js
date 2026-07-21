const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");

const User = require("../models/User");
const RecurringExpense =
  require("../models/RecurringExpense");

const createUserAndLogin = async () => {
  const userData = {
    name: "Recurring Test User",
    email:
      `recurring-${new mongoose.Types.ObjectId()}@example.com`,
    password: "Password123!"
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

const futureDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 10);
  return date;
};

describe("Recurring Expense API", () => {
  test(
    "POST /api/recurring-expenses rejects unauthenticated request",
    async () => {
      const response = await request(app)
        .post("/api/recurring-expenses")
        .send({
          title: "Internet Bill",
          amount: 1000,
          nextDueDate: futureDate()
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "GET /api/recurring-expenses rejects unauthenticated request",
    async () => {
      const response = await request(app)
        .get("/api/recurring-expenses")
        .expect(401);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "POST /api/recurring-expenses creates recurring expense",
    async () => {
      const { user, token } =
        await createUserAndLogin();

      const dueDate = futureDate();

      const response = await request(app)
        .post("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Internet Bill",
          category: "Internet",
          amount: 1200,
          frequency: "Monthly",
          nextDueDate: dueDate,
          paymentMethod: "UPI"
        })
        .expect(201);

      expect(response.body.success).toBe(true);

      const recurringExpense =
        response.body.data;

      expect(recurringExpense.title).toBe(
        "Internet Bill"
      );

      expect(recurringExpense.category).toBe(
        "Internet"
      );

      expect(recurringExpense.amount).toBe(1200);

      expect(recurringExpense.frequency).toBe(
        "Monthly"
      );

      expect(
        recurringExpense.paymentMethod
      ).toBe("UPI");

      const stored =
        await RecurringExpense.findOne({
          user: user._id,
          title: "Internet Bill"
        });

      expect(stored).not.toBeNull();
      expect(stored.amount).toBe(1200);
    }
  );

  test(
    "POST /api/recurring-expenses applies schema defaults",
    async () => {
      const { user, token } =
        await createUserAndLogin();

      await request(app)
        .post("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Default Recurring",
          amount: 500,
          nextDueDate: futureDate()
        })
        .expect(201);

      const stored =
        await RecurringExpense.findOne({
          user: user._id,
          title: "Default Recurring"
        });

      expect(stored).not.toBeNull();

      expect(stored.category).toBe("Bills");
      expect(stored.frequency).toBe("Monthly");

      expect(stored.paymentMethod).toBe(
        "Auto Debit"
      );

      expect(stored.isActive).toBe(true);
    }
  );

  test(
    "POST /api/recurring-expenses rejects missing title",
    async () => {
      const { token } =
        await createUserAndLogin();

      const response = await request(app)
        .post("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          amount: 500,
          nextDueDate: futureDate()
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "POST /api/recurring-expenses rejects missing next due date",
    async () => {
      const { token } =
        await createUserAndLogin();

      const response = await request(app)
        .post("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Missing Date",
          amount: 500
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "POST /api/recurring-expenses rejects zero amount",
    async () => {
      const { token } =
        await createUserAndLogin();

      const response = await request(app)
        .post("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Invalid Amount",
          amount: 0,
          nextDueDate: futureDate()
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "POST /api/recurring-expenses rejects negative amount",
    async () => {
      const { token } =
        await createUserAndLogin();

      const response = await request(app)
        .post("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Negative Amount",
          amount: -100,
          nextDueDate: futureDate()
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "POST /api/recurring-expenses rejects malformed amount",
    async () => {
      const { token } =
        await createUserAndLogin();

      const response = await request(app)
        .post("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Malformed Amount",
          amount: "not-a-number",
          nextDueDate: futureDate()
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "POST /api/recurring-expenses rejects invalid next due date",
    async () => {
      const { token } =
        await createUserAndLogin();

      const response = await request(app)
        .post("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Invalid Date",
          amount: 500,
          nextDueDate: "not-a-date"
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "POST /api/recurring-expenses rejects invalid category",
    async () => {
      const { token } =
        await createUserAndLogin();

      const response = await request(app)
        .post("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Invalid Category",
          category: "NotACategory",
          amount: 500,
          nextDueDate: futureDate()
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "POST /api/recurring-expenses rejects invalid frequency",
    async () => {
      const { token } =
        await createUserAndLogin();

      const response = await request(app)
        .post("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Invalid Frequency",
          amount: 500,
          frequency: "Daily",
          nextDueDate: futureDate()
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "POST /api/recurring-expenses rejects invalid payment method",
    async () => {
      const { token } =
        await createUserAndLogin();

      const response = await request(app)
        .post("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Invalid Payment",
          amount: 500,
          nextDueDate: futureDate(),
          paymentMethod: "Cheque"
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    }
  );

  test(
    "GET /api/recurring-expenses returns authenticated user's records",
    async () => {
      const { user, token } =
        await createUserAndLogin();

      const firstDate = futureDate();

      const secondDate = new Date(
        firstDate.getTime() +
          5 * 24 * 60 * 60 * 1000
      );

      await RecurringExpense.create([
        {
          user: user._id,
          title: "First Recurring",
          category: "Bills",
          amount: 500,
          frequency: "Monthly",
          nextDueDate: firstDate
        },
        {
          user: user._id,
          title: "Second Recurring",
          category: "Rent",
          amount: 10000,
          frequency: "Monthly",
          nextDueDate: secondDate
        }
      ]);

      const response = await request(app)
        .get("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

      expect(response.body.success).toBe(true);

      expect(response.body.data).toHaveLength(2);

      expect(response.body.data[0].title).toBe(
        "First Recurring"
      );

      expect(response.body.data[1].title).toBe(
        "Second Recurring"
      );
    }
  );

  test(
    "GET /api/recurring-expenses isolates records between users",
    async () => {
      const first =
        await createUserAndLogin();

      const second =
        await createUserAndLogin();

      await RecurringExpense.create({
        user: first.user._id,
        title: "First User Recurring",
        category: "Bills",
        amount: 500,
        nextDueDate: futureDate()
      });

      await RecurringExpense.create({
        user: second.user._id,
        title: "Second User Recurring",
        category: "Rent",
        amount: 9000,
        nextDueDate: futureDate()
      });

      const response = await request(app)
        .get("/api/recurring-expenses")
        .set(
          "Authorization",
          `Bearer ${first.token}`
        )
        .expect(200);

      expect(response.body.data).toHaveLength(1);

      expect(response.body.data[0].title).toBe(
        "First User Recurring"
      );

      expect(
        response.body.data
          .map((item) => item.title)
      ).not.toContain(
        "Second User Recurring"
      );
    }
  );

  test(
    "DELETE /api/recurring-expenses/:id deletes owned recurring expense",
    async () => {
      const { user, token } =
        await createUserAndLogin();

      const recurringExpense =
        await RecurringExpense.create({
          user: user._id,
          title: "Delete Me",
          category: "Subscription",
          amount: 299,
          nextDueDate: futureDate()
        });

      const response = await request(app)
        .delete(
          `/api/recurring-expenses/${recurringExpense._id}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

      expect(response.body.success).toBe(true);

      const stored =
        await RecurringExpense.findById(
          recurringExpense._id
        );

      expect(stored).toBeNull();
    }
  );

  test(
    "DELETE /api/recurring-expenses/:id cannot delete another user's recurring expense",
    async () => {
      const first =
        await createUserAndLogin();

      const second =
        await createUserAndLogin();

      const recurringExpense =
        await RecurringExpense.create({
          user: second.user._id,
          title: "Protected Recurring",
          category: "Insurance",
          amount: 2000,
          nextDueDate: futureDate()
        });

      const response = await request(app)
        .delete(
          `/api/recurring-expenses/${recurringExpense._id}`
        )
        .set(
          "Authorization",
          `Bearer ${first.token}`
        )
        .expect(404);

      expect(response.body.success).toBe(false);

      const stored =
        await RecurringExpense.findById(
          recurringExpense._id
        );

      expect(stored).not.toBeNull();
    }
  );
});
