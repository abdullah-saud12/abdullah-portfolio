"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { useTheme } from "@/components/providers/theme-provider";
import { useAudience } from "@/context/audience-provider";
import Link from "next/link";

const FounderContact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { setAudience } = useAudience();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 sm:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div
        className={`absolute inset-0 -z-20 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`}
      />
      <div
        className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
          isLight
            ? "[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]"
            : "[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]"
        }`}
      />

      {/* Signature glow */}
      <div
        className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-40 blur-[140px] -z-10 ${
          isLight
            ? "bg-gradient-to-br from-orange-200/60 via-rose-100/50 to-amber-100/50"
            : "bg-gradient-to-br from-orange-500/15 via-rose-500/10 to-amber-500/10"
        }`}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 mb-6 backdrop-blur-md border text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] ${
              isLight
                ? "bg-white/80 border-orange-200 text-orange-700"
                : "bg-orange-500/10 border-orange-500/20 text-orange-300"
            }`}
          >
            <Sparkles size={12} />
            Final call
          </span>

          <blockquote
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 ${isLight ? "text-gray-900" : "text-white"}`}
          >
            <span className={isLight ? "text-gray-400" : "text-gray-600"}>
              &ldquo;
            </span>
            If you&apos;re a founder
            <br />
            building something{" "}
            <span
              className={`text-transparent bg-clip-text ${
                isLight
                  ? "bg-gradient-to-br from-orange-600 via-rose-600 to-amber-600"
                  : "bg-gradient-to-br from-orange-300 via-rose-300 to-amber-300"
              }`}
            >
              real
            </span>
            ,
            <br />
            let&apos;s talk.
            <span className={isLight ? "text-gray-400" : "text-gray-600"}>
              &rdquo;
            </span>
          </blockquote>

          <p
            className={`text-base sm:text-lg max-w-xl mx-auto mb-10 ${isLight ? "text-gray-600" : "text-gray-400"}`}
          >
            30 minutes. No deck needed. Just bring the problem.
          </p>
        </motion.div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`relative overflow-hidden border backdrop-blur-md ${
            isLight
              ? "bg-white border-gray-200 shadow-2xl shadow-orange-200/30"
              : "bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-white/10"
          }`}
        >
          <div
            className={`pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-50 ${isLight ? "bg-orange-100" : "bg-orange-500/10"}`}
          />
          <div
            className={`pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-40 ${isLight ? "bg-rose-100" : "bg-rose-500/10"}`}
          />

          <div className="relative z-10 p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
            <div className="md:col-span-3 space-y-4">
              <h3
                className={`text-xl sm:text-2xl font-bold ${isLight ? "text-gray-900" : "text-white"}`}
              >
                Let&apos;s build something real
              </h3>
              <p
                className={`text-sm sm:text-base ${isLight ? "text-gray-600" : "text-gray-400"}`}
              >
                Tell me what you&apos;re building, where you&apos;re stuck, and
                what shipping looks like. I&apos;ll tell you exactly how
                I&apos;d approach it — whether or not we end up working
                together.
              </p>
              <ul
                className={`space-y-2 text-sm ${isLight ? "text-gray-700" : "text-gray-300"}`}
              >
                {[
                  "No sales pitch, no roadmap theatre",
                  "Concrete next steps you can run with",
                  "Honest take on scope, time, and trade-offs",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span
                      className={`mt-1.5 inline-block w-1.5 h-1.5 ${isLight ? "bg-orange-500" : "bg-orange-400"}`}
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 flex flex-col gap-3">
              {/* Primary CTA */}
              <a
                href="mailto:abdlhsaud@gmail.com"
                className={`group inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xl text-sm sm:text-base ${
                  isLight
                    ? "bg-gradient-to-br from-orange-600 to-rose-600 text-white hover:shadow-orange-500/30 shadow-orange-500/20"
                    : "bg-gradient-to-br from-orange-500 to-rose-500 text-white hover:shadow-orange-500/40 shadow-orange-500/20"
                }`}
              >
                <Mail size={18} />
                Send me an email
                <ArrowRight
                  size={14}
                  className="opacity-80 group-hover:translate-x-0.5 transition-transform"
                />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/imabd"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 font-medium transition-all border text-sm ${
                  isLight
                    ? "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    : "bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.06] hover:border-white/20"
                }`}
              >
                <FaLinkedin size={15} />
                Connect on LinkedIn
              </a>

              {/* Blog */}
              <Link
                href="/blog"
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 font-medium transition-all border text-sm ${
                  isLight
                    ? "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    : "bg-white/[0.03] border-white/10 text-white hover:bg-white/[0.06] hover:border-white/20"
                }`}
              >
                <BookOpen size={15} />
                Read the blog
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Toggle hint — switch to engineers view */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <button
            type="button"
            onClick={() => setAudience("engineer")}
            className={`inline-flex items-center gap-2 text-xs sm:text-sm font-mono transition-colors ${
              isLight
                ? "text-gray-500 hover:text-gray-900"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <span className="opacity-70">$</span>
            <span>Want the technical breakdown? Switch to</span>
            <span className="underline underline-offset-4 decoration-dotted">
              For Engineers
            </span>
            <ArrowRight size={12} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderContact;
