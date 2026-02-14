import { nextFramework } from "./next/index.mjs"
import { nodeFramework } from "./node/index.mjs"
import { reactFramework } from "./react/index.mjs"
import { svelteFramework } from "./svelte/index.mjs"
import { vueFramework } from "./vue/index.mjs"

const FRAMEWORK_REGISTRY = {
  next: nextFramework,
  node: nodeFramework,
  react: reactFramework,
  svelte: svelteFramework,
  vue: vueFramework,
}

const FRAMEWORK_DETECT_ORDER = [
  nextFramework,
  reactFramework,
  vueFramework,
  svelteFramework,
  nodeFramework,
]

export function resolveFramework(frameworkArg, packageJson) {
  if (frameworkArg) {
    return FRAMEWORK_REGISTRY[frameworkArg]
  }
  return detectFramework(packageJson)
}

export function detectFramework(packageJson) {
  const matched = FRAMEWORK_DETECT_ORDER.find(framework =>
    framework.matches(packageJson)
  )
  return matched ?? nodeFramework
}
