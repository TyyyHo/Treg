import type { PackagePreset } from "../../types.ts"

export const reactPackagePresets: readonly PackagePreset[] = [
  {
    id: "tailwind",
    label: "Tailwind CSS",
    description: "Utility-first styling for React applications.",
    devDependencies: ["tailwindcss"],
    aiRule: {
      prompt:
        "Use Tailwind utilities consistently and extract repeated UI patterns into components.",
      when: "When styling React components or shared UI primitives.",
      checklist: [
        "Keep class lists readable and grouped by layout, spacing, color, and state.",
        "Avoid duplicating long class combinations across components.",
        "Use design tokens or config values instead of one-off arbitrary values when patterns repeat.",
      ],
    },
  },
  {
    id: "zustand",
    label: "Zustand",
    description: "Small client state store for React applications.",
    dependencies: ["zustand"],
    aiRule: {
      prompt: "Use Zustand for client-only state that is shared across distant React components.",
      when: "When local component state or context becomes awkward for UI state.",
      checklist: [
        "Do not mirror server cache data in Zustand.",
        "Keep stores focused on one domain of UI state.",
        "Expose actions from the store instead of mutating state directly.",
      ],
    },
  },
  {
    id: "tanstack-query",
    label: "TanStack Query",
    description: "Server-state fetching and cache management for React.",
    dependencies: ["@tanstack/react-query"],
    aiRule: {
      prompt: "Use TanStack Query for server state and keep cache keys stable.",
      when: "When fetching, caching, mutating, or invalidating remote data.",
      checklist: [
        "Use structured query keys that include every data dependency.",
        "Keep mutation invalidation scoped to affected queries.",
        "Avoid storing query results in separate client state stores.",
      ],
    },
  },
  {
    id: "tanstack-router",
    label: "TanStack Router",
    description: "Type-safe routing for React applications.",
    dependencies: ["@tanstack/react-router"],
    aiRule: {
      prompt:
        "Use TanStack Router route definitions as the source of truth for route params and loaders.",
      when: "When adding React routes, route params, or route-level data loading.",
      checklist: [
        "Keep route params typed through router APIs.",
        "Place route-level data dependencies in loaders when appropriate.",
        "Avoid duplicating route path strings outside route definitions.",
      ],
    },
  },
  {
    id: "i18n",
    label: "i18next + react-i18next",
    description: "Internationalization for React applications.",
    dependencies: ["i18next", "react-i18next"],
    aiRule: {
      prompt: "Use react-i18next translation keys instead of hard-coded user-facing strings.",
      when: "When adding text that appears in the React UI.",
      checklist: [
        "Keep translation keys stable and descriptive.",
        "Use interpolation instead of string concatenation.",
        "Keep locale files organized by feature or screen.",
      ],
    },
  },
  {
    id: "react-hook-form",
    label: "React Hook Form",
    description: "Form state and validation wiring for React.",
    dependencies: ["react-hook-form"],
    aiRule: {
      prompt:
        "Use React Hook Form to keep forms controlled by form state instead of scattered component state.",
      when: "When building non-trivial React forms.",
      checklist: [
        "Keep field names stable and typed where possible.",
        "Place validation near schema or form setup.",
        "Avoid duplicating form values into independent state.",
      ],
    },
  },
]
