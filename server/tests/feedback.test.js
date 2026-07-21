const request = require("supertest");

const app = require("../app");
const User = require("../models/User");
const Feedback = require("../models/Feedback");

const createUserAndToken = async ({
  name = "Feedback User",
  email = "feedback@example.com"
} = {}) => {
  const password = "Password123!";

  await request(app)
    .post("/api/auth/register")
    .send({
      name,
      email,
      password
    })
    .expect(201);

  const loginResponse = await request(app)
    .post("/api/auth/login")
    .send({
      email,
      password
    })
    .expect(200);

  const token =
    loginResponse.body?.data?.token ||
    loginResponse.body?.token;

  const user = await User.findOne({
    email
  });

  return {
    user,
    token
  };
};

describe("Feedback API", () => {
  test(
    "POST /api/feedback rejects unauthenticated request",
    async () => {
      await request(app)
        .post("/api/feedback")
        .send({
          message: "Useful application."
        })
        .expect(401);
    }
  );

  test(
    "GET /api/feedback rejects unauthenticated request",
    async () => {
      await request(app)
        .get("/api/feedback")
        .expect(401);
    }
  );

  test(
    "POST /api/feedback creates feedback",
    async () => {
      const { user, token } =
        await createUserAndToken();

      const response = await request(app)
        .post("/api/feedback")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          message:
            "The financial dashboard is useful."
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeTruthy();

      expect(response.body.data.message).toBe(
        "The financial dashboard is useful."
      );

      expect(response.body.data.status).toBe(
        "New"
      );

      expect(
        response.body.data.user.toString()
      ).toBe(user._id.toString());

      expect(response.body.data.name).toBe(
        user.name
      );

      expect(response.body.data.email).toBe(
        user.email
      );

      const stored = await Feedback.findOne({
        user: user._id
      });

      expect(stored).toBeTruthy();

      expect(stored.message).toBe(
        "The financial dashboard is useful."
      );
    }
  );

  test(
    "POST /api/feedback rejects missing message",
    async () => {
      const { user, token } =
        await createUserAndToken();

      const response = await request(app)
        .post("/api/feedback")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);

      expect(
        await Feedback.countDocuments({
          user: user._id
        })
      ).toBe(0);
    }
  );

  test(
    "POST /api/feedback rejects message shorter than five characters",
    async () => {
      const { user, token } =
        await createUserAndToken();

      const response = await request(app)
        .post("/api/feedback")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          message: "Bad"
        })
        .expect(400);

      expect(response.body.success).toBe(false);

      expect(
        await Feedback.countDocuments({
          user: user._id
        })
      ).toBe(0);
    }
  );

  test(
    "POST /api/feedback uses authenticated user identity",
    async () => {
      const { user, token } =
        await createUserAndToken();

      const response = await request(app)
        .post("/api/feedback")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          name: "Forged Name",
          email: "forged@example.com",
          user: "000000000000000000000000",
          message:
            "Authenticated identity must win."
        })
        .expect(201);

      expect(response.body.data.name).toBe(
        user.name
      );

      expect(response.body.data.email).toBe(
        user.email
      );

      expect(
        response.body.data.user.toString()
      ).toBe(user._id.toString());
    }
  );

  test(
    "POST /api/feedback rejects message longer than maximum length",
    async () => {
      const { user, token } =
        await createUserAndToken();

      const response = await request(app)
        .post("/api/feedback")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .send({
          message: "a".repeat(1001)
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);

      expect(
        await Feedback.countDocuments({
          user: user._id
        })
      ).toBe(0);
    }
  );

  test(
    "GET /api/feedback returns authenticated user's feedback",
    async () => {
      const { user, token } =
        await createUserAndToken();

      await Feedback.create([
        {
          user: user._id,
          name: user.name,
          email: user.email,
          message: "First feedback message"
        },
        {
          user: user._id,
          name: user.name,
          email: user.email,
          message: "Second feedback message"
        }
      ]);

      const response = await request(app)
        .get("/api/feedback")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data))
        .toBe(true);

      expect(response.body.data).toHaveLength(2);
    }
  );

  test(
    "GET /api/feedback isolates feedback between users",
    async () => {
      const first =
        await createUserAndToken({
          name: "First User",
          email: "first-feedback@example.com"
        });

      const second =
        await createUserAndToken({
          name: "Second User",
          email: "second-feedback@example.com"
        });

      await Feedback.create({
        user: first.user._id,
        name: first.user.name,
        email: first.user.email,
        message: "First user's feedback"
      });

      await Feedback.create({
        user: second.user._id,
        name: second.user.name,
        email: second.user.email,
        message: "Second user's feedback"
      });

      const response = await request(app)
        .get("/api/feedback")
        .set(
          "Authorization",
          `Bearer ${first.token}`
        )
        .expect(200);

      expect(response.body.data).toHaveLength(1);

      expect(response.body.data[0].message).toBe(
        "First user's feedback"
      );

      expect(
        response.body.data[0].user.toString()
      ).toBe(first.user._id.toString());
    }
  );

  test(
    "GET /api/feedback returns newest feedback first",
    async () => {
      const { user, token } =
        await createUserAndToken();

      await Feedback.create({
        user: user._id,
        name: user.name,
        email: user.email,
        message: "Older feedback",
        createdAt:
          new Date("2026-01-01T00:00:00.000Z")
      });

      await Feedback.create({
        user: user._id,
        name: user.name,
        email: user.email,
        message: "Newer feedback",
        createdAt:
          new Date("2026-02-01T00:00:00.000Z")
      });

      const response = await request(app)
        .get("/api/feedback")
        .set(
          "Authorization",
          `Bearer ${token}`
        )
        .expect(200);

      expect(response.body.data).toHaveLength(2);

      expect(response.body.data[0].message).toBe(
        "Newer feedback"
      );

      expect(response.body.data[1].message).toBe(
        "Older feedback"
      );
    }
  );
});
