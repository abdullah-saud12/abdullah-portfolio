"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, FileText, ChevronDown, ArrowRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import AudienceSwitch from "@/components/audience-switch";
import { useTheme } from "@/components/providers/theme-provider";

const AVATAR_URL =
  "https://api.dicebear.com/9.x/avataaars/png?seed=abdullah&size=400&backgroundColor=6366f1";

const OUTCOMES = [
  "Turn ambiguity into shipped product",
  "Debug production at 2am and not panic",
  "Own an entire backend from scratch",
  "Ship AI features that actually work",
];

const XIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0 } },
};

const itemVariants = {
  hidden:  { y: 14, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export default function FounderHero() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [outcomeIndex, setOutcomeIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setOutcomeIndex((i) => (i + 1) % OUTCOMES.length), 2800);
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

      {/* Warm orange glow — founder identity */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] -z-10 rounded-full blur-3xl pointer-events-none ${isLight ? "bg-orange-100/60" : "bg-orange-500/5"}`} />

      <div className="container mx-auto px-4 pt-24 pb-20 sm:pt-32 sm:pb-16 w-full min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full flex flex-col justify-center items-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 sm:space-y-5 flex flex-col justify-center items-center w-full"
          >

            {/* Audience switch — top */}
            <motion.div variants={itemVariants}>
              <AudienceSwitch />
            </motion.div>

            {/* Avatar */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative inline-block group">
                <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:ring-orange-500/30 ${isLight ? "ring-orange-200 bg-gray-100" : "ring-orange-800/30 bg-gray-900"}`}>
                  <Image
                    src={AVATAR_URL}
                    alt="Abdullah Saud"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>

                {/* Availability dot */}
                <div className="absolute bottom-1 right-1 translate-x-[25%] translate-y-[25%]">
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-full">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className={`relative inline-flex w-3.5 h-3.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 ${isLight ? "border-white" : "border-[#0D1117]"}`} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-3 text-center max-w-3xl px-4">
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight ${isLight ? "text-gray-900" : "text-white"}`}>
                I don&apos;t need a job description.
                <br />
                <span className={`text-transparent bg-clip-text ${isLight
                  ? "bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500"
                  : "bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400"
                }`}>
                  Tell me the outcome.
                </span>
              </h1>

              {/* Rotating capability */}
              <div className={`text-lg sm:text-xl md:text-2xl font-medium flex items-center justify-center gap-2 h-8 sm:h-10 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
                <span>I&apos;ll</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={outcomeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className={`inline-block ${isLight ? "text-orange-600" : "text-orange-400"}`}
                  >
                    {OUTCOMES[outcomeIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Value prop */}
            <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto px-4">
              <p className={`text-base sm:text-lg leading-relaxed ${isLight ? "text-gray-600" : "text-gray-300"}`}>
                Backend engineer with 6+ years shipping SaaS from zero, twice as a founding engineer.
                I build the backend, own the infra, wire the AI, and keep it running in production —
                <span className={`font-semibold ${isLight ? "text-gray-800" : "text-white"}`}> without handholding</span>.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={itemVariants} className="flex items-center gap-8 sm:gap-12">
              {[
                { value: "6+", label: "Years shipping" },
                { value: "2×", label: "Founding engineer" },
                { value: "∞", label: "AI curiosity" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-2xl sm:text-3xl font-bold ${isLight ? "text-orange-600" : "text-orange-400"}`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs sm:text-sm font-medium ${isLight ? "text-gray-500" : "text-gray-500"}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold hover:scale-105 active:scale-95 transition-all shadow-xl text-sm sm:text-base ${isLight
                  ? "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20"
                  : "bg-orange-500 text-white hover:bg-orange-400 shadow-orange-500/20"
                }`}
              >
                <FileText size={17} /> Resume / CV
              </a>
              <a
                href="mailto:abdlhsaud@gmail.com"
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-medium transition-all border text-sm sm:text-base ${isLight
                  ? "text-gray-700 border-gray-300 hover:bg-gray-100"
                  : "text-white border-white/10 hover:bg-white/5 hover:border-white/30"
                }`}
              >
                <Mail size={17} /> Get in touch
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 pt-2">
              <div className="flex items-center gap-6">
                <a href="https://x.com/YOUR_HANDLE" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                  className={`hover:scale-110 transition-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}>
                  <XIcon />
                </a>
                <a href="https://linkedin.com/in/YOUR_HANDLE" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
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

              {/* Bridge to engineer view */}
              <a href="/#skills" aria-label="Scroll down"
                className={`hidden md:inline-flex animate-bounce p-2 transition-colors ${isLight ? "text-gray-400 hover:text-gray-700" : "text-gray-500 hover:text-white"}`}>
                <ChevronDown size={24} />
              </a>
            </motion.div>

            {/* Engineer crosslink */}
            <motion.div variants={itemVariants}>
              <Link
                href="/?for=engineers"
                className={`inline-flex items-center gap-1.5 text-xs font-mono transition-colors ${isLight ? "text-gray-400 hover:text-blue-600" : "text-gray-500 hover:text-blue-400"}`}
              >
                Want the technical breakdown? For Engineers
                <ArrowRight size={12} />
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
