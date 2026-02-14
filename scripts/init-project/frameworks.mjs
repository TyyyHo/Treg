import { hasPackage } from "./utils.mjs"

const FRAMEWORKS = {
  node: {
    id: "node",
    testEnvironment: "node",
    tsRequiredExcludes: ["dist", "coverage"],
  },
  react: {
    id: "react",
    testEnvironment: "jsdom",
    tsRequiredExcludes: ["dist", "coverage", "jest.config.js", "public"],
  },
}

export function resolveFramework(frameworkArg, packageJson) {
  if (frameworkArg) {
    return FRAMEWORKS[frameworkArg]
  }
  return detectFramework(packageJson)
}

export function detectFramework(packageJson) {
  if (
    hasPackage(packageJson, "react") ||
    hasPackage(packageJson, "react-dom")
  ) {
    return FRAMEWORKS.react
  }
  return FRAMEWORKS.node
}
