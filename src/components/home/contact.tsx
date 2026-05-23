"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { useTheme } from "@/components/providers/theme-provider";
import SectionHeading from "./section-heading";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputCls = `w-full px-4 py-2.5 border text-sm focus:outline-none transition-colors duration-200 ${isLight
    ? "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400"
    : "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-white/30"
  }`;

  return (
    <section id="contact" ref={ref} className="py-28 relative overflow-hidden">
      <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? "bg-[#fafafa]" : "bg-[#0D1117]"}`} />
      <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${isLight
        ? "[background-image:linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px)]"
        : "[background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)]"
      }`} />

      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading
          subtitle="Get In Touch"
          title="Contact"
          description="Have a project in mind or want to talk? I'd love to hear from you."
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {/* Form */}
          <div className="md:col-span-2">
            <div className={`border shadow-xl overflow-hidden ${isLight ? "bg-white border-gray-200" : "bg-[#161b22] border-white/10"}`}>
              <div className={`px-6 py-4 border-b ${isLight ? "bg-gray-50 border-gray-200" : "bg-white/5 border-white/10"}`}>
                <h3 className={`font-semibold flex items-center gap-2 ${isLight ? "text-gray-900" : "text-white"}`}>
                  <Send size={16} />
                  Send a message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isLight ? "text-gray-700" : "text-gray-300"}`}>Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isLight ? "text-gray-700" : "text-gray-300"}`}>Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isLight ? "text-gray-700" : "text-gray-300"}`}>Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Your message..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`w-full py-3 font-medium text-sm flex items-center justify-center gap-2 transition-colors disabled:cursor-not-allowed ${isLight
                    ? "bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-400"
                    : "bg-white text-gray-900 hover:bg-gray-100 disabled:bg-gray-600 disabled:text-gray-400"
                  }`}
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current/30 border-t-current animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>

                {status === "success" && (
                  <p className={`text-sm text-center py-2 border ${isLight ? "text-green-700 bg-green-50 border-green-200" : "text-green-400 bg-green-500/10 border-green-500/20"}`}>
                    ✓ Message sent — I&apos;ll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className={`text-sm text-center py-2 border ${isLight ? "text-red-700 bg-red-50 border-red-200" : "text-red-400 bg-red-500/10 border-red-500/20"}`}>
                    ✗ Something went wrong. Try emailing me directly.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isLight ? "text-gray-900" : "text-white"}`}>Contact Info</h3>
            <p className={`text-sm leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
              Available for full-time roles, contract work, and interesting projects. Response time typically under 24 hours.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="mailto:abdlhsaud@gmail.com"
                className={`flex items-center gap-3 p-4 border transition-colors ${isLight ? "bg-white border-gray-200 hover:border-gray-300" : "bg-[#161b22] border-white/10 hover:border-white/20"}`}
              >
                <div className={`w-9 h-9 flex items-center justify-center border ${isLight ? "bg-gray-100 border-gray-200" : "bg-white/5 border-white/10"}`}>
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
                className={`flex items-center gap-3 p-4 border transition-colors ${isLight ? "bg-white border-gray-200 hover:border-gray-300" : "bg-[#161b22] border-white/10 hover:border-white/20"}`}
              >
                <div className={`w-9 h-9 flex items-center justify-center border ${isLight ? "bg-gray-100 border-gray-200" : "bg-white/5 border-white/10"}`}>
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
                className={`flex items-center gap-3 p-4 border transition-colors ${isLight ? "bg-white border-gray-200 hover:border-gray-300" : "bg-[#161b22] border-white/10 hover:border-white/20"}`}
              >
                <div className={`w-9 h-9 flex items-center justify-center border ${isLight ? "bg-gray-100 border-gray-200" : "bg-white/5 border-white/10"}`}>
                  <FaLinkedin size={16} className="text-[#0A66C2]" />
                </div>
                <div>
                  <div className={`text-[11px] ${isLight ? "text-gray-400" : "text-gray-500"}`}>LinkedIn</div>
                  <div className={`text-sm font-medium ${isLight ? "text-gray-900" : "text-white"}`}>Connect with me</div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
