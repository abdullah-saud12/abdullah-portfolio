"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";
import {
  SiNodedotjs, SiPython, SiPostgresql, SiMongodb, SiRedis,
  SiDocker, SiGraphql, SiElasticsearch, SiGrafana, SiExpress,
} from "react-icons/si";
import { FaAmazon } from "react-icons/fa";
import { useTheme } from "@/components/providers/theme-provider";
import SectionHeading from "./section-heading";
import { getAllExperiences } from "@/data/experience";

const techIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Node.js":     SiNodedotjs,
  "Python":      SiPython,
  "PostgreSQL":  SiPostgresql,
  "MongoDB":     SiMongodb,
  "Redis":       SiRedis,
  "AWS Lambda":  FaAmazon,
  "Docker":      SiDocker,
  "GraphQL":     SiGraphql,
  "Elasticsearch": SiElasticsearch,
  "Grafana":     SiGrafana,
  "Express":     SiExpress,
};

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { theme } = useTheme();
  const isLight = theme === "light";
  const experiences = getAllExperiences();

  return (
    <section ref={ref} id="experience" className="py-28 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${isLight
        ? "[background-image:linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px)]"
        : "[background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)]"
      }`} />

      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading
          subtitle="Experience"
          title="Work History"
          description="Building scalable systems and AI products."
          className="mb-12"
        />

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className={`relative p-5 sm:p-6 border transition-all duration-300 hover:-translate-y-1 ${isLight
                ? "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xl hover:shadow-blue-500/5"
                : "border-white/10 bg-[#161b22] hover:border-white/20 hover:shadow-xl hover:shadow-blue-500/5"
              }`}>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 border ${isLight ? "bg-gray-50 border-gray-200" : "bg-white/5 border-white/10"}`}>
                      <Briefcase size={22} className={isLight ? "text-gray-400" : "text-gray-500"} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-0.5">
                        <h3 className={`text-xl sm:text-2xl font-bold transition-colors ${isLight ? "text-gray-900 group-hover:text-blue-600" : "text-white group-hover:text-blue-400"}`}>
                          {exp.company}
                        </h3>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
                            Current
                          </span>
                        )}
                      </div>
                      <p className={`text-base font-medium ${isLight ? "text-gray-600" : "text-gray-300"}`}>{exp.role}</p>
                      <p className={`text-xs mt-0.5 ${isLight ? "text-gray-400" : "text-gray-500"}`}>{exp.location}</p>
                    </div>
                  </div>
                  <div className={`self-start sm:self-auto text-xs font-medium px-3 py-1 border whitespace-nowrap font-mono ${isLight ? "text-gray-500 bg-gray-50 border-gray-200" : "text-gray-400 bg-white/5 border-white/10"}`}>
                    {exp.startDate} — {exp.endDate}
                  </div>
                </div>

                {/* Tech tags */}
                <div className="mb-5 flex flex-wrap gap-2">
                  {exp.techStack.map((tech, i) => {
                    const Icon = techIconMap[tech];
                    return (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-xs font-medium border transition-colors cursor-default ${isLight
                          ? "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                          : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-gray-200"
                        }`}
                      >
                        {Icon && <Icon className="text-xs sm:text-sm" />}
                        {tech}
                      </span>
                    );
                  })}
                </div>

                {/* Responsibilities */}
                <ul className="space-y-2.5">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 text-sm sm:text-[15px] transition-colors ${isLight ? "text-gray-600 group-hover:text-gray-700" : "text-gray-400 group-hover:text-gray-300"}`}>
                      <span className="text-blue-500 mt-1.5 shrink-0 text-[10px]">●</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
