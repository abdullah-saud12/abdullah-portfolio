"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Moon, Sun, Type, Home, FolderOpen, BookOpen, Code2, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useTheme } from "@/components/providers/theme-provider";

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const JBIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <text x="2" y="17" fontSize="13" fontWeight="bold" fontFamily="monospace">JB</text>
  </svg>
);

const navLinks = [
  { label: "Home",     href: "/",        icon: Home },
  { label: "Projects", href: "/projects", icon: FolderOpen },
  { label: "Blog",     href: "/blog",     icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, font, toggleTheme, toggleFont } = useTheme();
  const isLight = theme === "light";
  const isJetBrains = font === "jetbrains";

  return (
    <>
      {/* ── Desktop: floating top navbar ───────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block fixed top-4 left-0 right-0 z-50"
      >
        <div className="container mx-auto px-6">
          <div className={`mx-auto flex h-16 max-w-5xl items-center justify-between px-6 shadow-lg backdrop-blur-xl border transition-colors duration-300 ${
            isLight
              ? "bg-white/90 shadow-gray-200/50 border-gray-200"
              : "bg-[#0D1117]/80 shadow-black/20 border-white/[0.08]"
          }`}>

            {/* Logo */}
            <Link href="/" className={`group flex items-center gap-3 font-bold ${isLight ? "text-gray-900" : "text-white"}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`p-2 border transition-all duration-300 ${
                  isLight
                    ? "bg-gray-100 border-gray-200 group-hover:border-gray-300"
                    : "bg-white/5 border-white/10 group-hover:border-white/20"
                }`}
              >
                <Code2 size={20} className={`transition-colors ${isLight ? "text-gray-600 group-hover:text-gray-900" : "text-gray-300 group-hover:text-white"}`} />
              </motion.div>
              <span className={`text-lg font-semibold transition-colors duration-300 ${isLight ? "text-gray-700 group-hover:text-gray-900" : "text-gray-200 group-hover:text-white"}`}>
                Abdullah Saud
              </span>
            </Link>

            {/* Nav links */}
            <nav className="flex items-center space-x-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    pathname === href
                      ? isLight ? "text-gray-900 bg-gray-100" : "text-white bg-white/10"
                      : isLight ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              ))}

              <div className={`w-px h-6 mx-2 ${isLight ? "bg-gray-200" : "bg-white/10"}`} />

              {/* Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
                title={isLight ? "Dark Mode" : "Light Mode"}
                className={`flex items-center justify-center w-9 h-9 transition-all duration-300 ${
                  isLight ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isLight ? <Moon size={18} /> : <Sun size={18} />}
              </motion.button>

              {/* Font toggle */}
              <motion.button
                onClick={toggleFont}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                aria-label={isJetBrains ? "Switch to Geist font" : "Switch to JetBrains Mono font"}
                title={isJetBrains ? "Geist Sans" : "JetBrains Mono"}
                className={`flex items-center justify-center w-9 h-9 transition-all duration-300 ${
                  isJetBrains
                    ? isLight ? "text-purple-600 bg-purple-50 hover:bg-purple-100" : "text-purple-400 bg-purple-500/10 hover:bg-purple-500/20"
                    : isLight ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isJetBrains ? <JBIcon size={18} /> : <Type size={18} />}
              </motion.button>

              <div className={`w-px h-6 mx-1 ${isLight ? "bg-gray-200" : "bg-white/10"}`} />

              {/* GitHub */}
              <motion.a
                href="https://github.com/abdullah-saud12"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                aria-label="GitHub"
                className={`group flex items-center gap-1 px-3 py-2 transition-all duration-300 ${
                  isLight ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <SiGithub size={16} className="group-hover:scale-105 transition-transform" />
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              {/* X */}
              <motion.a
                href="https://www.google.com"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                aria-label="X (Twitter)"
                className={`group flex items-center gap-1 px-3 py-2 transition-all duration-300 ${
                  isLight ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <XIcon size={16} />
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile: top title bar ───────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:hidden fixed top-3 left-0 right-0 z-50 px-4"
      >
        <div className={`backdrop-blur-xl border px-4 py-2.5 shadow-lg transition-colors duration-300 ${
          isLight ? "bg-white/90 border-gray-200 shadow-gray-200/50" : "bg-[#0D1117]/80 border-white/[0.08]"
        }`}>
          <Link href="/" className="group flex items-center justify-center gap-2">
            <div className={`p-1.5 border transition-all duration-300 ${isLight ? "bg-gray-100 border-gray-200" : "bg-white/5 border-white/10"}`}>
              <Code2 size={16} className={`transition-colors ${isLight ? "text-gray-600" : "text-gray-300"}`} />
            </div>
            <span className={`text-base font-semibold ${isLight ? "text-gray-700" : "text-gray-200"}`}>
              Abdullah Saud
            </span>
          </Link>
        </div>
      </motion.header>

      {/* ── Mobile: iOS-style bottom tab bar ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:hidden fixed bottom-2 left-2 right-2 z-50"
      >
        <div className={`backdrop-blur-3xl border px-1 py-1 shadow-xl transition-colors duration-300 ${
          isLight ? "bg-white/90 border-gray-200 shadow-gray-200/50" : "bg-black/40 border-white/15 shadow-black/30"
        }`}>
          <div className="flex items-center justify-between">
            {navLinks.map(({ label, href, icon: Icon }) => (
              <motion.div key={href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Link
                  href={href}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 transition-all duration-300 ${
                    pathname === href
                      ? isLight ? "text-gray-900" : "text-white"
                      : isLight ? "text-gray-500 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs mt-1 font-medium">{label}</span>
                </Link>
              </motion.div>
            ))}

            <div className={`h-6 w-px mx-0.5 ${isLight ? "bg-gray-200" : "bg-white/10"}`} />

            {/* Theme toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <button
                onClick={toggleTheme}
                aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
                className={`flex flex-col items-center justify-center py-2.5 px-1 w-full transition-all duration-300 ${
                  isLight ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {isLight ? <Moon size={18} /> : <Sun size={18} />}
                <span className="text-xs mt-1 font-medium">{isLight ? "Dark" : "Light"}</span>
              </button>
            </motion.div>

            {/* Font toggle */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <button
                onClick={toggleFont}
                aria-label={isJetBrains ? "Switch to Geist" : "Switch to JetBrains Mono"}
                className={`flex flex-col items-center justify-center py-2.5 px-1 w-full transition-all duration-300 ${
                  isJetBrains
                    ? isLight ? "text-purple-600 hover:bg-purple-50" : "text-purple-400 hover:bg-purple-500/10"
                    : isLight ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100" : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {isJetBrains ? <JBIcon size={18} /> : <Type size={18} />}
                <span className="text-xs mt-1 font-medium">{isJetBrains ? "JB" : "Aa"}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
