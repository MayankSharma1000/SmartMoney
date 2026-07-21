const request = require("supertest");
const app = require("../app");

/* ========================= */
/* TEST HELPERS */
/* ========================= */

const createUserAndToken = async (
  email = "budget-user@example.com"
) => {
  const response =
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Budget User",
        email,
        password: "Password123"
      })
      .expect(201);

  return response.body.token;
};

const currentMonth =
  new Date().toLocaleString("default", {
    month: "long"
  });

const currentYear =
  new Date().getFullYear();

const validBudget = {
  monthlyBudget: 50000,
  month: currentMonth,
  year: currentYear
};

/* ========================= */
/* BUDGET API */
/* ========================= */

describe("Budget API", () => {
  /* ========================= */
  /* AUTHENTICATION */
  /* ========================= */

  test("POST /api/budget rejects unauthenticated request", async () => {
    const response =
      await request(app)
        .post("/api/budget")
        .send(validBudget)
        .expect(401);

    expect(response.body.success).toBe(false);
  });

  test("GET /api/budget rejects unauthenticated request", async () => {
    const response =
      await request(app)
        .get("/api/budget")
        .expect(401);

    expect(response.body.success).toBe(false);
  });

  /* ========================= */
  /* CREATE / UPSERT */
  /* ========================= */

  test("POST /api/budget creates a budget", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validBudget)
        .expect(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toMatchObject({
      monthlyBudget:
        validBudget.monthlyBudget,
      month: validBudget.month,
      year: validBudget.year
    });

    expect(response.body.data._id).toEqual(
      expect.any(String)
    );
  });

  test("POST /api/budget rejects zero monthly budget", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validBudget,
          monthlyBudget: 0
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid monthly budget"
    );
  });

  test("POST /api/budget rejects negative monthly budget", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validBudget,
          monthlyBudget: -1
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("POST /api/budget rejects malformed monthly budget", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validBudget,
          monthlyBudget:
            "not-a-number"
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid monthly budget"
    );
  });

  test("POST /api/budget rejects year below supported range", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validBudget,
          year: 2019
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid budget year"
    );
  });

  test("POST /api/budget rejects year above supported range", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validBudget,
          year: 2101
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("POST /api/budget rejects malformed year", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validBudget,
          year: "not-a-year"
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid budget year"
    );
  });

  test("POST /api/budget rejects fractional year", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validBudget,
          year: 2026.5
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("POST /api/budget rejects invalid month", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validBudget,
          month: "NotAMonth"
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid budget month"
    );
  });

  test("POST /api/budget rejected invalid month does not disturb stored budget", async () => {
    const token =
      await createUserAndToken();

    const currentMonth =
      new Date().toLocaleString("default", {
        month: "long"
      });

    const currentYear =
      new Date().getFullYear();

    const originalBudget = 50000;

    await request(app)
      .post("/api/budget")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        monthlyBudget: originalBudget,
        month: currentMonth,
        year: currentYear
      })
      .expect(200);

    const rejectedResponse =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          monthlyBudget: 90000,
          month: "NotAMonth",
          year: currentYear
        })
        .expect(400);

    expect(
      rejectedResponse.body.success
    ).toBe(false);

    expect(
      rejectedResponse.body.message
    ).toBe(
      "Please enter a valid budget month"
    );

    const response =
      await request(app)
        .get("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    expect(response.body.success).toBe(true);

    expect(
      response.body.data.monthlyBudget
    ).toBe(originalBudget);

    expect(
      response.body.data.month
    ).toBe(currentMonth);

    expect(
      response.body.data.year
    ).toBe(currentYear);
  });

  test("POST /api/budget defaults month and year to current period", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          monthlyBudget: 42000
        })
        .expect(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toMatchObject({
      monthlyBudget: 42000,
      month: currentMonth,
      year: currentYear
    });
  });

  test("POST /api/budget updates existing budget for same month and year", async () => {
    const token =
      await createUserAndToken();

    const first =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validBudget)
        .expect(200);

    const second =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validBudget,
          monthlyBudget: 65000
        })
        .expect(200);

    expect(second.body.success).toBe(true);

    expect(
      second.body.data.monthlyBudget
    ).toBe(65000);

    expect(second.body.data._id).toBe(
      first.body.data._id
    );
  });

  /* ========================= */
  /* READ */
  /* ========================= */

  test("GET /api/budget returns current user's current budget", async () => {
    const token =
      await createUserAndToken();

    await request(app)
      .post("/api/budget")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send(validBudget)
      .expect(200);

    const response =
      await request(app)
        .get("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toMatchObject({
      monthlyBudget:
        validBudget.monthlyBudget,
      month: currentMonth,
      year: currentYear
    });
  });

  test("GET /api/budget returns null when current budget does not exist", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .get("/api/budget")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeNull();
  });

  test("GET /api/budget isolates budgets between users", async () => {
    const firstToken =
      await createUserAndToken(
        "budget-first@example.com"
      );

    const secondToken =
      await createUserAndToken(
        "budget-second@example.com"
      );

    await request(app)
      .post("/api/budget")
      .set(
        "Authorization",
        `Bearer ${firstToken}`
      )
      .send({
        ...validBudget,
        monthlyBudget: 75000
      })
      .expect(200);

    const response =
      await request(app)
        .get("/api/budget")
        .set(
          "Authorization",
          `Bearer ${secondToken}`
        )
        .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeNull();
  });

  test("POST /api/budget keeps same period isolated between users", async () => {
    const firstToken =
      await createUserAndToken(
        "budget-owner-one@example.com"
      );

    const secondToken =
      await createUserAndToken(
        "budget-owner-two@example.com"
      );

    const first =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${firstToken}`
        )
        .send({
          ...validBudget,
          monthlyBudget: 30000
        })
        .expect(200);

    const second =
      await request(app)
        .post("/api/budget")
        .set(
          "Authorization",
          `Bearer ${secondToken}`
        )
        .send({
          ...validBudget,
          monthlyBudget: 90000
        })
        .expect(200);

    expect(first.body.data._id).not.toBe(
      second.body.data._id
    );

    expect(
      first.body.data.monthlyBudget
    ).toBe(30000);

    expect(
      second.body.data.monthlyBudget
    ).toBe(90000);
  });
});
