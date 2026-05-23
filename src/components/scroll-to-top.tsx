"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

export default function ScrollToTop() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 300;
      setVisible(nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex justify-center py-6"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border transition-all hover:scale-[1.03] active:scale-[0.97] ${
              isLight
                ? "bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300"
                : "bg-[#18181b] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            <ArrowUp size={14} />
            Back to top
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
