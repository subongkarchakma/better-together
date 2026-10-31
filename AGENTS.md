<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — Turbopack dev server on http://localhost:3000
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — runs bare `eslint` (not `next lint`); lints the current directory
- Typecheck: `npx tsc --noEmit` (no dedicated script; do it before declaring done, there is no CI)
- No test framework is configured. Don't invent test commands.

## Framework quirks

- React Compiler is enabled (`reactCompiler: true` in `next.config.ts` + `babel-plugin-react-compiler`). Do not add manual memoization (`useMemo`, `useCallback`, `React.memo`) — the compiler optimizes automatically; only use them for real semantic reasons.
- Turbopack runs both dev and build; `@tailwindcss/turbopack` is wired as a Turbopack rule in `next.config.ts`, not via PostCSS.
- Route/layout handlers use Next 16 conventions, e.g. typed `LayoutProps<"/">` instead of hand-rolled `{ children }: { children: React.ReactNode }`.

## Styling

- Tailwind v4 is CSS-first: there is no `tailwind.config.js`. Theme tokens, dark mode (`.dark` class variant), and config live in `src/app/globals.css` (`@theme inline`).
- shadcn/ui uses the `base-nova` style — components build on `@base-ui/react` primitives, **not** Radix. Add new ones with `npx shadcn add <component>`; the helper is imported as `import { cn } from "cn"` (the `cn` package), not `@/lib/utils`.

## Structure

- App Router only, under `src/app` (entrypoints: `layout.tsx`, `page.tsx`); UI primitives in `src/components/ui`; path alias `@/*` → `src/*`.
- Single-package project: no workspaces, no nested packages.
