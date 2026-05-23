"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, FileText, ChevronDown, Cpu, Layers, Zap } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import TechTicker from "./tech-ticker";
import AudienceSwitch from "@/components/audience-switch";
import { useTheme } from "@/components/providers/theme-provider";

const AVATAR_URL =
  "https://api.dicebear.com/9.x/avataaars/png?seed=abdullah&size=400&backgroundColor=6366f1";

const ROLES = [
  { title: "Backend Engineer",               article: "a" },
  { title: "AI Systems Builder",             article: "an" },
  { title: "Early-Stage Product Builder",    article: "an" },
  { title: "Conversational Agent Developer", article: "a" },
];

const XIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0 } },
};

const itemVariants = {
  hidden:   { y: 12, opacity: 0 },
  visible:  { y: 0,  opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background */}
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${isLight
        ? "[background-image:linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px)]"
        : "[background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)]"
      }`} />

      <div className="container mx-auto px-4 pt-24 pb-20 sm:pt-32 sm:pb-16 w-full min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full flex flex-col justify-center items-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3 sm:space-y-4 flex flex-col justify-center items-center w-full"
          >

            {/* Audience switch — top */}
            <motion.div variants={itemVariants}>
              <AudienceSwitch />
            </motion.div>

            {/* Avatar with availability indicator */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative inline-block group">
                <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:ring-purple-500/30 ${isLight ? "ring-gray-200 bg-gray-100" : "ring-gray-800/50 bg-gray-900"}`}>
                  <Image
                    src={AVATAR_URL}
                    alt="Abdullah Saud"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>

                {/* Green availability pulse */}
                <div className="absolute bottom-1 right-1 translate-x-[25%] translate-y-[25%]">
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-full">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className={`relative inline-flex w-3.5 h-3.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 ${isLight ? "border-white" : "border-[#0D1117]"}`} />
                  </div>

                  {/* Hover tooltip */}
                  <div className="absolute left-[calc(100%+0.6rem)] top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
                    <div className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 ${isLight ? "bg-white border-l border-b border-gray-200" : "bg-gray-900/95 border-l border-b border-white/10"}`} />
                    <div className={`relative backdrop-blur-md border rounded-xl px-3 py-2 whitespace-nowrap ${isLight ? "bg-white border-gray-200 shadow-lg" : "bg-gray-900/95 border-white/10 shadow-xl"}`}>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className={`text-xs font-medium ${isLight ? "text-gray-800" : "text-gray-100"}`}>
                          Available for Work
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="space-y-3 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className={`drop-shadow-sm ${isLight ? "text-gray-900" : "text-white"}`}>
                  Hi, I&apos;m
                </span>
                <br />
                <span className={`text-transparent bg-clip-text ${isLight ? "bg-gradient-to-b from-gray-900 to-gray-600" : "bg-gradient-to-b from-white to-white/60"}`}>
                  Abdullah Saud
                </span>
              </h1>

              {/* Role switcher */}
              <div className={`text-xl sm:text-2xl md:text-3xl font-medium h-8 sm:h-10 md:h-12 flex items-center justify-center ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                <span>I&apos;m </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className={`inline-block ml-2 ${isLight ? "text-gray-800" : "text-white"}`}
                  >
                    {ROLES[roleIndex].article} {ROLES[roleIndex].title}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Description with inline pills */}
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto px-4">
              <p className={`text-base sm:text-lg md:text-xl leading-relaxed ${isLight ? "text-gray-600" : "text-gray-300"}`}>
                I build{" "}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-none font-medium text-sm align-middle ${isLight ? "bg-green-100 text-green-700 border border-green-200" : "bg-green-500/10 text-green-400 border border-green-500/20"}`}>
                  <Zap size={13} /> Production-grade
                </span>{" "}
                backend systems and AI agents — 6+ years shipping SaaS from zero, twice as a founding engineer. Currently building{" "}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-none font-medium text-sm align-middle ${isLight ? "bg-purple-100 text-purple-700 border border-purple-200" : "bg-purple-500/10 text-purple-400 border border-purple-500/20"}`}>
                  <Cpu size={13} /> LLM Agents
                </span>{" "}
                and{" "}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-none font-medium text-sm align-middle ${isLight ? "bg-blue-100 text-blue-700 border border-blue-200" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"}`}>
                  <Layers size={13} /> Integration Systems
                </span>
                .
              </p>
            </motion.div>

            {/* Tech Ticker */}
            <motion.div variants={itemVariants} className="w-full pt-1">
              <TechTicker />
            </motion.div>

            {/* Action buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold hover:scale-105 active:scale-95 transition-all shadow-xl text-sm sm:text-base ${isLight ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-white text-gray-900 hover:bg-gray-100"}`}
              >
                <FileText size={17} /> Resume / CV
              </a>
              <a
                href="mailto:abdlhsaud@gmail.com"
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-medium transition-all border text-sm sm:text-base ${isLight ? "text-gray-700 border-gray-300 hover:bg-gray-100" : "text-white border-white/10 hover:bg-white/5 hover:border-white/30"}`}
              >
                <Mail size={17} /> Get in touch
              </a>
            </motion.div>

            {/* Social links + scroll */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 pt-4">
              <div className="flex items-center gap-6">
                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                  className={`hover:scale-110 transition-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}>
                  <XIcon />
                </a>
                <a href="https://www.linkedin.com/in/imabd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className={`hover:scale-110 transition-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}>
                  <FaLinkedin size={20} />
                </a>
                <a href="https://github.com/abdullah-saud12" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                  className={`hover:scale-110 transition-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}>
                  <SiGithub size={20} />
                </a>
                <a href="mailto:abdlhsaud@gmail.com" aria-label="Email"
                  className={`hover:scale-110 transition-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}>
                  <Mail size={22} />
                </a>
              </div>
              <a href="#skills" aria-label="Scroll down"
                className={`hidden md:inline-flex animate-bounce p-2 transition-colors ${isLight ? "text-gray-400 hover:text-gray-700" : "text-gray-500 hover:text-white"}`}>
                <ChevronDown size={24} />
              </a>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
