import type { Framework } from "../../../types.ts"

export const reactV18Framework: Framework = {
  id: "react",
  variant: "v18",
  testEnvironment: "jsdom",
  tsRequiredExcludes: ["dist", "coverage", "jest.config.js", "public"],
}
