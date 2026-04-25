import { getSelectedPackagePresets } from "../frameworks/packages.ts"
import { installPackages } from "./shared.ts"
import type { PackagePreset, RuleContext } from "../types.ts"

export function buildPackageInstallPlan(presets: readonly PackagePreset[]): {
  dependencies: string[]
  devDependencies: string[]
} {
  return {
    dependencies: [...new Set(presets.flatMap((preset) => preset.dependencies ?? []))],
    devDependencies: [...new Set(presets.flatMap((preset) => preset.devDependencies ?? []))],
  }
}

export async function runPackagesRule(context: RuleContext): Promise<void> {
  const { framework, projectDir, pm, dryRun, selectedPackageIds } = context
  const presets = getSelectedPackagePresets(framework.id, selectedPackageIds)
  if (presets.length === 0) {
    return
  }

  const { dependencies, devDependencies } = buildPackageInstallPlan(presets)
  installPackages(projectDir, pm, dependencies, false, dryRun)
  installPackages(projectDir, pm, devDependencies, true, dryRun)
}
