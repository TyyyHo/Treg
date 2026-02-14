import { promises as fs } from "node:fs"
import path from "node:path"
import { install } from "../mrm-core.mjs"

export function withProjectCwd(projectDir, fn) {
  const original = process.cwd()
  process.chdir(projectDir)
  try {
    return fn()
  } finally {
    process.chdir(original)
  }
}

export function getInstallOptions(pm) {
  if (pm === "pnpm") return { pnpm: true }
  if (pm === "yarn") return { yarn: true }
  return {}
}

export function installPackages(
  projectDir,
  pm,
  packages,
  dev = true,
  dryRun = false
) {
  if (packages.length === 0) return
  if (dryRun) {
    console.log(
      `[dry-run] Would install ${dev ? "dev " : ""}dependencies: ${packages.join(", ")}`
    )
    return
  }
  withProjectCwd(projectDir, () => {
    install(packages, { ...getInstallOptions(pm), dev })
  })
}

export async function writeFile(
  projectDir,
  relativePath,
  content,
  force,
  dryRun
) {
  const targetPath = path.join(projectDir, relativePath)
  try {
    await fs.access(targetPath)
    if (!force) {
      console.log(`Skip ${relativePath} (already exists)`)
      return false
    }
  } catch {
    // File doesn't exist.
  }

  if (dryRun) {
    console.log(
      `[dry-run] Would ${force ? "update" : "create"} ${relativePath}`
    )
    return true
  }

  await fs.mkdir(path.dirname(targetPath), { recursive: true })
  await fs.writeFile(targetPath, content, "utf8")
  console.log(`${force ? "Updated" : "Created"} ${relativePath}`)
  return true
}
