import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBlogSlugs, getBlogBySlug, getRelatedBlogs } from "@/lib/blogs";
import BlogPostClient from "./blog-post-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};
  return {
    title: blog.frontmatter.title,
    description: blog.frontmatter.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  const related = getRelatedBlogs(slug, blog.frontmatter.tags, 2).map((r) => ({
    slug: r.slug,
    title: r.frontmatter.title,
    description: r.frontmatter.description,
    date: r.frontmatter.date,
    readingTime: r.frontmatter.readingTime,
    tags: r.frontmatter.tags,
    imageUrl: r.frontmatter.imageUrl,
  }));

  return (
    <BlogPostClient
      slug={blog.slug}
      frontmatter={blog.frontmatter}
      content={blog.content}
      related={related}
    />
  );
}
