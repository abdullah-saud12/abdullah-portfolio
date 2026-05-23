@AGENTS.md

## Quick Reference

**Dev server:** `npm run dev` → http://localhost:3000  
**Type check:** `npx tsc --noEmit`  
**Lint:** `npx next lint`  
**Build:** `npm run build`

## File Structure

```
src/
├── app/                  # Next.js App Router pages and API routes
│   ├── layout.tsx        # Root layout — ThemeProvider, Navbar, Footer
│   ├── page.tsx          # Homepage
│   └── globals.css       # Design tokens (CSS variables) + base styles
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── providers/        # ThemeProvider (the only top-level client component)
│   └── home/             # Homepage sections (hero, skills, experience, etc.)
├── data/                 # Static typed data arrays (projects, experience, skills)
├── content/blogs/        # MDX blog posts
└── lib/                  # Server-only utilities (db, email, blog parsing)
```

## Design Tokens

Colors come from CSS variables in `globals.css`. Use them directly:
- `var(--background)` / `var(--background-secondary)`
- `var(--foreground)` / `var(--foreground-muted)`
- `var(--border)`
- `var(--accent)` / `var(--accent-hover)`

## Next.js 15 Gotchas

- `params` is a Promise: `const { slug } = await params`
- `searchParams` is a Promise: `const { q } = await searchParams`
- Use `generateStaticParams` for static generation of dynamic routes
- Use `generateMetadata` (async) for per-page SEO
