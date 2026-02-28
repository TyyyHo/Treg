/** @type {import("jest").Config} */
const config = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "<rootDir>/jest.transform.cjs",
  },
  testMatch: ["**/*.test.ts"],
}

module.exports = config
