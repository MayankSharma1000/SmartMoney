module.exports = {
  testEnvironment: "node",

  roots: [
    "<rootDir>/server/tests"
  ],

  setupFilesAfterEnv: [
    "<rootDir>/server/tests/setup.js"
  ],

  testMatch: [
    "**/*.test.js"
  ],

  clearMocks: true,

  testTimeout: 30000
};
