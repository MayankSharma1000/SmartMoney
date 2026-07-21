const request = require("supertest");
const app = require("../app");

describe("API health check", () => {
  test("GET / returns API health response", async () => {
    const response =
      await request(app)
        .get("/")
        .expect(200);

    expect(response.body).toEqual({
      success: true,
      message:
        "Smart Expense Tracker API Running 🚀"
    });
  });
});
