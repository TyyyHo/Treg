import { packageJson } from "../mrm-core.mjs"
import { installPackages, withProjectCwd, writeFile } from "./shared.mjs"

function getVitestConfig(frameworkId) {
  const environment = frameworkId === "react" ? "jsdom" : "node"
  return `import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "${environment}",
    setupFiles: ["./vitest.setup.js"],
  },
})
`
}

function getVitestSetup(frameworkId) {
  if (frameworkId === "react") {
    return `import "@testing-library/jest-dom/vitest"
`
  }
  return `// Vitest setup
`
}

export async function runTestVitestRule(context) {
  const { framework, projectDir, pm, force, dryRun } = context
  const deps = ["vitest"]
  if (framework.testEnvironment === "jsdom") {
    deps.push("jsdom")
  }
  if (framework.id === "react") {
    deps.push("@testing-library/jest-dom")
  }
  installPackages(pm, deps, true, dryRun)

  await writeFile(
    projectDir,
    "vitest.config.mjs",
    getVitestConfig(framework.id),
    force,
    dryRun
  )
  await writeFile(
    projectDir,
    "vitest.setup.js",
    getVitestSetup(framework.id),
    force,
    dryRun
  )

  withProjectCwd(projectDir, () => {
    if (dryRun) {
      console.log(
        "[dry-run] Would set package scripts: test, test:watch, test:coverage"
      )
      return
    }
    packageJson()
      .setScript("test", "vitest run")
      .setScript("test:watch", "vitest")
      .setScript("test:coverage", "vitest run --coverage")
      .save()
  })
}
