"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiNodedotjs, SiPython, SiTypescript, SiGo, SiFastapi, SiExpress,
  SiPostgresql, SiMongodb, SiRedis, SiElasticsearch,
  SiDocker, SiKubernetes, SiGit, SiNextdotjs, SiReact,
  SiTailwindcss, SiGrafana, SiGraphql, SiOpenai, SiLangchain, SiAnthropic,
} from "react-icons/si";
import { FaAmazon } from "react-icons/fa";
import { Code } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import SectionHeading from "./section-heading";

const techs = [
  { id: "nodejs",        name: "Node.js",       icon: SiNodedotjs,     dark: "#86efac", light: "#16a34a" },
  { id: "python",        name: "Python",        icon: SiPython,        dark: "#fde68a", light: "#ca8a04" },
  { id: "typescript",   name: "TypeScript",    icon: SiTypescript,    dark: "#93c5fd", light: "#2563eb" },
  { id: "go",           name: "Go",            icon: SiGo,            dark: "#67e8f9", light: "#0891b2" },
  { id: "fastapi",      name: "FastAPI",       icon: SiFastapi,       dark: "#5eead4", light: "#0d9488" },
  { id: "express",      name: "Express",       icon: SiExpress,       dark: "#d1d5db", light: "#374151" },
  { id: "postgresql",   name: "PostgreSQL",    icon: SiPostgresql,    dark: "#93c5fd", light: "#1d4ed8" },
  { id: "mongodb",      name: "MongoDB",       icon: SiMongodb,       dark: "#86efac", light: "#15803d" },
  { id: "redis",        name: "Redis",         icon: SiRedis,         dark: "#fca5a5", light: "#dc2626" },
  { id: "elastic",      name: "Elasticsearch", icon: SiElasticsearch, dark: "#fde68a", light: "#b45309" },
  { id: "aws",          name: "AWS",           icon: FaAmazon,        dark: "#fdba74", light: "#ea580c" },
  { id: "docker",       name: "Docker",        icon: SiDocker,        dark: "#93c5fd", light: "#2563eb" },
  { id: "kubernetes",   name: "Kubernetes",    icon: SiKubernetes,    dark: "#c4b5fd", light: "#7c3aed" },
  { id: "git",          name: "Git",           icon: SiGit,           dark: "#fca5a5", light: "#dc2626" },
  { id: "react",        name: "React",         icon: SiReact,         dark: "#67e8f9", light: "#0284c7" },
  { id: "nextjs",       name: "Next.js",       icon: SiNextdotjs,     dark: "#f1f5f9", light: "#0f172a" },
  { id: "tailwind",     name: "TailwindCSS",   icon: SiTailwindcss,   dark: "#67e8f9", light: "#0891b2" },
  { id: "graphql",      name: "GraphQL",       icon: SiGraphql,       dark: "#f9a8d4", light: "#be185d" },
  { id: "openai",       name: "OpenAI",        icon: SiOpenai,        dark: "#d1d5db", light: "#374151" },
  { id: "anthropic",    name: "Anthropic",     icon: SiAnthropic,     dark: "#fde68a", light: "#92400e" },
  { id: "langchain",    name: "LangChain",     icon: SiLangchain,     dark: "#86efac", light: "#15803d" },
  { id: "grafana",      name: "Grafana",       icon: SiGrafana,       dark: "#fdba74", light: "#ea580c" },
];

function SkillItem({ tech, isLight }: { tech: typeof techs[0]; isLight: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Icon = tech.icon;
  const color = isLight ? tech.light : tech.dark;

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.2, y: -5, transition: { duration: 0.2 } }}
        className="p-2 sm:p-3 cursor-pointer"
      >
        <Icon
          className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-colors duration-300 ${hovered ? "" : isLight ? "text-gray-300" : "text-gray-700"}`}
          style={{ color: hovered ? color : undefined }}
        />
        {hovered && (
          <motion.div
            className="absolute inset-0 blur-2xl -z-10 opacity-20"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, y: -15, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className={`absolute -top-8 left-1/2 z-50 px-3 py-1.5 border backdrop-blur-md text-xs font-medium whitespace-nowrap shadow-xl pointer-events-none ${isLight ? "border-gray-200 bg-white/90 text-gray-800" : "border-white/10 bg-gray-900/90 text-white"}`}
          >
            {tech.name}
            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b ${isLight ? "bg-white/90 border-gray-200" : "bg-gray-900/90 border-white/10"}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Skills() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${isLight
        ? "[background-image:linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px)]"
        : "[background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)]"
      }`} />

      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading
          subtitle="Tech Stack"
          title="Skills"
          description="The technologies I build with daily."
          className="mb-16"
        />

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6 md:gap-x-10 md:gap-y-10 max-w-4xl mx-auto">
          {techs.map((tech) => (
            <SkillItem key={tech.id} tech={tech} isLight={isLight} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 border text-sm ${isLight ? "bg-gray-100 border-gray-200 text-gray-500" : "bg-white/5 border-white/5 text-gray-500"}`}>
            <Code size={14} />
            <span>{techs.length}+ technologies in my stack</span>
          </div>
        </div>
      </div>
    </section>
  );
}
