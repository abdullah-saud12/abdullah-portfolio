"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";
import SectionHeading from "@/components/home/section-heading";
import ProjectCard from "@/components/home/project-card";
import { getAllProjects } from "@/data/projects";

export default function ProjectsClient() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { theme } = useTheme();
  const isLight = theme === "light";
  const projects = getAllProjects();

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`}>
      <section ref={ref} className="py-20 pt-32 relative overflow-hidden">
        <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
        <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${isLight
          ? "[background-image:linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px)]"
          : "[background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)]"
        }`} />

        <div className="container mx-auto px-4 max-w-7xl">
          <SectionHeading
            subtitle="Portfolio"
            title="All Projects"
            description="A complete collection of AI systems, backend infrastructure, and full-stack applications."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className={`inline-flex items-center gap-2 px-6 py-3 border text-sm ${isLight ? "bg-gray-100 border-gray-200 text-gray-600" : "bg-white/5 border-white/10 text-gray-400"}`}>
              {projects.length} projects showcased
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
