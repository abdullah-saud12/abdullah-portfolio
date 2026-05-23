"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "@/components/providers/theme-provider";

export default function Spotlight() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    setActive(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActive(false), 2000);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isMobile, onMouseMove]);

  if (isMobile) return null;

  const gradient = isLight
    ? "radial-gradient(circle, rgba(99,102,241,0.05) 0%, rgba(99,102,241,0.02) 25%, transparent 60%)"
    : "radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(99,102,241,0.06) 20%, rgba(129,140,248,0.03) 40%, transparent 65%)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9998,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          left: pos.x,
          top: pos.y,
          background: gradient,
          transform: "translate(-50%, -50%)",
          opacity: active ? 1 : 0,
          transition: "opacity 0.6s ease-out",
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
