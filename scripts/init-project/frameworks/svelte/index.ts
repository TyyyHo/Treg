import { hasPackage } from "../../utils.ts"
import type { DetectableFramework, PackageJson } from "../../types.ts"

export const svelteFramework: DetectableFramework = {
  id: "svelte",
  testEnvironment: "jsdom",
  tsRequiredExcludes: ["dist", "coverage", ".svelte-kit"],
  matches(packageJson: PackageJson) {
    return hasPackage(packageJson, "svelte")
  },
}
