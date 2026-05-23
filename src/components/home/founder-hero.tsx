"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Mail, FileText, ChevronDown, ArrowRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import AudienceSwitch from "@/components/audience-switch";
import { useTheme } from "@/components/providers/theme-provider";

const AVATAR_URL =
  "https://api.dicebear.com/9.x/avataaars/png?seed=abdullah&size=400&backgroundColor=6366f1";

const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function FounderHero() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Base bg */}
      <div
        className={`absolute inset-0 -z-20 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`}
      />

      {/* Grid */}
      <div
        className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
          isLight
            ? "[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]"
            : "[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]"
        }`}
      />

      {/* Founder-mode signature glow */}
      <div
        className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] -z-10 rounded-full opacity-50 blur-[140px] pointer-events-none ${
          isLight
            ? "bg-gradient-to-br from-orange-200/60 via-amber-100/40 to-rose-100/40"
            : "bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-rose-500/15"
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 w-[500px] h-[500px] -z-10 rounded-full opacity-30 blur-[120px] pointer-events-none ${
          isLight
            ? "bg-gradient-to-tr from-blue-200/50 to-transparent"
            : "bg-gradient-to-tr from-blue-500/10 to-transparent"
        }`}
      />

      <div className="container mx-auto px-4 pt-24 pb-20 sm:pt-32 sm:pb-16 md:pt-32 md:pb-20 w-full min-h-[100dvh] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full flex flex-col justify-center items-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-4 sm:gap-5 w-full"
          >
            {/* Audience Switch */}
            <motion.div variants={itemVariants}>
              <AudienceSwitch />
            </motion.div>

            {/* Availability badge */}
            <motion.div variants={itemVariants}>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 backdrop-blur-md border text-xs sm:text-sm font-medium ${
                  isLight
                    ? "bg-white/80 border-emerald-200 text-emerald-700"
                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Currently available
              </div>
            </motion.div>

            {/* Avatar */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative inline-block">
                {/* Soft outer halo */}
                <div
                  aria-hidden
                  className={`absolute -inset-3 rounded-full blur-2xl opacity-60 pointer-events-none ${
                    isLight
                      ? "bg-gradient-to-br from-orange-200/70 to-rose-200/50"
                      : "bg-gradient-to-br from-orange-500/30 to-rose-500/20"
                  }`}
                />

                <div
                  className={`relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 shadow-2xl ${
                    isLight
                      ? "ring-white bg-gray-100 shadow-orange-300/50"
                      : "ring-white/90 bg-gray-900 shadow-orange-500/25"
                  }`}
                >
                  <Image
                    src={AVATAR_URL}
                    alt="Abdullah Saud — Backend Engineer"
                    fill
                    sizes="(max-width: 768px) 7rem, 9rem"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Status dot */}
                <div className="absolute bottom-3 right-1 translate-x-[28%] translate-y-[28%]">
                  <div
                    className={`relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[3px] shadow-sm ${
                      isLight
                        ? "border-[#fafafa] bg-[#fafafa]"
                        : "border-[#0D1117] bg-[#0D1117]"
                    }`}
                  >
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex items-center justify-center w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                      <span className="absolute inset-0 rounded-full bg-white/20" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Headlines */}
            <motion.div
              variants={itemVariants}
              className="space-y-2 text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
                <span
                  className={`drop-shadow-sm ${isLight ? "text-gray-900" : "text-white"}`}
                >
                  I don&apos;t need a
                </span>
                <br />
                <span
                  className={`text-transparent bg-clip-text ${isLight ? "bg-gradient-to-br from-gray-900 via-orange-700 to-rose-700" : "bg-gradient-to-br from-white via-orange-200 to-amber-300"}`}
                >
                  job description.
                </span>
              </h1>
              <p
                className={`text-lg sm:text-xl md:text-2xl font-medium ${isLight ? "text-gray-600" : "text-gray-400"}`}
              >
                Tell me the outcome.{" "}
                <span
                  className={`font-semibold ${isLight ? "text-gray-900" : "text-white"}`}
                >
                  I&apos;ll ship it.
                </span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="max-w-3xl mx-auto px-2"
            >
              <p
                className={`text-sm sm:text-base md:text-lg leading-relaxed text-center ${isLight ? "text-gray-600" : "text-gray-300"}`}
              >
                Backend engineer with 6+ years shipping SaaS from zero, twice as a founding engineer.
                I build the backend, own the infra, wire the AI, and keep it running in production —
                <span
                  className={`font-semibold ${isLight ? "text-gray-800" : "text-white"}`}
                >
                  {" "}
                  without handholding.
                </span>
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-3 pt-3"
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xl text-sm sm:text-base ${
                  isLight
                    ? "bg-gradient-to-br from-orange-600 to-rose-600 text-white hover:shadow-orange-500/30 shadow-orange-500/20"
                    : "bg-gradient-to-br from-orange-500 to-rose-500 text-white hover:shadow-orange-500/40 shadow-orange-500/20"
                }`}
              >
                <FileText size={18} />
                Resume / CV
              </a>
              <a
                href="mailto:abdlhsaud@gmail.com"
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-medium transition-all border hover:scale-[1.03] active:scale-[0.98] text-sm sm:text-base ${
                  isLight
                    ? "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    : "bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.06] hover:border-white/20"
                }`}
              >
                <Mail size={18} />
                Get in touch
              </a>
              <Link
                href="/projects"
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 font-medium transition-all border hover:scale-[1.03] active:scale-[0.98] text-sm sm:text-base ${
                  isLight
                    ? "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    : "bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.06] hover:border-white/20"
                }`}
              >
                View work
                <ArrowRight size={14} className="opacity-70" />
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-3 pt-2"
            >
              <div className="flex items-center gap-5">
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className={`hover:scale-110 transition-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
                >
                  <XIcon size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/imabd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={`hover:scale-110 transition-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="https://github.com/abdullah-saud12"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={`hover:scale-110 transition-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
                >
                  <SiGithub size={18} />
                </a>
                <a
                  href="mailto:abdlhsaud@gmail.com"
                  aria-label="Email"
                  className={`hover:scale-110 transition-all ${isLight ? "text-gray-500 hover:text-gray-900" : "text-gray-400 hover:text-white"}`}
                >
                  <Mail size={18} />
                </a>
              </div>

              {/* Engineer crosslink */}
              <Link
                href="/?for=engineers"
                className={`inline-flex items-center gap-1.5 text-xs font-mono transition-colors ${isLight ? "text-gray-400 hover:text-blue-600" : "text-gray-500 hover:text-blue-400"}`}
              >
                Want the technical breakdown?{" "}
                <span className="underline underline-offset-2">
                  For Engineers →
                </span>
              </Link>

              <a
                href="#receipts"
                className={`hidden md:inline-flex animate-bounce p-2 transition-colors ${
                  isLight
                    ? "text-gray-400 hover:text-gray-700"
                    : "text-gray-500 hover:text-white"
                }`}
                aria-label="Scroll down"
              >
                <ChevronDown size={22} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
