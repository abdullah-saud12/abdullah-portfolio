import type { Metadata } from "next";
import { getAllBlogs } from "@/lib/blogs";
import BlogListClient from "./blog-list-client";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on backend engineering, AI systems, and distributed systems by Abdullah Saud.",
};

export default function BlogPage() {
  const blogs = getAllBlogs().map((b) => ({
    slug: b.slug,
    title: b.frontmatter.title,
    description: b.frontmatter.description,
    date: b.frontmatter.date,
    readingTime: b.frontmatter.readingTime,
    tags: b.frontmatter.tags,
    imageUrl: b.frontmatter.imageUrl,
    featured: b.frontmatter.featured,
  }));

  return <BlogListClient blogs={blogs} />;
}
