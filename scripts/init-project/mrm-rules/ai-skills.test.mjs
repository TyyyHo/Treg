import { describe, expect, it } from "@jest/globals"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { __testables__ } from "./ai-skills.mjs"

describe("ai-skills helpers", () => {
  it("builds skill section from enabled features", () => {
    const content = __testables__.buildSkillSection({
      enabledFeatures: {
        lint: true,
        format: true,
        typescript: false,
        test: true,
        husky: false,
      },
      testRunner: "vitest",
    })

    expect(content).toContain("## frontend-rules AI Skills")
    expect(content).toContain("### format")
    expect(content).toContain("### lint")
    expect(content).toContain("### test")
    expect(content).toContain("目前測試工具: `vitest`")
    expect(content).not.toContain("### typescript")
  })

  it("upserts an existing skill section", () => {
    const replaced = __testables__.upsertSkillSection(
      "# Header\n\n<!-- frontend-rules:skills:start -->\nold\n<!-- frontend-rules:skills:end -->\n",
      "<!-- frontend-rules:skills:start -->\nnew\n<!-- frontend-rules:skills:end -->"
    )

    expect(replaced).toContain("new")
    expect(replaced).not.toContain("old")
  })

  it("prefers AGENTS.md when both docs exist", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "frontend-rules-skill-"))
    try {
      writeFileSync(path.join(dir, "AGENTS.md"), "# Agents\n", "utf8")
      writeFileSync(path.join(dir, "CLAUDE.md"), "# Claude\n", "utf8")

      expect(__testables__.resolveSkillsDoc(dir)).toBe(
        path.join(dir, "AGENTS.md")
      )
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
