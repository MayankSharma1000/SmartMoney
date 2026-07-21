const request = require("supertest");
const app = require("../app");

/* ========================= */
/* TEST HELPERS */
/* ========================= */

const createUserAndToken = async (
  email = "savings-user@example.com"
) => {
  const response =
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Savings User",
        email,
        password: "Password123"
      })
      .expect(201);

  return response.body.token;
};

const validGoal = {
  title: "Emergency Fund",
  targetAmount: 100000,
  currentAmount: 25000,
  targetDate: "2027-07-21",
  category: "Emergency Fund",
  notes: "Six month emergency reserve"
};

/* ========================= */
/* SAVINGS API */
/* ========================= */

describe("Savings API", () => {
  /* ========================= */
  /* AUTHENTICATION */
  /* ========================= */

  test("POST /api/savings rejects unauthenticated request", async () => {
    const response =
      await request(app)
        .post("/api/savings")
        .send(validGoal)
        .expect(401);

    expect(response.body.success).toBe(false);
  });

  /* ========================= */
  /* CREATE */
  /* ========================= */

  test("POST /api/savings creates a savings goal", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validGoal)
        .expect(201);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toMatchObject({
      title: validGoal.title,
      targetAmount:
        validGoal.targetAmount,
      currentAmount:
        validGoal.currentAmount,
      category: validGoal.category,
      notes: validGoal.notes,
      isCompleted: false
    });

    expect(response.body.data._id).toEqual(
      expect.any(String)
    );
  });

  test("POST /api/savings defaults current amount to zero", async () => {
    const token =
      await createUserAndToken();

    const {
      currentAmount,
      ...goalWithoutCurrentAmount
    } = validGoal;

    const response =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(goalWithoutCurrentAmount)
        .expect(201);

    expect(
      response.body.data.currentAmount
    ).toBe(0);

    expect(
      response.body.data.isCompleted
    ).toBe(false);
  });

  test("POST /api/savings rejects invalid target amount", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validGoal,
          targetAmount: 0
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid target amount"
    );
  });

  test("POST /api/savings rejects malformed target amount", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validGoal,
          targetAmount: "not-a-number"
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid target amount"
    );
  });

  test("POST /api/savings rejects current amount above target", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validGoal,
          targetAmount: 10000,
          currentAmount: 10001
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Current amount must be between 0 and the target amount"
    );
  });

  test("POST /api/savings rejects negative current amount", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validGoal,
          currentAmount: -1
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("POST /api/savings rejects invalid target date", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validGoal,
          targetDate: "not-a-date"
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid target date"
    );
  });

  test("POST /api/savings marks fully funded goal completed", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validGoal,
          targetAmount: 50000,
          currentAmount: 50000
        })
        .expect(201);

    expect(
      response.body.data.isCompleted
    ).toBe(true);
  });

  /* ========================= */
  /* READ */
  /* ========================= */

  test("GET /api/savings returns authenticated user's goals", async () => {
    const token =
      await createUserAndToken();

    await request(app)
      .post("/api/savings")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send(validGoal)
      .expect(201);

    const response =
      await request(app)
        .get("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.count).toBe(1);

    expect(response.body.data.goals)
      .toHaveLength(1);

    expect(
      response.body.data.goals[0].title
    ).toBe(validGoal.title);
  });

  test("GET /api/savings isolates goals between users", async () => {
    const firstToken =
      await createUserAndToken(
        "savings-first@example.com"
      );

    const secondToken =
      await createUserAndToken(
        "savings-second@example.com"
      );

    await request(app)
      .post("/api/savings")
      .set(
        "Authorization",
        `Bearer ${firstToken}`
      )
      .send(validGoal)
      .expect(201);

    const response =
      await request(app)
        .get("/api/savings")
        .set(
          "Authorization",
          `Bearer ${secondToken}`
        )
        .expect(200);

    expect(response.body.data.count).toBe(0);

    expect(response.body.data.goals)
      .toHaveLength(0);
  });

  /* ========================= */
  /* UPDATE */
  /* ========================= */

  test("PUT /api/savings/:id updates owned goal", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validGoal)
        .expect(201);

    const goalId =
      created.body.data._id;

    const response =
      await request(app)
        .put(`/api/savings/${goalId}`)
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          title: "Updated Emergency Fund",
          currentAmount: 40000
        })
        .expect(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data.title).toBe(
      "Updated Emergency Fund"
    );

    expect(
      response.body.data.currentAmount
    ).toBe(40000);
  });

  test("PUT /api/savings/:id marks goal completed when fully funded", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validGoal)
        .expect(201);

    const goalId =
      created.body.data._id;

    const response =
      await request(app)
        .put(`/api/savings/${goalId}`)
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          currentAmount:
            validGoal.targetAmount
        })
        .expect(200);

    expect(
      response.body.data.isCompleted
    ).toBe(true);
  });

  test("PUT /api/savings/:id rejects invalid target date", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validGoal)
        .expect(201);

    const goalId =
      created.body.data._id;

    const response =
      await request(app)
        .put(`/api/savings/${goalId}`)
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          targetDate: "not-a-date"
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid target date"
    );
  });

  test("PUT /api/savings/:id rejects negative current amount", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validGoal)
        .expect(201);

    const goalId =
      created.body.data._id;

    const response =
      await request(app)
        .put(`/api/savings/${goalId}`)
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          currentAmount: -1
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("PUT /api/savings/:id rejects current amount above target", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validGoal)
        .expect(201);

    const goalId =
      created.body.data._id;

    const response =
      await request(app)
        .put(`/api/savings/${goalId}`)
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          currentAmount:
            validGoal.targetAmount + 1
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("PUT /api/savings/:id rejects malformed target amount", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validGoal)
        .expect(201);

    const goalId =
      created.body.data._id;

    const response =
      await request(app)
        .put(`/api/savings/${goalId}`)
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          targetAmount: "not-a-number"
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("PUT /api/savings/:id rejects target below existing current amount", async () => {
    const token =
      await createUserAndToken();

    const createResponse =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validGoal,
          targetAmount: 50000,
          currentAmount: 40000
        })
        .expect(201);

    const goalId =
      createResponse.body.data._id;

    const response =
      await request(app)
        .put(
          `/api/savings/${goalId}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          targetAmount: 30000
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Current amount must be between 0 and the target amount"
    );

    const getResponse =
      await request(app)
        .get("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    const savedGoal =
      getResponse.body.data.goals.find(
        (goal) =>
          goal._id === goalId
      );

    expect(savedGoal).toBeDefined();

    expect(savedGoal.targetAmount).toBe(
      50000
    );

    expect(savedGoal.currentAmount).toBe(
      40000
    );
  });

  test("PUT /api/savings/:id cannot update another user's goal", async () => {
    const ownerToken =
      await createUserAndToken(
        "savings-owner@example.com"
      );

    const otherToken =
      await createUserAndToken(
        "savings-other@example.com"
      );

    const created =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${ownerToken}`
        )
        .send(validGoal)
        .expect(201);

    const goalId =
      created.body.data._id;

    const response =
      await request(app)
        .put(`/api/savings/${goalId}`)
        .set(
          "Authorization",
          `Bearer ${otherToken}`
        )
        .send({
          title: "Unauthorized Change"
        })
        .expect(404);

    expect(response.body.success).toBe(false);
  });

  /* ========================= */
  /* DELETE */
  /* ========================= */

  test("DELETE /api/savings/:id deletes owned goal", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validGoal)
        .expect(201);

    const goalId =
      created.body.data._id;

    const response =
      await request(app)
        .delete(`/api/savings/${goalId}`)
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    expect(response.body.success).toBe(true);

    const afterDelete =
      await request(app)
        .get("/api/savings")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    expect(
      afterDelete.body.data.count
    ).toBe(0);
  });

  test("DELETE /api/savings/:id cannot delete another user's goal", async () => {
    const ownerToken =
      await createUserAndToken(
        "savings-delete-owner@example.com"
      );

    const otherToken =
      await createUserAndToken(
        "savings-delete-other@example.com"
      );

    const created =
      await request(app)
        .post("/api/savings")
        .set(
          "Authorization",
          `Bearer ${ownerToken}`
        )
        .send(validGoal)
        .expect(201);

    const goalId =
      created.body.data._id;

    await request(app)
      .delete(`/api/savings/${goalId}`)
      .set(
        "Authorization",
        `Bearer ${otherToken}`
      )
      .expect(200);

    const ownerGoals =
      await request(app)
        .get("/api/savings")
        .set(
          "Authorization",
          `Bearer ${ownerToken}`
        )
        .expect(200);

    expect(ownerGoals.body.data.count)
      .toBe(1);
  });
});
