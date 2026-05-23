"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Layers } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import SectionHeading from "./section-heading";
import ProjectCard from "./project-card";
import { getAllProjects } from "@/data/projects";

type Filter = "All" | "AI" | "Web";

const filters: { id: Filter; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "All", label: "All Projects", icon: Sparkles },
  { id: "AI",  label: "AI Powered",   icon: Brain },
  { id: "Web", label: "Web Apps",     icon: Layers },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [active, setActive] = useState<Filter>("All");

  const all = getAllProjects();
  const shown = active === "All" ? all : all.filter((p) => p.category === active);

  return (
    <section ref={ref} id="projects" className="py-28 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${isLight
        ? "[background-image:linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px)]"
        : "[background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)]"
      }`} />

      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading
          subtitle="Portfolio"
          title="Featured Work"
          description="A collection of AI-driven applications and full-stack systems built from the ground up."
          className="mb-10"
        />

        {/* Filter */}
        <div className="flex justify-center mb-12">
          <div className={`flex p-1.5 border ${isLight ? "bg-white/80 border-gray-200 shadow-lg shadow-gray-200/30" : "bg-gray-900/60 border-gray-800/60"}`}>
            {filters.map((f) => {
              const Icon = f.icon;
              const isActive = active === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActive(f.id)}
                  className={`relative px-4 py-2.5 sm:px-6 text-sm font-medium transition-all duration-300 focus:outline-none ${isActive
                    ? isLight ? "text-gray-900" : "text-white"
                    : isLight ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className={`absolute inset-0 border shadow-sm ${isLight ? "bg-white border-gray-300" : "bg-gray-800 border-gray-700"}`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} />
                    <span className="hidden sm:inline">{f.label}</span>
                    <span className="sm:hidden">{f.id}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {shown.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={index} isInView={isInView} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
