"use client";

import { motion } from "framer-motion";
import {
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGraphql,
  SiReact,
  SiTypescript,
  SiFastapi,
} from "react-icons/si";
import { Network, Cloud } from "lucide-react";
import { FaAmazon } from "react-icons/fa";
import { useTheme } from "@/components/providers/theme-provider";

const techs = [
  { name: "Node.js",      icon: SiNodedotjs,        darkColor: "text-green-400",  lightColor: "text-green-600" },
  { name: "Python",       icon: SiPython,            darkColor: "text-yellow-300", lightColor: "text-yellow-600" },
  { name: "FastAPI",      icon: SiFastapi,           darkColor: "text-teal-400",   lightColor: "text-teal-600" },
  { name: "PostgreSQL",   icon: SiPostgresql,        darkColor: "text-blue-300",   lightColor: "text-blue-600" },
  { name: "MongoDB",      icon: SiMongodb,           darkColor: "text-green-500",  lightColor: "text-green-700" },
  { name: "Redis",        icon: SiRedis,             darkColor: "text-red-400",    lightColor: "text-red-600" },
  { name: "Docker",       icon: SiDocker,            darkColor: "text-blue-400",   lightColor: "text-blue-600" },
  { name: "AWS",          icon: FaAmazon,            darkColor: "text-orange-400", lightColor: "text-orange-600" },
  { name: "GraphQL",      icon: SiGraphql,           darkColor: "text-pink-400",   lightColor: "text-pink-600" },
  { name: "React",        icon: SiReact,             darkColor: "text-cyan-400",   lightColor: "text-cyan-600" },
  { name: "TypeScript",   icon: SiTypescript,        darkColor: "text-blue-400",   lightColor: "text-blue-600" },
  { name: "System Design",icon: Network,             darkColor: "text-purple-400", lightColor: "text-purple-600" },
];

export default function TechTicker() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="w-full overflow-hidden relative py-4 sm:py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-8 sm:gap-12 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...techs, ...techs].map((tech, i) => (
          <div key={`${tech.name}-${i}`} className="flex items-center gap-2 group select-none">
            <div className={`text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${isLight ? tech.lightColor : tech.darkColor}`}>
              <tech.icon />
            </div>
            <span className={`text-sm sm:text-base font-medium whitespace-nowrap transition-colors ${isLight ? "text-gray-500 group-hover:text-gray-700" : "text-gray-400 group-hover:text-gray-200"}`}>
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
