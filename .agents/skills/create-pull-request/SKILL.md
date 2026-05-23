---
name: create-pull-request
description: Open a pull request from dev into main when a phase is complete.
---

# Create Pull Request

## When to Use

Only when a full phase is complete, tested locally, and the Vercel preview URL looks correct.

## Steps

1. Run `git status` — confirm working tree is clean (everything committed)
2. Run `git log main..dev --oneline` — show the user what commits will be in the PR
3. Ask the user to confirm they've checked the Vercel preview URL
4. Create the PR using `gh pr create`:
   - Base: `main`
   - Head: `dev`
   - Title: `phase N: short description`
   - Body: bullet list of what was built in this phase
5. Print the PR URL for the user

## PR Title Format

```
phase 1: layout, theme, navbar, footer
phase 2: deploy and robots/sitemap
phase 3: data layer and content structure
```

## Rules

- Never merge the PR — the user merges manually on GitHub
- Always confirm with the user before creating the PR
- If there are uncommitted changes, stop and run `create-commit` first
