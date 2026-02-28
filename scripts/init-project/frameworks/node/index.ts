import type { DetectableFramework } from "../../types.ts"

export const nodeFramework: DetectableFramework = {
  id: "node",
  testEnvironment: "node",
  tsRequiredExcludes: ["dist", "coverage"],
  matches() {
    return true
  },
}
