"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Audience = "founder" | "engineer";

interface AudienceContextType {
  audience: Audience;
  setAudience: (audience: Audience) => void;
  toggleAudience: () => void;
}

const AudienceContext = createContext<AudienceContextType | null>(null);

const STORAGE_KEY = "portfolio-audience";

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error("useAudience must be used within AudienceProvider");
  return ctx;
}

export function useAudienceSafe() {
  return useContext(AudienceContext);
}

function getInitialAudience(): Audience {
  if (typeof window === "undefined") return "founder";
  try {
    const params = new URLSearchParams(window.location.search);
    const val = params.get("for")?.toLowerCase();
    if (val === "engineers" || val === "engineer" || val === "dev") return "engineer";
    if (val === "founders" || val === "founder") return "founder";
  } catch {}
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "founder" || stored === "engineer") return stored;
  } catch {}
  return "founder";
}

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>("founder");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setAudienceState(getInitialAudience());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, audience);
    } catch {}

    if (window.location.pathname !== "/") return;
    const params = new URLSearchParams(window.location.search);
    if (audience === "engineer") {
      params.set("for", "engineers");
    } else {
      params.delete("for");
    }
    const qs = params.toString();
    window.history.replaceState(null, "", "/" + (qs ? `?${qs}` : ""));
  }, [audience, mounted]);

  const setAudience = useCallback((next: Audience) => setAudienceState(next), []);
  const toggleAudience = useCallback(() => {
    setAudienceState((prev) => (prev === "founder" ? "engineer" : "founder"));
  }, []);

  return (
    <AudienceContext.Provider value={{ audience, setAudience, toggleAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}
