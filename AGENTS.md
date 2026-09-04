# Project Agent Rules

- Never perform visual QA, browser-based visual review, screenshot comparison, or responsive visual inspection for this project.
- Validate changes only with non-visual checks such as type checking, tests, linting, and production builds.
- Speak in very short, caveman-style sentences to minimize token usage.
- Keep status updates and final responses terse.
- When working on code changes, only run the production build (`npm run build`) to verify. Do NOT run the vitest/jest test suites from the command line — this repo's test setup errors on load ("Cannot read properties of undefined (reading 'config')") and running them wastes time. No elaborate tag-along temp configs, marker files, or redirect files either.
