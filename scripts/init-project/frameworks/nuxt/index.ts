import { hasPackage } from "../../utils.ts"
import type { DetectableFramework, PackageJson } from "../../types.ts"

export const nuxtFramework: DetectableFramework = {
  id: "nuxt",
  testEnvironment: "jsdom",
  tsRequiredExcludes: [".nuxt", ".output", "dist", "coverage", "public"],
  matches(packageJson: PackageJson) {
    return hasPackage(packageJson, "nuxt")
  },
}
