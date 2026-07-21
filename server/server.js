require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5500;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `🚀 Smart Expense Tracker Server running on port ${PORT}`
    );
  });
};

startServer();
