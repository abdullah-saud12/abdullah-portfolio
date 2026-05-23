# Abdullah Portfolio — Agent Guidelines

## Project

Personal developer portfolio for Abdullah Saud. Built with Next.js 15 App Router, Tailwind CSS v4, TypeScript, deployed on Vercel.

**Repo:** https://github.com/abdullah-saud12/abdullah-portfolio  
**Production branch:** `main`  
**Development branch:** `dev` — all work happens here

## Branch Rules

- Always work on `dev`
- Never commit directly to `main`
- `main` is only updated via PR from `dev` — the user merges manually

## Commit Rules

- **Never commit without user confirmation** — show the diff, propose the message, wait for "yes"
- Never use `git add .` — stage specific files
- Use conventional commit format: `type(scope): message`
- Valid types: `feat`, `fix`, `style`, `refactor`, `content`, `chore`, `docs`
- Never push unless the user explicitly asks

## Code Rules

- Next.js 15 App Router only — no Pages Router patterns
- `params` and `searchParams` are Promises in Next.js 15 — always `await` them
- `'use client'` only on leaf components that use browser APIs or event handlers — never on layout or page files
- All server-only code (fs, db, env vars) stays in `src/lib/` with no client directive
- No `// @ts-ignore` — fix the actual type error

## Before Every Commit

Run `lint-and-check` skill: TypeScript must be clean, ESLint errors must be zero.

## Skills

Skills are in `.agents/skills/`. Use them:
- `/create-commit` — before every commit
- `/create-pull-request` — when a phase is complete
- `/lint-and-check` — before committing
- `/new-blog-post <title>` — scaffold a blog post
- `/add-project <name>` — add a project to the data file

## Content Ownership

Abdullah provides all personal content (bio, projects, experience, skills). Agents scaffold the structure, Abdullah fills in the details.
