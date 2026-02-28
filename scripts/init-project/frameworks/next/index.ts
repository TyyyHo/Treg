import { hasPackage } from "../../utils.ts"
import type { DetectableFramework, PackageJson } from "../../types.ts"

export const nextFramework: DetectableFramework = {
  id: "next",
  testEnvironment: "jsdom",
  tsRequiredExcludes: [".next", "dist", "coverage", "jest.config.js", "public"],
  matches(packageJson: PackageJson) {
    return hasPackage(packageJson, "next")
  },
}
