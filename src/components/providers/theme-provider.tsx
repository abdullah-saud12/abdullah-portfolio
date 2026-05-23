"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";
type Font = "geist" | "jetbrains";

interface ThemeContextType {
  theme: Theme;
  font: Font;
  toggleTheme: () => void;
  toggleFont: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_KEY = "theme";
const FONT_KEY = "portfolio-font";

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [font, setFont] = useState<Font>("geist");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem(THEME_KEY) as Theme) ?? "dark";
    const savedFont = (localStorage.getItem(FONT_KEY) as Font) ?? "geist";
    setTheme(savedTheme);
    setFont(savedFont);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    applyFont(savedFont);
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  const toggleFont = useCallback(() => {
    setFont((prev) => {
      const next = prev === "geist" ? "jetbrains" : "geist";
      localStorage.setItem(FONT_KEY, next);
      applyFont(next);
      return next;
    });
  }, []);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, font, toggleTheme, toggleFont }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyFont(font: Font) {
  if (font === "jetbrains") {
    document.body.style.fontFamily = "var(--font-jetbrains-mono), monospace";
  } else {
    document.body.style.fontFamily = "";
  }
}
