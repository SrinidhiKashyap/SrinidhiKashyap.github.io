# AI Handoff Context

## Project

Beeconcept 2.0 portfolio site. React 19, TypeScript, Vite, Tailwind, React Router, and Zod.

## Commands

```bash
npm run typecheck
npm run lint
npm run format
npm run check:assets
npm test
npm run build
```

Use `npm run format:fix` only when formatting changes are intended.

## Structure

- `src/app/`: routes and app startup.
- `src/content/`: simple editable site content. Start here for navigation and contact copy.
- `src/features/`: page-specific UI and content.
- `src/features/work-details/data/`: editable case-study media and copy.
- `src/shared/`: reusable layout, media, hooks, and UI.
- `public/assets/`: static images and videos. Keep paths valid.

## Editing Rules

- Preserve routes and current visual design unless asked otherwise.
- Edit content/config files before changing components.
- Keep public asset paths rooted at `/assets/`.
- Add short comments only where they explain editing, lifecycle, accessibility, or performance decisions.
- Use named exports and strict TypeScript.
- Do not add a contact backend without explicit user approval. The form intentionally validates locally and does not send data.

## Loading

- All lazy routes use `PageSkeleton`.
- Work-detail routes use `CaseStudySkeleton`.
- Skeletons live in `src/shared/components/ui/PageSkeleton.tsx`.

## Quality Gates

- CI runs lint, formatting, asset validation, tests, and build.
- Asset validation is `scripts/check-assets.mjs`.
- Tests use Vitest and Testing Library.
- Lint currently exits successfully with legacy React-hook warnings. Do not hide new lint errors.

## Important Constraints

- Do not run browser visual QA or screenshot comparison.
- Validate only with typecheck, lint, tests, asset validation, and build.
- Preserve existing uncommitted Rice case-study work.
