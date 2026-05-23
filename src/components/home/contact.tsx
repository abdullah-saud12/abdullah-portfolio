"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, Mail } from "lucide-react";
import confetti from "canvas-confetti";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { useTheme } from "@/components/providers/theme-provider";
import SectionHeading from "./section-heading";

type FormData = { name: string; email: string; message: string };
type Status = "idle" | "sending" | "success" | "error";

const STEPS: {
  key: keyof FormData;
  question: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
}[] = [
  { key: "name", question: "What's your name?", placeholder: "John Doe", type: "text" },
  { key: "email", question: "What's your email?", placeholder: "john@company.com", type: "email" },
  { key: "message", question: "What are you building?", placeholder: "Tell me about the project, the stack, where you're stuck…", type: "textarea" },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
};

const EMOJIS = ["🎉", "🎊", "✨", "🚀", "💫", "⭐", "🎈", "🌟"];

function SuccessState({ name, isLight, onReset }: { name: string; isLight: boolean; onReset: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  const particles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      x: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 2.5 + Math.random() * 1.5,
      size: 20 + Math.random() * 20,
    })), []
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) onReset(); },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onReset]);

  useEffect(() => {
    const fire = (opts: confetti.Options) =>
      confetti({ particleCount: 60, spread: 70, startVelocity: 35, ticks: 200, ...opts });

    fire({ origin: { x: 0.2, y: 0.7 }, angle: 60 });
    fire({ origin: { x: 0.8, y: 0.7 }, angle: 120 });
    setTimeout(() => fire({ origin: { x: 0.5, y: 0.6 }, angle: 90, particleCount: 80, spread: 90 }), 300);
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-28 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
      <div
        className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
          isLight
            ? "[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]"
            : "[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]"
        }`}
      />

      {/* Floating emoji particles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ y: "100vh", x: `${p.x}vw`, opacity: 1, scale: 0.5 }}
            animate={{ y: "-20vh", opacity: [1, 1, 0], scale: [0.5, 1.2, 1] }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
            style={{ fontSize: p.size, position: "absolute", bottom: 0 }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-2xl flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="flex flex-col items-center gap-5">
          {/* Bouncy checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
            className="relative"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center"
            >
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10 text-emerald-500"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0, 1, 0, 1, 0, 1] }}
                  transition={{
                    duration: 3.2,
                    delay: 0.3,
                    times: [0, 0.14, 0.28, 0.42, 0.57, 0.71, 0.85, 1],
                    ease: "easeInOut",
                  }}
                />
              </motion.svg>
            </motion.div>
            {/* Ring pulse */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-emerald-400"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className={`text-3xl sm:text-4xl font-bold ${isLight ? "text-gray-900" : "text-white"}`}
          >
            Your move landed.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.4 }}
            className={`text-base max-w-xs text-center ${isLight ? "text-gray-500" : "text-gray-400"}`}
          >
            I&apos;ll be in touch,{" "}
            <span className={`font-semibold ${isLight ? "text-gray-800" : "text-white"}`}>{name}</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.4 }}
            className={`text-xs font-mono ${isLight ? "text-gray-400" : "text-gray-600"}`}
          >
            PS: I reply fast.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [fieldError, setFieldError] = useState("");

  const reset = useCallback(() => {
    setStatus("idle");
    setForm({ name: "", email: "", message: "" });
    setStep(0);
    setDirection(1);
    setFieldError("");
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  useEffect(() => {
    setFieldError("");
    const timer = setTimeout(() => {
      if (current.type === "textarea") textareaRef.current?.focus({ preventScroll: true });
      else inputRef.current?.focus({ preventScroll: true });
    }, 350);
    return () => clearTimeout(timer);
  }, [step, current.type]);

  const validate = (): boolean => {
    const val = form[current.key].trim();
    if (!val) { setFieldError("This field is required."); return false; }
    if (current.key === "email") {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!ok) { setFieldError("Please enter a valid email address."); return false; }
    }
    setFieldError("");
    return true;
  };

  const canProceed = form[current.key].trim().length > 0;

  const next = () => {
    if (!validate()) return;
    if (isLast) { submit(); return; }
    setDirection(1);
    setStep((s) => s + 1);
  };

  const back = () => {
    if (step === 0) return;
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const submit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputBase = `w-full bg-transparent border-b-2 py-3 text-lg focus:outline-none transition-colors duration-200 placeholder:opacity-25 ${
    isLight
      ? "border-gray-200 text-gray-900 focus:border-accent caret-accent"
      : "border-white/10 text-white focus:border-accent caret-accent"
  }`;

  if (status === "success") {
    return <SuccessState name={form.name.split(" ")[0]} isLight={isLight} onReset={reset} />;
  }

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
      <div
        className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
          isLight
            ? "[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]"
            : "[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]"
        }`}
      />

      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading
          subtitle="Get In Touch"
          title="Contact"
          description="Have a project in mind or want to talk? I'd love to hear from you."
          className="mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Multi-step form — left */}
          <div className="md:col-span-2">
            {/* Progress bar */}
            <div className="flex items-center gap-1.5 mb-6">
              {STEPS.map((s, i) => (
                <div
                  key={s.key}
                  className={`h-[2px] flex-1 rounded-full transition-colors duration-500 ${
                    i <= step ? "bg-accent" : isLight ? "bg-gray-200" : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            {/* Step content */}
            <div className="relative" style={{ minHeight: 170 }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  {/* Counter */}
                  <p className={`text-xs font-mono tracking-widest mb-3 ${isLight ? "text-gray-400" : "text-gray-600"}`}>
                    {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                  </p>

                  {/* Question */}
                  <h3 className={`text-xl sm:text-2xl font-bold mb-5 leading-tight ${isLight ? "text-gray-900" : "text-white"}`}>
                    {current.question}
                  </h3>

                  {/* Input */}
                  {current.type === "textarea" ? (
                    <textarea
                      ref={textareaRef}
                      rows={3}
                      value={form[current.key]}
                      placeholder={current.placeholder}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, [current.key]: e.target.value }));
                        if (fieldError) setFieldError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); next(); }
                      }}
                      className={`${inputBase} resize-none`}
                    />
                  ) : (
                    <input
                      ref={inputRef}
                      type={current.type}
                      value={form[current.key]}
                      placeholder={current.placeholder}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, [current.key]: e.target.value }));
                        if (fieldError) setFieldError("");
                      }}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); next(); } }}
                      className={`${inputBase} ${fieldError ? (isLight ? "border-red-400" : "border-red-500") : ""}`}
                    />
                  )}

                  <AnimatePresence>
                    {fieldError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className={`mt-2 text-xs font-medium ${isLight ? "text-red-500" : "text-red-400"}`}
                      >
                        {fieldError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className={`flex items-center justify-between pt-6 border-t ${isLight ? "border-gray-100" : "border-white/5"}`}>
              <button
                type="button"
                onClick={back}
                className={`text-sm font-medium transition-all duration-200 ${
                  step === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
                } ${isLight ? "text-gray-400 hover:text-gray-800" : "text-gray-600 hover:text-white"}`}
              >
                ← Back
              </button>

              <div className="flex items-center gap-4">
                <span className={`text-xs font-mono hidden sm:block ${isLight ? "text-gray-300" : "text-gray-700"}`}>
                  {isLast ? "shift+enter for new line" : "press enter ↵"}
                </span>
                <button
                  type="button"
                  onClick={next}
                  disabled={!canProceed || status === "sending"}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    isLight ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                  }`}
                >
                  {status === "sending" ? (
                    <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                  ) : isLast ? (
                    <><Send size={14} /> Send</>
                  ) : (
                    <>Next <ArrowRight size={14} /></>
                  )}
                </button>
              </div>
            </div>

            {/* Previous answers recap */}
            <AnimatePresence>
              {step > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className={`mt-8 p-4 space-y-2 border ${
                    isLight ? "bg-gray-50 border-gray-100" : "bg-white/[0.02] border-white/5"
                  }`}
                >
                  {STEPS.slice(0, step).map((s) => (
                    <div key={s.key} className="flex items-baseline gap-3 text-sm">
                      <span className={`font-mono text-[11px] shrink-0 ${isLight ? "text-gray-400" : "text-gray-600"}`}>
                        {s.key}
                      </span>
                      <span className={`truncate ${isLight ? "text-gray-700" : "text-gray-300"}`}>
                        {form[s.key]}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {status === "error" && (
              <p className={`mt-4 text-sm text-center py-2 border ${
                isLight ? "text-red-700 bg-red-50 border-red-200" : "text-red-400 bg-red-500/10 border-red-500/20"
              }`}>
                Something went wrong. Try emailing me directly at{" "}
                <a href="mailto:abdlhsaud@gmail.com" className="underline">abdlhsaud@gmail.com</a>
              </p>
            )}
          </div>

          {/* Sidebar — right */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isLight ? "text-gray-900" : "text-white"}`}>Contact Info</h3>
            <p className={`text-sm leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
              Available for full-time roles, contract work, and interesting projects. Response time typically under 24 hours.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="mailto:abdlhsaud@gmail.com"
                className={`flex items-center gap-3 p-4 border transition-colors ${
                  isLight ? "bg-white border-gray-200 hover:border-gray-300" : "bg-[#161b22] border-white/10 hover:border-white/20"
                }`}
              >
                <div className={`w-9 h-9 flex items-center justify-center border ${
                  isLight ? "bg-gray-100 border-gray-200" : "bg-white/5 border-white/10"
                }`}>
                  <Mail size={16} className={isLight ? "text-blue-500" : "text-blue-400"} />
                </div>
                <div>
                  <div className={`text-[11px] ${isLight ? "text-gray-400" : "text-gray-500"}`}>Email</div>
                  <div className={`text-sm font-medium ${isLight ? "text-gray-900" : "text-white"}`}>abdlhsaud@gmail.com</div>
                </div>
              </a>

              <a
                href="https://github.com/abdullah-saud12"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-4 border transition-colors ${
                  isLight ? "bg-white border-gray-200 hover:border-gray-300" : "bg-[#161b22] border-white/10 hover:border-white/20"
                }`}
              >
                <div className={`w-9 h-9 flex items-center justify-center border ${
                  isLight ? "bg-gray-100 border-gray-200" : "bg-white/5 border-white/10"
                }`}>
                  <SiGithub size={16} className={isLight ? "text-gray-700" : "text-gray-300"} />
                </div>
                <div>
                  <div className={`text-[11px] ${isLight ? "text-gray-400" : "text-gray-500"}`}>GitHub</div>
                  <div className={`text-sm font-medium ${isLight ? "text-gray-900" : "text-white"}`}>abdullah-saud12</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/imabd"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-4 border transition-colors ${
                  isLight ? "bg-white border-gray-200 hover:border-gray-300" : "bg-[#161b22] border-white/10 hover:border-white/20"
                }`}
              >
                <div className={`w-9 h-9 flex items-center justify-center border ${
                  isLight ? "bg-gray-100 border-gray-200" : "bg-white/5 border-white/10"
                }`}>
                  <FaLinkedin size={16} className="text-[#0A66C2]" />
                </div>
                <div>
                  <div className={`text-[11px] ${isLight ? "text-gray-400" : "text-gray-500"}`}>LinkedIn</div>
                  <div className={`text-sm font-medium ${isLight ? "text-gray-900" : "text-white"}`}>Connect with me</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
