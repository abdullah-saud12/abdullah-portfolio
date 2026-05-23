"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Calendar, Clock, ArrowRight,
  Minus, Plus, Type, Share2, Check,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark.css";
import { useTheme } from "@/components/providers/theme-provider";
import TableOfContents, { type Heading } from "@/components/table-of-contents";
import type { BlogFrontmatter } from "@/data/types";

function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split("\n");
  let inCodeBlock = false;
  const headings: Heading[] = [];
  for (const line of lines) {
    if (line.startsWith("```")) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }
  return headings;
}

/* ── Types ─────────────────────────────────────────────────────────────────── */

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

type FontChoice = "geist" | "inter" | "jetbrains";

const MIN_SIZE = 14;
const MAX_SIZE = 32;
const DEFAULT_SIZE = 18;

/* ── Helpers ────────────────────────────────────────────────────────────────── */

function fontFamily(f: FontChoice) {
  if (f === "jetbrains") return "var(--font-jetbrains-mono), monospace";
  if (f === "inter") return "Inter, system-ui, sans-serif";
  return "var(--font-geist-sans), system-ui, sans-serif";
}

function fmt(date: string, style: "long" | "short" = "long") {
  return new Date(date).toLocaleDateString("en-US",
    style === "long"
      ? { month: "long", day: "numeric", year: "numeric" }
      : { month: "short", day: "numeric", year: "numeric" }
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────────── */

function ThemeBtn({ isLight, toggleTheme }: { isLight: boolean; toggleTheme: () => void }) {
  return (
    <button
      onClick={toggleTheme}
      title={isLight ? "Dark mode" : "Light mode"}
      className={`flex items-center justify-center w-9 h-9 border transition-colors ${
        isLight
          ? "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
          : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
      }`}
    >
      {isLight ? (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
}

const FONTS: { value: FontChoice; label: string; sample: string }[] = [
  { value: "geist",    label: "Geist Sans",      sample: "Ag" },
  { value: "inter",    label: "Inter",            sample: "Ag" },
  { value: "jetbrains", label: "JetBrains Mono", sample: "Ag" },
];

function FontBtn({
  isLight, font, setFont, openUp = false,
}: { isLight: boolean; font: FontChoice; setFont: (f: FontChoice) => void; openUp?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const isActive = font !== "geist";
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        title="Change font"
        className={`flex items-center justify-center w-9 h-9 border transition-colors ${
          isActive
            ? isLight
              ? "bg-purple-50 border-purple-200 text-purple-600 hover:bg-purple-100"
              : "bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
            : isLight
              ? "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
              : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
        }`}
      >
        <Type size={15} />
      </button>

      {open && (
        <div className={`absolute z-50 w-44 border shadow-xl overflow-hidden ${
          openUp ? "bottom-full mb-2" : "top-full mt-2"
        } left-0 ${
          isLight ? "bg-white border-gray-200" : "bg-[#161b22] border-white/10"
        }`}>
          {FONTS.map(({ value, label, sample }) => (
            <button
              key={value}
              onClick={() => { setFont(value); setOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                font === value
                  ? isLight ? "bg-gray-100 text-gray-900" : "bg-white/10 text-white"
                  : isLight ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900" : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{label}</span>
              <span className={`text-xs font-mono ${isLight ? "text-gray-400" : "text-gray-500"}`} style={{ fontFamily: fontFamily(value) }}>
                {sample}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ZoomControls({
  isLight, size, setSize, vertical = false,
}: { isLight: boolean; size: number; setSize: (s: number) => void; vertical?: boolean }) {
  const cls = vertical ? "flex-col-reverse w-9" : "h-9";
  return (
    <div className={`flex items-center border transition-colors ${cls} ${
      isLight ? "bg-gray-100 border-gray-200" : "bg-white/5 border-white/10"
    }`}>
      <button
        onClick={() => setSize(Math.max(size - 2, MIN_SIZE))}
        className={`p-1.5 transition-colors ${isLight ? "text-gray-600 hover:bg-gray-200" : "text-gray-400 hover:bg-white/10"}`}
        aria-label="Decrease font size"
      >
        <Minus size={14} />
      </button>
      <span
        onClick={() => setSize(DEFAULT_SIZE)}
        className={`text-xs font-mono cursor-pointer select-none px-1 text-center ${isLight ? "text-gray-600" : "text-gray-400"}`}
        style={{ minWidth: "2.2ch" }}
      >
        {size}
      </span>
      <button
        onClick={() => setSize(Math.min(size + 2, MAX_SIZE))}
        className={`p-1.5 transition-colors ${isLight ? "text-gray-600 hover:bg-gray-200" : "text-gray-400 hover:bg-white/10"}`}
        aria-label="Increase font size"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

function ShareBtn({ isLight }: { isLight: boolean }) {
  const [copied, setCopied] = useState(false);
  const share = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: document.title, url }); return; } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <button
      onClick={share}
      title="Share article"
      className={`flex items-center justify-center w-9 h-9 border transition-colors ${
        isLight
          ? "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
          : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
      }`}
    >
      {copied ? <Check size={15} className="text-green-500" /> : <Share2 size={15} />}
    </button>
  );
}

/* ── Main component ─────────────────────────────────────────────────────────── */

export default function BlogPostClient({ frontmatter, content, related }: Props) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const headings = extractHeadings(content);
  const isLight = theme === "light";

  const [fontSize, setFontSize] = useState(DEFAULT_SIZE);
  const [font, setFont] = useState<FontChoice>("geist");

  const proseRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = proseRef.current;
    if (!el) return;
    el.style.fontFamily = fontFamily(font);
    el.querySelectorAll<HTMLElement>("p, li, dd, dt, figcaption, blockquote").forEach((child) => {
      child.style.fontSize = `${fontSize}px`;
      child.style.transition = "font-size 0.15s ease";
    });
  }, [fontSize, font]);

  const divider = <div className={`w-6 h-px my-1 ${isLight ? "bg-gray-200" : "bg-white/10"}`} />;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`}>
      {/* Grid bg */}
      <div className={`fixed inset-0 -z-10 pointer-events-none bg-[length:40px_40px] ${isLight
        ? "[background-image:linear-gradient(rgba(0,0,0,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.04)_1px,transparent_1px)]"
        : "[background-image:linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]"
      }`} />

      {/* ── Floating left controls (xl+) ──────────────────────────────────── */}
      <div className={`hidden xl:flex fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 p-2 border backdrop-blur-xl shadow-2xl transition-colors ${
        isLight ? "bg-white/95 border-gray-200" : "bg-[#0D1117]/90 border-white/10"
      }`}>
        <ThemeBtn isLight={isLight} toggleTheme={toggleTheme} />
        {divider}
        <FontBtn isLight={isLight} font={font} setFont={setFont} />
        {divider}
        <ZoomControls isLight={isLight} size={fontSize} setSize={setFontSize} vertical />
        {divider}
        <ShareBtn isLight={isLight} />
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-6 max-w-3xl pt-28 pb-32 md:pb-20">

        {/* Back + top controls row */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-10"
        >
          <button
            onClick={() => router.back()}
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
          >
            <ArrowLeft size={15} /> Back
          </button>

          {/* Controls visible on md–xl */}
          <div className="flex items-center gap-2 xl:hidden">
            <ThemeBtn isLight={isLight} toggleTheme={toggleTheme} />
            <FontBtn isLight={isLight} font={font} setFont={setFont} />
            <ZoomControls isLight={isLight} size={fontSize} setSize={setFontSize} />
            <ShareBtn isLight={isLight} />
          </div>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          {/* Meta row */}
          <div className={`flex flex-wrap items-center gap-3 text-xs sm:text-sm mb-5 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
            <time dateTime={frontmatter.date}>{fmt(frontmatter.date)}</time>
            <span className={isLight ? "text-gray-300" : "text-gray-600"}>•</span>
            <span className="flex items-center gap-1"><Clock size={13} />{frontmatter.readingTime}</span>
            <span className={isLight ? "text-gray-300" : "text-gray-600"}>•</span>
            <span>{frontmatter.author}</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5 ${isLight ? "text-gray-900" : "text-white"}`}>
            {frontmatter.title}
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed mb-6 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
            {frontmatter.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className={`px-2.5 py-1 text-xs font-medium border transition-colors ${
                isLight
                  ? "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}>
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Cover image */}
        {frontmatter.imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`relative aspect-video mb-10 overflow-hidden border ${isLight ? "border-gray-200" : "border-white/10"}`}
          >
            <Image src={frontmatter.imageUrl} alt={frontmatter.title} fill className="object-cover" priority />
          </motion.div>
        )}

        {/* TOC — mobile/tablet collapsible */}
        <div id="blog-content-start" className="h-0 w-0" aria-hidden="true" />
        <TableOfContents
          headings={headings}
          contentStartId="blog-content-start"
          contentEndId="blog-content-end"
        />

        {/* Article body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div
            ref={proseRef}
            className={`prose max-w-none
            ${isLight ? "prose-gray" : "prose-invert"}
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-relaxed
            prose-a:underline prose-a:underline-offset-2
            ${isLight ? "prose-a:text-blue-600" : "prose-a:text-blue-400"}
            prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
            ${isLight ? "prose-code:bg-gray-100 prose-code:text-gray-800" : "prose-code:bg-white/10 prose-code:text-gray-200"}
            prose-pre:rounded-none prose-pre:border prose-pre:p-0
            ${isLight ? "prose-pre:border-gray-200" : "prose-pre:border-white/10"}
            prose-pre:bg-transparent
            prose-blockquote:not-italic
            ${isLight ? "prose-blockquote:border-gray-300 prose-blockquote:text-gray-600" : "prose-blockquote:border-white/20 prose-blockquote:text-gray-400"}
            prose-strong:font-semibold
            ${isLight ? "prose-strong:text-gray-900" : "prose-strong:text-white"}
            prose-li:leading-relaxed
          `}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeSlug]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </motion.div>

        <div id="blog-content-end" className="h-0 w-0" aria-hidden="true" />

        {/* Related posts */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`mt-16 pt-10 border-t ${isLight ? "border-gray-200" : "border-white/10"}`}
          >
            <h2 className={`text-xl font-bold mb-6 ${isLight ? "text-gray-900" : "text-white"}`}>
              Related Articles
            </h2>
            <div className="flex flex-col gap-4">
              {related.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className={`flex gap-4 p-4 border transition-all duration-200 ${
                    isLight ? "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300" : "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20"
                  }`}>
                    {post.imageUrl && (
                      <div className="relative w-28 h-20 shrink-0 overflow-hidden">
                        <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <div className={`flex items-center gap-2 text-xs mb-1.5 ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                          <span>{fmt(post.date, "short")}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock size={11} />{post.readingTime}</span>
                        </div>
                        <h3 className={`text-sm font-semibold leading-snug line-clamp-2 transition-colors ${isLight ? "text-gray-900 group-hover:text-blue-600" : "text-white group-hover:text-blue-400"}`}>
                          {post.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={`text-[10px] px-1.5 py-0.5 border ${isLight ? "border-gray-200 text-gray-500" : "border-white/10 text-gray-500"}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight size={14} className={`self-center shrink-0 transition-all group-hover:translate-x-1 ${isLight ? "text-gray-300 group-hover:text-blue-600" : "text-gray-600 group-hover:text-blue-400"}`} />
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Footer nav */}
        <div className={`mt-10 pt-8 border-t ${isLight ? "border-gray-200" : "border-white/10"}`}>
          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border transition-all ${
              isLight ? "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200" : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }`}
          >
            <ArrowLeft size={14} /> Back to all articles
          </Link>
        </div>
      </div>

      {/* ── Mobile bottom bar ─────────────────────────────────────────────── */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl transition-colors ${
        isLight ? "bg-white/95 border-gray-200" : "bg-[#0D1117]/95 border-white/10"
      }`}>
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <ThemeBtn isLight={isLight} toggleTheme={toggleTheme} />
          <div className="flex items-center gap-2">
            <FontBtn isLight={isLight} font={font} setFont={setFont} openUp />
            <ZoomControls isLight={isLight} size={fontSize} setSize={setFontSize} />
          </div>
          <ShareBtn isLight={isLight} />
        </div>
      </div>
    </div>
  );
}
