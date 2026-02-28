import { hasPackage } from "../../utils.ts"
import type { DetectableFramework, PackageJson } from "../../types.ts"

export const vueFramework: DetectableFramework = {
  id: "vue",
  testEnvironment: "jsdom",
  tsRequiredExcludes: ["dist", "coverage"],
  matches(packageJson: PackageJson) {
    return hasPackage(packageJson, "vue")
  },
}
