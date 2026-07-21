const request = require("supertest");
const app = require("../app");

/* ========================= */
/* TEST HELPERS */
/* ========================= */

const createUserAndToken = async (
  email = "expense-user@example.com"
) => {
  const response =
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Expense User",
        email,
        password: "Password123"
      })
      .expect(201);

  return response.body.token;
};

const validExpense = {
  title: "Groceries",
  category: "Food",
  amount: 1250.5,
  date: "2026-07-20",
  note: "Weekly groceries",
  paymentMethod: "UPI"
};

/* ========================= */
/* EXPENSE API */
/* ========================= */

describe("Expense API", () => {
  /* ========================= */
  /* AUTHENTICATION */
  /* ========================= */

  test("POST /api/expenses rejects unauthenticated request", async () => {
    const response =
      await request(app)
        .post("/api/expenses")
        .send(validExpense)
        .expect(401);

    expect(response.body.success).toBe(false);
  });

  /* ========================= */
  /* CREATE */
  /* ========================= */

  test("POST /api/expenses creates an expense", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validExpense)
        .expect(201);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toMatchObject({
      title: validExpense.title,
      category: validExpense.category,
      amount: validExpense.amount,
      note: validExpense.note,
      paymentMethod:
        validExpense.paymentMethod
    });

    expect(response.body.data._id).toEqual(
      expect.any(String)
    );
  });

  test("POST /api/expenses rejects zero amount", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validExpense,
          amount: 0
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid expense amount"
    );
  });

  test("POST /api/expenses rejects negative amount", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validExpense,
          amount: -500
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("POST /api/expenses rejects invalid date", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validExpense,
          date: "not-a-date"
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid expense date"
    );
  });

  /* ========================= */
  /* READ */
  /* ========================= */

  test("GET /api/expenses returns authenticated user's expenses", async () => {
    const token =
      await createUserAndToken();

    await request(app)
      .post("/api/expenses")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send(validExpense)
      .expect(201);

    const response =
      await request(app)
        .get("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.count).toBe(1);

    expect(
      response.body.data.expenses
    ).toHaveLength(1);

    expect(
      response.body.data.expenses[0].title
    ).toBe(validExpense.title);
  });

  test("GET /api/expenses isolates records between users", async () => {
    const firstToken =
      await createUserAndToken(
        "expense-owner@example.com"
      );

    const secondToken =
      await createUserAndToken(
        "expense-other@example.com"
      );

    await request(app)
      .post("/api/expenses")
      .set(
        "Authorization",
        `Bearer ${firstToken}`
      )
      .send(validExpense)
      .expect(201);

    const response =
      await request(app)
        .get("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${secondToken}`
        )
        .expect(200);

    expect(response.body.data.count).toBe(0);

    expect(
      response.body.data.expenses
    ).toHaveLength(0);
  });

  /* ========================= */
  /* UPDATE */
  /* ========================= */

  test("PUT /api/expenses/:id updates owned expense", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validExpense)
        .expect(201);

    const expenseId =
      created.body.data._id;

    const response =
      await request(app)
        .put(
          `/api/expenses/${expenseId}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Updated Groceries",
          amount: 1800
        })
        .expect(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.title).toBe(
      "Updated Groceries"
    );

    expect(response.body.data.amount).toBe(
      1800
    );
  });

  test("PUT /api/expenses/:id rejects negative amount", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validExpense)
        .expect(201);

    const expenseId =
      created.body.data._id;

    const response =
      await request(app)
        .put(
          `/api/expenses/${expenseId}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          amount: -1
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid expense amount"
    );
  });

  test("PUT /api/expenses/:id rejects malformed amount", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validExpense)
        .expect(201);

    const expenseId =
      created.body.data._id;

    const response =
      await request(app)
        .put(
          `/api/expenses/${expenseId}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          amount: "not-a-number"
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid expense amount"
    );
  });

  test("PUT /api/expenses/:id rejects invalid date", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validExpense)
        .expect(201);

    const expenseId =
      created.body.data._id;

    const response =
      await request(app)
        .put(
          `/api/expenses/${expenseId}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          date: "invalid-date"
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid expense date"
    );
  });

  test("PUT /api/expenses/:id cannot update another user's expense", async () => {
    const ownerToken =
      await createUserAndToken(
        "update-owner@example.com"
      );

    const otherToken =
      await createUserAndToken(
        "update-other@example.com"
      );

    const created =
      await request(app)
        .post("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${ownerToken}`
        )
        .send(validExpense)
        .expect(201);

    const expenseId =
      created.body.data._id;

    const response =
      await request(app)
        .put(
          `/api/expenses/${expenseId}`
        )
        .set(
          "Authorization",
          `Bearer ${otherToken}`
        )
        .send({
          title: "Unauthorized Update"
        })
        .expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      "Expense not found"
    );
  });

  /* ========================= */
  /* DELETE */
  /* ========================= */

  test("DELETE /api/expenses/:id deletes owned expense", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validExpense)
        .expect(201);

    const expenseId =
      created.body.data._id;

    const response =
      await request(app)
        .delete(
          `/api/expenses/${expenseId}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    expect(response.body.success).toBe(true);

    const expenses =
      await request(app)
        .get("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    expect(expenses.body.data.count).toBe(0);
  });

  test("DELETE /api/expenses/:id cannot delete another user's expense", async () => {
    const ownerToken =
      await createUserAndToken(
        "delete-owner@example.com"
      );

    const otherToken =
      await createUserAndToken(
        "delete-other@example.com"
      );

    const created =
      await request(app)
        .post("/api/expenses")
        .set(
          "Authorization",
          `Bearer ${ownerToken}`
        )
        .send(validExpense)
        .expect(201);

    const expenseId =
      created.body.data._id;

    const response =
      await request(app)
        .delete(
          `/api/expenses/${expenseId}`
        )
        .set(
          "Authorization",
          `Bearer ${otherToken}`
        )
        .expect(404);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Expense not found"
    );
  });
});
