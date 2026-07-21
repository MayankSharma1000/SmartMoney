const request = require("supertest");
const app = require("../app");

/* ========================= */
/* TEST HELPERS */
/* ========================= */

const createUserAndToken = async (
  email = "investment-user@example.com"
) => {
  const response =
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Investment User",
        email,
        password: "Password123"
      })
      .expect(201);

  return response.body.token;
};

const validInvestment = {
  name: "Nifty 50 Index Fund",
  type: "Mutual Fund",
  investedAmount: 50000,
  currentValue: 55000,
  purchaseDate: "2026-01-15",
  platform: "Zerodha",
  notes: "Long-term investment"
};

const createInvestment = async (
  token,
  overrides = {}
) => {
  const response =
    await request(app)
      .post("/api/investments")
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        ...validInvestment,
        ...overrides
      })
      .expect(201);

  return response.body.data;
};

/* ========================= */
/* INVESTMENT API */
/* ========================= */

describe("Investment API", () => {
  /* ========================= */
  /* AUTHENTICATION */
  /* ========================= */

  test("POST /api/investments rejects unauthenticated request", async () => {
    const response =
      await request(app)
        .post("/api/investments")
        .send(validInvestment)
        .expect(401);

    expect(response.body.success).toBe(false);
  });

  /* ========================= */
  /* CREATE */
  /* ========================= */

  test("POST /api/investments creates an investment", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/investments")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validInvestment)
        .expect(201);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toMatchObject({
      name: validInvestment.name,
      type: validInvestment.type,
      investedAmount:
        validInvestment.investedAmount,
      currentValue:
        validInvestment.currentValue,
      platform: validInvestment.platform,
      notes: validInvestment.notes
    });

    expect(response.body.data._id).toEqual(
      expect.any(String)
    );

    expect(response.body.data.profit).toBe(
      validInvestment.currentValue -
        validInvestment.investedAmount
    );
  });

  test("POST /api/investments rejects invalid invested amount", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/investments")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validInvestment,
          investedAmount: 0
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid invested amount"
    );
  });

  test("POST /api/investments rejects malformed invested amount", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/investments")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validInvestment,
          investedAmount: "not-a-number"
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("POST /api/investments rejects negative current value", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/investments")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validInvestment,
          currentValue: -1
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid current value"
    );
  });

  test("POST /api/investments rejects malformed current value", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/investments")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validInvestment,
          currentValue: "not-a-number"
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("POST /api/investments rejects invalid purchase date", async () => {
    const token =
      await createUserAndToken();

    const response =
      await request(app)
        .post("/api/investments")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          ...validInvestment,
          purchaseDate: "not-a-date"
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid purchase date"
    );
  });

  /* ========================= */
  /* READ */
  /* ========================= */

  test("GET /api/investments returns authenticated user's investments", async () => {
    const token =
      await createUserAndToken();

    await createInvestment(token);

    const response =
      await request(app)
        .get("/api/investments")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.count).toBe(1);

    expect(
      response.body.data.investments
    ).toHaveLength(1);

    expect(
      response.body.data.investments[0]
    ).toMatchObject({
      name: validInvestment.name,
      type: validInvestment.type
    });
  });

  test("GET /api/investments isolates records between users", async () => {
    const firstToken =
      await createUserAndToken(
        "investment-first@example.com"
      );

    const secondToken =
      await createUserAndToken(
        "investment-second@example.com"
      );

    await createInvestment(firstToken);

    await createInvestment(
      secondToken,
      {
        name: "Gold Investment",
        type: "Gold"
      }
    );

    const response =
      await request(app)
        .get("/api/investments")
        .set(
          "Authorization",
          `Bearer ${firstToken}`
        )
        .expect(200);

    expect(response.body.data.count).toBe(1);

    expect(
      response.body.data.investments[0].name
    ).toBe(validInvestment.name);
  });

  /* ========================= */
  /* UPDATE */
  /* ========================= */

  test("PUT /api/investments/:id updates owned investment", async () => {
    const token =
      await createUserAndToken();

    const investment =
      await createInvestment(token);

    const response =
      await request(app)
        .put(
          `/api/investments/${investment._id}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          currentValue: 60000,
          platform: "Groww"
        })
        .expect(200);

    expect(response.body.success).toBe(true);

    expect(response.body.data).toMatchObject({
      currentValue: 60000,
      platform: "Groww"
    });

    expect(response.body.data.profit).toBe(
      10000
    );
  });

  test("PUT /api/investments/:id rejects invalid purchase date", async () => {
    const token =
      await createUserAndToken();

    const investment =
      await createInvestment(token);

    const response =
      await request(app)
        .put(
          `/api/investments/${investment._id}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          purchaseDate: "not-a-date"
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Please enter a valid purchase date"
    );
  });

  test("PUT /api/investments/:id rejects invalid invested amount", async () => {
    const token =
      await createUserAndToken();

    const investment =
      await createInvestment(token);

    const response =
      await request(app)
        .put(
          `/api/investments/${investment._id}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          investedAmount: 0
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("PUT /api/investments/:id rejects malformed invested amount", async () => {
    const token =
      await createUserAndToken();

    const investment =
      await createInvestment(token);

    const response =
      await request(app)
        .put(
          `/api/investments/${investment._id}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          investedAmount: "not-a-number"
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("PUT /api/investments/:id rejects negative current value", async () => {
    const token =
      await createUserAndToken();

    const investment =
      await createInvestment(token);

    const response =
      await request(app)
        .put(
          `/api/investments/${investment._id}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          currentValue: -1
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("PUT /api/investments/:id rejects malformed current value", async () => {
    const token =
      await createUserAndToken();

    const investment =
      await createInvestment(token);

    const response =
      await request(app)
        .put(
          `/api/investments/${investment._id}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          currentValue: "not-a-number"
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("PUT /api/investments/:id rejected invested amount does not mutate investment", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/investments")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validInvestment)
        .expect(201);

    const investmentId =
      created.body.data._id;

    await request(app)
      .put(
        `/api/investments/${investmentId}`
      )
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        investedAmount: 0
      })
      .expect(400);

    const response =
      await request(app)
        .get("/api/investments")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    const investment =
      response.body.data.investments.find(
        (item) =>
          item._id === investmentId
      );

    expect(investment).toBeDefined();

    expect(
      investment.investedAmount
    ).toBe(
      validInvestment.investedAmount
    );
  });

  test("PUT /api/investments/:id rejected current value does not mutate investment", async () => {
    const token =
      await createUserAndToken();

    const created =
      await request(app)
        .post("/api/investments")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send(validInvestment)
        .expect(201);

    const investmentId =
      created.body.data._id;

    await request(app)
      .put(
        `/api/investments/${investmentId}`
      )
      .set(
        "Authorization",
        `Bearer ${token}`
      )
      .send({
        currentValue: -1
      })
      .expect(400);

    const response =
      await request(app)
        .get("/api/investments")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    const investment =
      response.body.data.investments.find(
        (item) =>
          item._id === investmentId
      );

    expect(investment).toBeDefined();

    expect(
      investment.currentValue
    ).toBe(
      validInvestment.currentValue
    );
  });

  test("PUT /api/investments/:id cannot update another user's investment", async () => {
    const ownerToken =
      await createUserAndToken(
        "investment-owner@example.com"
      );

    const otherToken =
      await createUserAndToken(
        "investment-other@example.com"
      );

    const investment =
      await createInvestment(ownerToken);

    const response =
      await request(app)
        .put(
          `/api/investments/${investment._id}`
        )
        .set(
          "Authorization",
          `Bearer ${otherToken}`
        )
        .send({
          currentValue: 999999
        })
        .expect(404);

    expect(response.body.success).toBe(false);

    const ownerResponse =
      await request(app)
        .get("/api/investments")
        .set(
          "Authorization",
          `Bearer ${ownerToken}`
        )
        .expect(200);

    expect(
      ownerResponse.body.data.investments[0]
        .currentValue
    ).toBe(validInvestment.currentValue);
  });

  /* ========================= */
  /* DELETE */
  /* ========================= */

  test("DELETE /api/investments/:id deletes owned investment", async () => {
    const token =
      await createUserAndToken();

    const investment =
      await createInvestment(token);

    const response =
      await request(app)
        .delete(
          `/api/investments/${investment._id}`
        )
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    expect(response.body.success).toBe(true);

    const listResponse =
      await request(app)
        .get("/api/investments")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

    expect(listResponse.body.data.count).toBe(0);
  });

  test("DELETE /api/investments/:id cannot delete another user's investment", async () => {
    const ownerToken =
      await createUserAndToken(
        "investment-delete-owner@example.com"
      );

    const otherToken =
      await createUserAndToken(
        "investment-delete-other@example.com"
      );

    const investment =
      await createInvestment(ownerToken);

    const response =
      await request(app)
        .delete(
          `/api/investments/${investment._id}`
        )
        .set(
          "Authorization",
          `Bearer ${otherToken}`
        )
        .expect(404);

    expect(response.body.success).toBe(false);

    const ownerResponse =
      await request(app)
        .get("/api/investments")
        .set(
          "Authorization",
          `Bearer ${ownerToken}`
        )
        .expect(200);

    expect(ownerResponse.body.data.count).toBe(1);
  });
});
