---
name: lint-and-check
description: Run ESLint and TypeScript checks on the portfolio codebase. Fix any errors found before committing.
---

# Lint and Check

Run this before every commit to catch errors early.

## Steps

1. Run TypeScript check:
   ```bash
   cd /Users/abd/Documents/abdullah-portfolio && npx tsc --noEmit
   ```

2. Run ESLint:
   ```bash
   cd /Users/abd/Documents/abdullah-portfolio && npx next lint
   ```

3. If errors are found:
   - Fix them immediately (do not commit with errors)
   - Re-run both checks to confirm clean
   - Then proceed to `create-commit`

4. If clean, report: "TypeScript and ESLint — no errors."

## Rules

- TypeScript errors are blockers — never commit with type errors
- ESLint warnings are acceptable, errors are not
- Do not use `// @ts-ignore` or `eslint-disable` as a shortcut
