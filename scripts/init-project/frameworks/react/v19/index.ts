import type { Framework } from "../../../types.ts"

export const reactV19Framework: Framework = {
  id: "react",
  variant: "v19",
  testEnvironment: "jsdom",
  tsRequiredExcludes: ["dist", "coverage", "jest.config.js", "public"],
}
