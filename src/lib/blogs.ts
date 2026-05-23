import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogFrontmatter } from "@/data/types";

const blogsDirectory = path.join(process.cwd(), "src/content/blogs");

export function getAllBlogSlugs(): string[] {
  try {
    return fs
      .readdirSync(blogsDirectory)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.mdx`);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    const frontmatter: BlogFrontmatter = {
      ...data,
      date: data.date instanceof Date ? data.date.toISOString() : data.date,
    } as BlogFrontmatter;

    return { slug, frontmatter, content };
  } catch {
    return null;
  }
}

export function getAllBlogs(): BlogPost[] {
  return getAllBlogSlugs()
    .map(getBlogBySlug)
    .filter((b): b is BlogPost => b !== null && !b.frontmatter.isHidden)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getFeaturedBlogs(): BlogPost[] {
  return getAllBlogs().filter((b) => b.frontmatter.featured);
}

export function getRelatedBlogs(currentSlug: string, tags: string[], limit = 3): BlogPost[] {
  return getAllBlogs()
    .filter((b) => b.slug !== currentSlug)
    .map((b) => ({
      blog: b,
      score: b.frontmatter.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ blog }) => blog);
}
