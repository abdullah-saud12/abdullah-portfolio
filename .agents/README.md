# Agent Skills

Shared skill definitions for AI coding agents (Claude, Codex, Cursor).

## Structure

```
.agents/
└── skills/
    └── <skill-name>/
        └── SKILL.md       # Skill definition with YAML front matter
```

## Rules

- One skill per directory, named in kebab-case
- Front matter must include `name` and `description`
- Skills are agent-agnostic — no Claude or Codex specific syntax
- Use `$ARGUMENTS` in description for parameterized skills

## Available Skills

| Skill | Description |
|---|---|
| `create-commit` | Stage and commit with conventional commit format — always asks for confirmation first |
| `create-pull-request` | Open a PR from dev → main when a phase is complete |
| `lint-and-check` | Run ESLint and TypeScript checks before committing |
| `new-blog-post` | Scaffold a new MDX blog post with correct frontmatter |
| `add-project` | Add a new project entry to src/data/projects.ts |
