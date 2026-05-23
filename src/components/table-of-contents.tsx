"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronDown, ChevronUp, List } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

interface Props {
  headings: Heading[];
  contentStartId?: string;
  contentEndId?: string;
}

export default function TableOfContents({ headings, contentStartId, contentEndId }: Props) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeId, setActiveId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const startRef = useRef<HTMLElement | null>(null);
  const endRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const tocNavRef = useRef<HTMLElement | null>(null);

  // Sidebar visibility (slides in once user scrolls past the article start)
  const updateVisibility = useCallback(() => {
    const start = startRef.current;
    if (!start) return;
    const passed = start.getBoundingClientRect().top < 100;
    if (endRef.current) {
      const ended = endRef.current.getBoundingClientRect().top < window.innerHeight * 0.7;
      setSidebarVisible(passed && !ended);
    } else {
      setSidebarVisible(passed);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      updateVisibility();
      rafRef.current = null;
    });
  }, [updateVisibility]);

  useEffect(() => {
    const startId = contentStartId ?? headings[0]?.id;
    if (!startId) return;
    startRef.current = document.getElementById(startId);
    endRef.current = contentEndId ? document.getElementById(contentEndId) : null;
    if (!startRef.current) return;
    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [headings, contentStartId, contentEndId, handleScroll, updateVisibility]);

  // Active heading via IntersectionObserver
  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  // Auto-scroll TOC to keep active item visible
  useEffect(() => {
    if (!activeId || !tocNavRef.current) return;
    const active = tocNavRef.current.querySelector<HTMLElement>(`a[href="#${activeId}"]`);
    if (!active) return;
    const navRect = tocNavRef.current.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    if (activeRect.top < navRect.top + 60 || activeRect.bottom > navRect.bottom - 20) {
      active.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
    setMobileOpen(false);
  };

  if (!headings.length) return null;

  // Numbered headings: h2 → 1. 2. 3. / h3 → i ii iii
  const romans = ["i","ii","iii","iv","v","vi","vii","viii","ix","x"];
  let h2 = 0, h3 = 0;
  const numbered = headings.map((h) => {
    let num: string;
    if (h.level === 2) { h2++; h3 = 0; num = `${h2}.`; }
    else { h3++; num = romans[h3 - 1] ?? `${h3}`; }
    return { ...h, num };
  });

  return (
    <>
      {/* Mobile / tablet: collapsible toggle above article */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className={`w-full flex items-center justify-between p-4 border text-left transition-colors ${
            isLight ? "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100" : "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10"
          }`}
        >
          <span className="flex items-center gap-2 font-medium text-sm">
            <List size={16} className={isLight ? "text-blue-600" : "text-blue-400"} />
            Table of Contents
          </span>
          {mobileOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {mobileOpen && (
          <nav className={`mt-1 p-4 border border-t-0 ${isLight ? "bg-white border-gray-200" : "bg-[#0D1117] border-white/10"}`}>
            <ul className="space-y-3">
              {numbered.map((h) => (
                <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 16}px` }}>
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => handleClick(e, h.id)}
                    className={`flex items-baseline gap-3 text-sm transition-colors ${
                      activeId === h.id
                        ? isLight ? "text-gray-900 font-medium" : "text-white font-medium"
                        : isLight ? "text-gray-500 hover:text-gray-800" : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <span className={`font-mono text-xs w-6 text-right shrink-0 ${h.level === 3 ? "italic" : ""} ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                      {h.num}
                    </span>
                    <span>{h.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky right sidebar */}
      <nav
        ref={tocNavRef}
        className={`hidden lg:block fixed right-8 xl:right-12 2xl:right-16 top-24 w-64 xl:w-72 max-h-[calc(100vh-8rem)] overflow-y-auto transition-all duration-300 z-40 ${
          sidebarVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 mb-5">
          <List size={15} className={isLight ? "text-gray-400" : "text-gray-500"} />
          <span className={`text-xs font-mono uppercase tracking-widest ${isLight ? "text-gray-400" : "text-gray-500"}`}>
            On this page
          </span>
        </div>

        <ul className="space-y-3.5">
          {numbered.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li key={h.id} className="group" style={{ marginLeft: `${(h.level - 2) * 12}px` }}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleClick(e, h.id)}
                  className={`flex items-baseline gap-3 text-sm transition-all duration-200 group-hover:translate-x-0.5 ${
                    isActive
                      ? isLight ? "text-gray-900 font-medium" : "text-white font-medium"
                      : isLight ? "text-gray-400 hover:text-gray-700" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <span className={`font-mono text-xs w-5 text-right shrink-0 transition-colors ${
                    h.level === 3 ? "italic" : ""
                  } ${
                    isActive
                      ? isLight ? "text-gray-700 font-bold" : "text-white font-bold"
                      : isLight ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {h.num}
                  </span>
                  <span className={`leading-snug ${isActive ? "font-medium" : ""}`}>{h.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
