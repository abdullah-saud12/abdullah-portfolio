---
name: new-blog-post
description: "Scaffold a new blog post MDX file. $ARGUMENTS = post title"
argument-hint: "post title (e.g. 'How React Server Components Work')"
---

# New Blog Post

Creates a new MDX file in `src/content/blogs/` with correct frontmatter.

## Steps

1. Convert the title from `$ARGUMENTS` into a slug:
   - Lowercase, replace spaces with hyphens, strip special characters
   - Example: "How React Server Components Work" → `how-react-server-components-work`

2. Check that `src/content/blogs/<slug>.mdx` does not already exist

3. Create the file with this frontmatter template:
   ```mdx
   ---
   title: "$ARGUMENTS"
   date: "<today's date in YYYY-MM-DD format>"
   description: ""
   tags: []
   author: "Abdullah Saud"
   readingTime: "5 min"
   imageUrl: ""
   featured: false
   isHidden: true
   ---

   Write your post content here.
   ```

4. Set `isHidden: true` so it won't appear on the site until the user is ready

5. Tell the user:
   - The file path created
   - To fill in `description`, `tags`, `imageUrl`, and set `isHidden: false` when ready to publish

## Rules

- Never set `featured: true` or `isHidden: false` on a new post — user decides when to publish
- Use today's actual date, not a placeholder
