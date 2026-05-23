"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import SectionHeading from "@/components/home/section-heading";

interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  imageUrl: string;
  featured: boolean;
}

export default function BlogListClient({ blogs }: { blogs: BlogMeta[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { theme } = useTheme();
  const isLight = theme === "light";

  const featured = blogs.find((b) => b.featured);
  const rest = blogs.filter((b) => !b.featured || b.slug !== featured?.slug);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`}>
      <section ref={ref} className="py-20 pt-32 relative overflow-hidden">
        {/* Background */}
        <div className={`absolute inset-0 -z-10 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
        <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${isLight
          ? "[background-image:linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px)]"
          : "[background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)]"
        }`} />

        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading
            subtitle="Writing"
            title="Blog"
            description="Backend engineering, AI systems, and lessons from production. No fluff."
            className="mb-16"
          />

          {/* Featured post */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className={`border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:grid md:grid-cols-2 ${
                  isLight ? "bg-white border-gray-200 hover:shadow-blue-500/5" : "bg-[#161b22] border-white/10 hover:border-white/20"
                }`}>
                  <div className="relative h-56 md:h-auto overflow-hidden">
                    <Image
                      src={featured.imageUrl}
                      alt={featured.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 ${isLight ? "bg-gradient-to-r from-white/10 to-transparent" : "bg-gradient-to-r from-[#161b22]/30 to-transparent"}`} />
                    <span className="absolute top-4 left-4 px-2.5 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-medium backdrop-blur-sm">
                      Featured
                    </span>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {featured.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={`px-2 py-0.5 text-[10px] font-medium border ${isLight ? "bg-gray-50 border-gray-200 text-gray-600" : "bg-white/5 border-white/10 text-gray-400"}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className={`text-2xl font-bold mb-3 leading-snug transition-colors ${isLight ? "text-gray-900 group-hover:text-blue-600" : "text-white group-hover:text-blue-400"}`}>
                      {featured.title}
                    </h2>
                    <p className={`text-sm leading-relaxed mb-6 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                      {featured.description}
                    </p>
                    <div className={`flex items-center justify-between text-xs ${isLight ? "text-gray-500" : "text-gray-500"}`}>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          {new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} />
                          {featured.readingTime}
                        </span>
                      </div>
                      <span className={`flex items-center gap-1 font-medium transition-colors ${isLight ? "group-hover:text-blue-600" : "group-hover:text-blue-400"}`}>
                        Read <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Rest of posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((blog, i) => (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group h-full"
              >
                <Link href={`/blog/${blog.slug}`} className="block h-full">
                  <div className={`flex flex-col h-full border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isLight ? "bg-white border-gray-200 hover:border-gray-300" : "bg-[#161b22] border-white/10 hover:border-white/20"
                  }`}>
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 ${isLight ? "bg-gradient-to-t from-white/20 to-transparent" : "bg-gradient-to-t from-[#161b22]/40 to-transparent"}`} />
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={`px-2 py-0.5 text-[10px] font-medium border ${isLight ? "bg-gray-50 border-gray-200 text-gray-600" : "bg-white/5 border-white/10 text-gray-400"}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className={`text-base font-bold mb-2 leading-snug transition-colors ${isLight ? "text-gray-900 group-hover:text-blue-600" : "text-white group-hover:text-blue-400"}`}>
                        {blog.title}
                      </h3>
                      <p className={`text-xs leading-relaxed flex-1 mb-4 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                        {blog.description}
                      </p>
                      <div className={`flex items-center justify-between pt-3 border-t text-xs ${isLight ? "border-gray-100 text-gray-500" : "border-white/5 text-gray-500"}`}>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            {new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {blog.readingTime}
                          </span>
                        </div>
                        <ArrowRight size={12} className={`transition-all group-hover:translate-x-1 ${isLight ? "group-hover:text-blue-600" : "group-hover:text-blue-400"}`} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className={`inline-flex items-center gap-2 px-6 py-3 border text-sm ${isLight ? "bg-gray-100 border-gray-200 text-gray-600" : "bg-white/5 border-white/10 text-gray-400"}`}>
              {blogs.length} articles published
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
