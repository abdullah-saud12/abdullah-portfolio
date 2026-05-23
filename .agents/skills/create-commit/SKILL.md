---
name: create-commit
description: Stage and commit changes using conventional commit format. Always shows the diff and asks for confirmation before committing.
---

# Create Commit

## Rules

- NEVER run `git commit` without showing the user the staged diff first and getting explicit confirmation
- NEVER use `git add .` — stage specific files by name
- Always use conventional commit format: `type(scope): message`
- Keep the subject line under 72 characters
- Do not push — that is a separate action

## Commit Types

- `feat` — new feature or section
- `fix` — bug fix
- `style` — visual/CSS changes only
- `refactor` — code restructure, no behaviour change
- `content` — updating personal content (projects, blog, bio)
- `chore` — config, deps, tooling
- `docs` — documentation only

## Steps

1. Run `git diff` and `git status` to show what changed
2. Present a proposed commit message to the user
3. Wait for explicit confirmation ("yes", "looks good", "go ahead")
4. Only then run `git add <specific files>` and `git commit -m "..."`
5. Confirm success — do NOT push unless the user asks

## Examples

```
feat(navbar): add mobile hamburger menu
fix(theme): prevent flash of wrong theme on load
content(projects): add MemContext project entry
style(hero): adjust heading font size on mobile
chore(deps): install framer-motion
```
