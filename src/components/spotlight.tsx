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

  return (
    <div className={`spotlight ${active ? "spotlight-active" : ""} ${isLight ? "spotlight-light" : ""}`}>
      <div
        className="spotlight-inner"
        style={{ left: pos.x, top: pos.y, willChange: "transform, opacity" }}
      />
    </div>
  );
}
