---
name: add-project
description: "Add a new project entry to src/data/projects.ts. $ARGUMENTS = project name"
argument-hint: "project name (e.g. 'My SaaS App')"
---

# Add Project

Adds a new typed `Project` object to the `projects` array in `src/data/projects.ts`.

## Steps

1. Read `src/data/projects.ts` to understand the current structure and the highest existing `id`

2. Ask the user for the following if not already provided:
   - Title
   - Short description (1-2 sentences)
   - Detailed description (paragraph)
   - Tags (array of tech strings, e.g. `["React", "TypeScript", "Postgres"]`)
   - Demo link (optional)
   - GitHub link (optional)
   - Image URL (use `""` as placeholder if not ready)
   - Year (e.g. `"2025"`)
   - Duration (e.g. `"2 Months"`)
   - Category: `"AI"` or `"Web"` or `"Other"`
   - Featured: `true` or `false`
   - Challenges (array of strings describing what was hard)

3. Generate a slug from the title (lowercase, hyphenated)

4. Append the new entry to the `projects` array with the next available `id`

5. Run `lint-and-check` to confirm no type errors

6. Show the user the added entry and ask for confirmation before saving

## Rules

- Never set `featured: true` without asking — featured projects appear on the homepage
- Slug must be unique — check existing slugs before adding
- All required fields must be filled — no empty strings except `imageUrl` and optional links
