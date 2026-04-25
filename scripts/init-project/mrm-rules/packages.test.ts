import { describe, expect, it } from "@jest/globals"
import { buildPackageInstallPlan } from "./packages.ts"

describe("packages rule", () => {
  it("separates runtime and dev dependencies", () => {
    expect(
      buildPackageInstallPlan([
        {
          id: "tailwind",
          label: "Tailwind CSS",
          description: "Styling",
          devDependencies: ["tailwindcss"],
          aiRule: {
            prompt: "Use Tailwind.",
            when: "When styling.",
            checklist: ["Check classes."],
          },
        },
        {
          id: "zustand",
          label: "Zustand",
          description: "State",
          dependencies: ["zustand"],
          aiRule: {
            prompt: "Use Zustand.",
            when: "When state is shared.",
            checklist: ["Keep stores focused."],
          },
        },
      ])
    ).toEqual({
      dependencies: ["zustand"],
      devDependencies: ["tailwindcss"],
    })
  })
})
