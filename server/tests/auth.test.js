const request = require("supertest");
const app = require("../app");

describe("Authentication API", () => {
  const validUser = {
    name: "Test User",
    email: "test@example.com",
    password: "Password123"
  };

  /* ========================= */
  /* REGISTER */
  /* ========================= */

  test("POST /api/auth/register creates a user", async () => {
    const response =
      await request(app)
        .post("/api/auth/register")
        .send(validUser)
        .expect(201);

    expect(response.body.success).toBe(true);

    expect(response.body.user).toMatchObject({
      name: validUser.name,
      email: validUser.email,
      role: "user",
      onboardingCompleted: false
    });

    expect(response.body.token).toEqual(
      expect.any(String)
    );

    expect(
      response.body.user.password
    ).toBeUndefined();
  });

  test("POST /api/auth/register rejects invalid email", async () => {
    const response =
      await request(app)
        .post("/api/auth/register")
        .send({
          ...validUser,
          email: "invalid-email"
        })
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Invalid email format"
    );
  });

  test("POST /api/auth/register rejects weak password", async () => {
    const response =
      await request(app)
        .post("/api/auth/register")
        .send({
          ...validUser,
          password: "weak"
        })
        .expect(400);

    expect(response.body.success).toBe(false);
  });

  test("POST /api/auth/register rejects duplicate email", async () => {
    await request(app)
      .post("/api/auth/register")
      .send(validUser)
      .expect(201);

    const response =
      await request(app)
        .post("/api/auth/register")
        .send(validUser)
        .expect(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "User already exists"
    );
  });

  /* ========================= */
  /* LOGIN */
  /* ========================= */

  test("POST /api/auth/login authenticates valid credentials", async () => {
    await request(app)
      .post("/api/auth/register")
      .send(validUser)
      .expect(201);

    const response =
      await request(app)
        .post("/api/auth/login")
        .send({
          email: validUser.email,
          password: validUser.password
        })
        .expect(200);

    expect(response.body.success).toBe(true);

    expect(response.body.user.email).toBe(
      validUser.email
    );

    expect(response.body.token).toEqual(
      expect.any(String)
    );
  });

  test("POST /api/auth/login rejects incorrect password", async () => {
    await request(app)
      .post("/api/auth/register")
      .send(validUser)
      .expect(201);

    const response =
      await request(app)
        .post("/api/auth/login")
        .send({
          email: validUser.email,
          password: "WrongPassword123"
        })
        .expect(401);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe(
      "Invalid credentials"
    );
  });

  /* ========================= */
  /* PROTECTED ONBOARDING */
  /* ========================= */

  test("PATCH /api/auth/onboarding rejects unauthenticated request", async () => {
    const response =
      await request(app)
        .patch("/api/auth/onboarding")
        .send({
          monthlyIncome: 50000,
          currency: "INR",
          employmentType: "Salaried"
        })
        .expect(401);

    expect(response.body.success).toBe(false);
  });

  test("PATCH /api/auth/onboarding updates authenticated user", async () => {
    const registerResponse =
      await request(app)
        .post("/api/auth/register")
        .send(validUser)
        .expect(201);

    const token =
      registerResponse.body.token;

    const response =
      await request(app)
        .patch("/api/auth/onboarding")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          monthlyIncome: 50000,
          currency: "INR",
          employmentType: "Salaried"
        })
        .expect(200);

    expect(response.body.success).toBe(true);

    expect(response.body.user).toMatchObject({
      monthlyIncome: 50000,
      currency: "INR",
      employmentType: "Salaried",
      onboardingCompleted: true
    });
  });
});
