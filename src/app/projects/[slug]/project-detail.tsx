"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ExternalLink, Calendar, Clock,
  CheckCircle2, Layers, Trophy, Sparkles,
} from "lucide-react";
import {
  SiNextdotjs, SiPostgresql, SiMongodb, SiRedis, SiDocker,
  SiTypescript, SiReact, SiNodedotjs, SiPython, SiGraphql,
  SiOpenai, SiLangchain, SiBun, SiGithub,
} from "react-icons/si";
import { FaAmazon } from "react-icons/fa";
import { useTheme } from "@/components/providers/theme-provider";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  const cls = "w-5 h-5";
  if (t.includes("next"))       return <SiNextdotjs className={cls} />;
  if (t.includes("postgres"))   return <SiPostgresql className={cls} />;
  if (t.includes("mongo"))      return <SiMongodb className={cls} />;
  if (t.includes("redis"))      return <SiRedis className={cls} />;
  if (t.includes("docker"))     return <SiDocker className={cls} />;
  if (t.includes("typescript")) return <SiTypescript className={cls} />;
  if (t.includes("react"))      return <SiReact className={cls} />;
  if (t.includes("node"))       return <SiNodedotjs className={cls} />;
  if (t.includes("python"))     return <SiPython className={cls} />;
  if (t.includes("graphql"))    return <SiGraphql className={cls} />;
  if (t.includes("openai") || t.includes("openrouter")) return <SiOpenai className={cls} />;
  if (t.includes("langchain"))  return <SiLangchain className={cls} />;
  if (t.includes("aws"))        return <FaAmazon className={cls} />;
  if (t.includes("bun"))        return <SiBun className={cls} />;
  return <Layers className={cls} />;
};

function getDemoHostname(url: string) {
  try { return new URL(url).hostname; } catch { return "demo"; }
}

export default function ProjectDetail({ project }: { project: Project }) {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className={`min-h-screen pb-20 relative overflow-x-hidden transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`}>
      {/* Grid bg */}
      <div className={`fixed inset-0 -z-10 bg-[length:40px_40px] ${isLight
        ? "[background-image:linear-gradient(rgba(0,0,0,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.04)_1px,transparent_1px)]"
        : "[background-image:linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]"
      }`} />

      <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-32 max-w-7xl">

        {/* Nav row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex justify-between items-center"
        >
          <button
            onClick={() => router.push("/projects")}
            className={`group flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium transition-colors ${isLight
              ? "text-gray-500 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-200"
              : "text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10"
            }`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Projects
          </button>

          <div className="flex gap-2">
            {prev && (
              <Link href={`/projects/${prev.slug}`} title={`Previous: ${prev.title}`}
                className={`w-10 h-10 flex items-center justify-center border transition-all ${isLight
                  ? "border-gray-200 bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                  : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            )}
            {next && (
              <Link href={`/projects/${next.slug}`} title={`Next: ${next.title}`}
                className={`w-10 h-10 flex items-center justify-center border transition-all ${isLight
                  ? "border-gray-200 bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                  : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </motion.div>

        {/* Hero grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left — info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap gap-3 mb-6">
              {project.isHackathonProject && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border ${isLight ? "bg-orange-100 text-orange-600 border-orange-200" : "bg-orange-500/10 text-orange-400 border-orange-500/20"}`}>
                  <Trophy className="w-3 h-3" /> Hackathon
                </span>
              )}
              {project.featured && (
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border ${isLight ? "bg-yellow-100 text-yellow-600 border-yellow-200" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"}`}>
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              )}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border ${isLight ? "bg-blue-100 text-blue-600 border-blue-200" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}`}>
                <Calendar className="w-3 h-3" /> {project.year}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border ${isLight ? "bg-purple-100 text-purple-600 border-purple-200" : "bg-purple-500/10 text-purple-400 border-purple-500/20"}`}>
                <Clock className="w-3 h-3" /> {project.duration}
              </span>
            </div>

            <h1 className={`text-4xl md:text-6xl font-bold mb-5 tracking-tight leading-tight ${isLight ? "text-gray-900" : "text-white"}`}>
              {project.title}
            </h1>
            <p className={`text-base md:text-xl leading-relaxed mb-8 max-w-xl ${isLight ? "text-gray-600" : "text-gray-400"}`}>
              {project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                  className={`group flex items-center justify-center gap-2 px-6 py-3 font-bold text-sm hover:scale-[1.02] transition-all ${isLight ? "bg-gray-900 text-white hover:bg-gray-700" : "bg-white text-gray-900 hover:bg-gray-100"}`}>
                  Live Demo
                  <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 px-6 py-3 font-bold text-sm border hover:scale-[1.02] transition-all ${isLight ? "bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200" : "bg-[#161B22] text-white border-gray-700/50 hover:border-gray-600 hover:bg-[#1C2128]"}`}>
                  <SiGithub className="w-4 h-4" /> Source Code
                </a>
              )}
            </div>
          </motion.div>

          {/* Right — image/video */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className={`border shadow-2xl overflow-hidden ${isLight ? "bg-white border-gray-200" : "bg-[#1C1C1C] border-gray-800"}`}>
              {/* Browser chrome */}
              <div className={`h-10 flex items-center px-4 gap-2 border-b ${isLight ? "bg-gray-100 border-gray-200" : "bg-[#2A2A2A] border-gray-800"}`}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex-1 mx-4">
                  <div className={`h-6 flex items-center justify-center text-[10px] font-mono ${isLight ? "bg-white text-gray-500" : "bg-[#1C1C1C] text-gray-500"}`}>
                    {project.demoLink ? getDemoHostname(project.demoLink) : "localhost:3000"}
                  </div>
                </div>
              </div>

              <div className="relative aspect-[16/9] w-full">
                {project.videoUrl ? (
                  <iframe
                    src={project.videoUrl}
                    title={`${project.title} demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Body */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-16">
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isLight ? "text-gray-900" : "text-white"}`}>
                <span className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-blue-500" />
                Project Overview
              </h2>
              <div className={`space-y-4 text-base leading-relaxed ${isLight ? "text-gray-600" : "text-gray-300"}`}>
                {project.detailedDescription.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.section>

            {project.challenges.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isLight ? "text-gray-900" : "text-white"}`}>
                  <span className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-blue-500" />
                  Technical Challenges
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.challenges.map((challenge, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4 }}
                      className={`p-6 border transition-all group ${isLight ? "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300" : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"}`}
                    >
                      <div className={`mb-4 w-10 h-10 flex items-center justify-center border font-mono text-sm ${isLight ? "bg-gray-200 border-gray-300 text-gray-700" : "bg-gray-800 border-gray-700 text-gray-300"}`}>
                        {i + 1}
                      </div>
                      <p className={`text-sm leading-relaxed ${isLight ? "text-gray-600" : "text-gray-300"}`}>{challenge}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="sticky top-28 space-y-6">
              {/* Tech stack */}
              <div className={`border p-6 shadow-lg ${isLight ? "bg-white border-gray-200" : "bg-[#161B22] border-white/10"}`}>
                <h3 className={`text-base font-bold mb-5 flex items-center gap-2 ${isLight ? "text-gray-900" : "text-white"}`}>
                  <Layers className={`w-4 h-4 ${isLight ? "text-blue-600" : "text-blue-400"}`} /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tech) => (
                    <div key={tech} className={`flex items-center gap-2 px-3 py-2 border text-sm cursor-default transition-all group ${isLight ? "bg-gray-50 border-gray-200 hover:bg-gray-100" : "bg-white/5 border-white/5 hover:bg-white/10"}`}>
                      <span className={`transition-colors ${isLight ? "text-gray-500 group-hover:text-gray-900" : "text-gray-400 group-hover:text-white"}`}>
                        {getTechIcon(tech)}
                      </span>
                      <span className={`font-medium ${isLight ? "text-gray-700" : "text-gray-300"}`}>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className={`border p-6 shadow-lg ${isLight ? "bg-white border-gray-200" : "bg-[#161B22] border-white/10"}`}>
                <h3 className={`text-base font-bold mb-5 flex items-center gap-2 ${isLight ? "text-gray-900" : "text-white"}`}>
                  <CheckCircle2 className={`w-4 h-4 ${isLight ? "text-green-600" : "text-green-400"}`} /> Status
                </h3>
                <div className="space-y-5">
                  <div className={`relative pl-5 border-l ${isLight ? "border-gray-200" : "border-white/10"}`}>
                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ${isLight ? "ring-white" : "ring-[#161B22]"}`} />
                    <p className="text-[10px] text-gray-500 font-mono uppercase mb-0.5">Status</p>
                    <p className={`font-medium text-sm ${isLight ? "text-gray-900" : "text-white"}`}>Completed</p>
                  </div>
                  <div className={`relative pl-5 border-l ${isLight ? "border-gray-200" : "border-white/10"}`}>
                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-gray-400 ring-4 ${isLight ? "ring-white" : "ring-[#161B22]"}`} />
                    <p className="text-[10px] text-gray-500 font-mono uppercase mb-0.5">Year</p>
                    <p className={`font-medium text-sm ${isLight ? "text-gray-700" : "text-gray-300"}`}>{project.year}</p>
                  </div>
                  <div className={`pt-4 border-t text-sm flex justify-between ${isLight ? "border-gray-200 text-gray-500" : "border-white/5 text-gray-400"}`}>
                    <span>Build time</span>
                    <span className={`font-mono font-medium ${isLight ? "text-gray-900" : "text-white"}`}>{project.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Next project */}
        {next && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-28 border-t pt-16 ${isLight ? "border-gray-200" : "border-white/10"}`}
          >
            <div className="text-center mb-10">
              <p className={`mb-1 text-sm ${isLight ? "text-gray-500" : "text-gray-400"}`}>Continue Exploring</p>
              <h2 className={`text-3xl font-bold ${isLight ? "text-gray-900" : "text-white"}`}>Next Project</h2>
            </div>

            <Link href={`/projects/${next.slug}`} className="block group">
              <div className={`relative overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-xl ${isLight ? "border-gray-200 bg-white hover:shadow-gray-200/50" : "border-white/10 bg-[#161b22] hover:shadow-blue-500/5"}`}>
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-auto min-h-[200px]">
                    <Image
                      src={next.imageUrl}
                      alt={next.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <span className={`text-sm font-mono mb-3 ${isLight ? "text-blue-600" : "text-blue-400"}`}>
                      View Case Study →
                    </span>
                    <h3 className={`text-2xl md:text-3xl font-bold mb-3 transition-colors ${isLight ? "text-gray-900 group-hover:text-blue-600" : "text-white group-hover:text-blue-400"}`}>
                      {next.title}
                    </h3>
                    <p className={`text-sm leading-relaxed line-clamp-2 mb-6 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                      {next.description}
                    </p>
                    <div className={`w-10 h-10 flex items-center justify-center transition-colors ${isLight ? "bg-gray-900 text-white group-hover:bg-blue-600" : "bg-white text-gray-900 group-hover:bg-blue-400"}`}>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
