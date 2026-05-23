"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark.css";
import { useTheme } from "@/components/providers/theme-provider";
import type { BlogFrontmatter } from "@/data/types";

interface RelatedPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  imageUrl: string;
}

interface Props {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  related: RelatedPost[];
}

export default function BlogPostClient({ slug, frontmatter, content, related }: Props) {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`}>
      {/* Background grid */}
      <div className={`fixed inset-0 -z-10 bg-[length:40px_40px] pointer-events-none ${isLight
        ? "[background-image:linear-gradient(rgba(0,0,0,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.04)_1px,transparent_1px)]"
        : "[background-image:linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]"
      }`} />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl pt-28 pb-24">

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <button
            onClick={() => router.back()}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className={`px-2.5 py-1 text-xs font-medium border ${isLight ? "bg-gray-100 border-gray-200 text-gray-600" : "bg-white/5 border-white/10 text-gray-400"}`}>
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className={`text-3xl sm:text-4xl font-bold leading-tight mb-4 ${isLight ? "text-gray-900" : "text-white"}`}>
            {frontmatter.title}
          </h1>

          {/* Description */}
          <p className={`text-lg leading-relaxed mb-6 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
            {frontmatter.description}
          </p>

          {/* Meta */}
          <div className={`flex flex-wrap items-center gap-5 text-sm pb-6 border-b ${isLight ? "text-gray-500 border-gray-200" : "text-gray-500 border-white/10"}`}>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(frontmatter.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {frontmatter.readingTime}
            </span>
            <span className={`font-medium ${isLight ? "text-gray-700" : "text-gray-300"}`}>
              {frontmatter.author}
            </span>
          </div>
        </motion.header>

        {/* Cover image */}
        {frontmatter.imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative aspect-video mb-12 overflow-hidden"
          >
            <Image
              src={frontmatter.imageUrl}
              alt={frontmatter.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className={`prose prose-base sm:prose-lg max-w-none
            ${isLight
              ? "prose-gray prose-headings:text-gray-900 prose-a:text-blue-600 prose-code:text-gray-800 prose-code:bg-gray-100 prose-pre:bg-gray-900 prose-blockquote:border-gray-300 prose-blockquote:text-gray-600"
              : "prose-invert prose-headings:text-white prose-a:text-blue-400 prose-code:text-gray-200 prose-code:bg-white/10 prose-pre:bg-[#161b22] prose-blockquote:border-white/20 prose-blockquote:text-gray-400"
            }
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-relaxed prose-p:mb-5
            prose-li:leading-relaxed
            prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal
            prose-pre:rounded-none prose-pre:border
            ${isLight ? "prose-pre:border-gray-200" : "prose-pre:border-white/10"}
          `}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeSlug]}
              components={{
                // Remove the wrapping p from inline code in headings
                code({ className, children, ...props }) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Related posts */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`mt-20 pt-10 border-t ${isLight ? "border-gray-200" : "border-white/10"}`}
          >
            <h2 className={`text-lg font-bold mb-6 ${isLight ? "text-gray-900" : "text-white"}`}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className={`border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${isLight ? "bg-white border-gray-200 hover:border-gray-300" : "bg-[#161b22] border-white/10 hover:border-white/20"}`}>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className={`text-[10px] px-1.5 py-0.5 border ${isLight ? "border-gray-200 text-gray-500" : "border-white/10 text-gray-500"}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className={`text-sm font-semibold mb-1.5 leading-snug transition-colors line-clamp-2 ${isLight ? "text-gray-900 group-hover:text-blue-600" : "text-white group-hover:text-blue-400"}`}>
                      {post.title}
                    </h3>
                    <div className={`flex items-center justify-between text-xs mt-3 ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                      <span className="flex items-center gap-1"><Clock size={10} /> {post.readingTime}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Back to blog */}
        <div className={`mt-12 pt-8 border-t text-center ${isLight ? "border-gray-200" : "border-white/10"}`}>
          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
          >
            <ArrowLeft size={14} />
            All articles
          </Link>
        </div>
      </div>
    </div>
  );
}
