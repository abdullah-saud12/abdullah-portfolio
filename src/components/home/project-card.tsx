"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Sparkles } from "lucide-react";
import { SiGithub } from "react-icons/si";
import {
  SiNextdotjs, SiPostgresql, SiMongodb, SiRedis, SiDocker,
  SiTypescript, SiReact, SiNodedotjs, SiPython, SiGraphql,
  SiOpenai, SiLangchain, SiBun,
} from "react-icons/si";
import { FaAmazon } from "react-icons/fa";
import { useTheme } from "@/components/providers/theme-provider";
import type { Project } from "@/data/types";

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  const cls = "w-3.5 h-3.5";
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
  return null;
};

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
}

export default function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group h-full"
    >
      <div className={`flex flex-col h-full border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isLight
        ? "bg-white border-gray-200 hover:border-gray-300 hover:shadow-blue-500/5"
        : "bg-[#161b22] border-white/10 hover:border-white/20 hover:shadow-blue-500/5"
      }`}>

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className={`absolute inset-0 ${isLight ? "bg-gradient-to-t from-white/20 to-transparent" : "bg-gradient-to-t from-[#161b22]/40 to-transparent"}`} />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-[10px] font-medium backdrop-blur-sm">
                <Sparkles size={10} /> Featured
              </span>
            )}
            {project.isHackathonProject && (
              <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[10px] font-medium backdrop-blur-sm">
                Hackathon
              </span>
            )}
          </div>

          {/* Year */}
          <span className={`absolute top-3 right-3 px-2 py-0.5 text-[10px] font-mono font-medium backdrop-blur-sm border ${isLight ? "bg-white/80 border-gray-200 text-gray-600" : "bg-black/50 border-white/10 text-gray-400"}`}>
            {project.year}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className={`text-lg font-bold mb-2 transition-colors ${isLight ? "text-gray-900 group-hover:text-blue-600" : "text-white group-hover:text-blue-400"}`}>
            {project.title}
          </h3>
          <p className={`text-sm leading-relaxed mb-4 flex-1 ${isLight ? "text-gray-600" : "text-gray-400"}`}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium border ${isLight
                  ? "bg-gray-50 border-gray-200 text-gray-600"
                  : "bg-white/5 border-white/10 text-gray-400"
                }`}
              >
                {getTechIcon(tag)}
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 mt-auto">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border transition-colors ${isLight
                  ? "bg-gray-900 text-white border-gray-900 hover:bg-gray-700"
                  : "bg-white text-gray-900 border-white hover:bg-gray-100"
                }`}
              >
                <Globe size={12} /> Live
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 border transition-colors ${isLight
                  ? "border-gray-200 text-gray-700 hover:bg-gray-50"
                  : "border-white/10 text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <SiGithub size={12} /> GitHub
              </a>
            )}
            <Link
              href={`/projects/${project.slug}`}
              className={`ml-auto text-xs font-medium transition-colors ${isLight ? "text-blue-600 hover:text-blue-800" : "text-blue-400 hover:text-blue-300"}`}
            >
              View details →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
