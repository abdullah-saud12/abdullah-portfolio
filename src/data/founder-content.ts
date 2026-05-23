/**
 * Founder-mode content source of truth for Abdullah's portfolio.
 * All copy, metrics, and ordering for the founder view live here.
 */

export const accentMap = {
  orange: {
    border: "border-orange-500/20",
    borderLight: "border-orange-200",
    bg: "bg-orange-500/10",
    bgLight: "bg-orange-50",
    text: "text-orange-300",
    textLight: "text-orange-700",
    gradient: "from-orange-500/15 via-transparent to-transparent",
    glow: "shadow-orange-500/10",
    ring: "ring-orange-500/30",
  },
  blue: {
    border: "border-blue-500/20",
    borderLight: "border-blue-200",
    bg: "bg-blue-500/10",
    bgLight: "bg-blue-50",
    text: "text-blue-300",
    textLight: "text-blue-700",
    gradient: "from-blue-500/15 via-transparent to-transparent",
    glow: "shadow-blue-500/10",
    ring: "ring-blue-500/30",
  },
  emerald: {
    border: "border-emerald-500/20",
    borderLight: "border-emerald-200",
    bg: "bg-emerald-500/10",
    bgLight: "bg-emerald-50",
    text: "text-emerald-300",
    textLight: "text-emerald-700",
    gradient: "from-emerald-500/15 via-transparent to-transparent",
    glow: "shadow-emerald-500/10",
    ring: "ring-emerald-500/30",
  },
  purple: {
    border: "border-purple-500/20",
    borderLight: "border-purple-200",
    bg: "bg-purple-500/10",
    bgLight: "bg-purple-50",
    text: "text-purple-300",
    textLight: "text-purple-700",
    gradient: "from-purple-500/15 via-transparent to-transparent",
    glow: "shadow-purple-500/10",
    ring: "ring-purple-500/30",
  },
  amber: {
    border: "border-amber-500/20",
    borderLight: "border-amber-200",
    bg: "bg-amber-500/10",
    bgLight: "bg-amber-50",
    text: "text-amber-300",
    textLight: "text-amber-700",
    gradient: "from-amber-500/15 via-transparent to-transparent",
    glow: "shadow-amber-500/10",
    ring: "ring-amber-500/30",
  },
  rose: {
    border: "border-rose-500/20",
    borderLight: "border-rose-200",
    bg: "bg-rose-500/10",
    bgLight: "bg-rose-50",
    text: "text-rose-300",
    textLight: "text-rose-700",
    gradient: "from-rose-500/15 via-transparent to-transparent",
    glow: "shadow-rose-500/10",
    ring: "ring-rose-500/30",
  },
} as const;

export type AccentKey = keyof typeof accentMap;

// ---------------------------------------------------------------------------
// Outcome tiles — "Numbers, not narratives"
// ---------------------------------------------------------------------------

export interface OutcomeTile {
  id: string;
  metric: string;
  caption: string;
  detail: string;
  accent: AccentKey;
  tag?: string;
  colSpan?: 1 | 2 | 3;
}

export const outcomeTiles: OutcomeTile[] = [
  {
    id: "years",
    metric: "6+",
    caption: "Years shipping backend",
    detail:
      "From zero-to-one SaaS to scaling production systems. Every layer — API, infra, DB, observability.",
    accent: "orange",
    colSpan: 2,
    tag: "Experience",
  },
  {
    id: "founding",
    metric: "2×",
    caption: "Founding engineer",
    detail:
      "Joined pre-product, owned the entire engineering function from day one.",
    accent: "blue",
  },
  {
    id: "ai",
    metric: "3+",
    caption: "AI/LLM systems in prod",
    detail:
      "RAG pipelines, agent frameworks, tool-calling systems — all running and generating revenue.",
    accent: "purple",
  },
  {
    id: "uptime",
    metric: "99.9%",
    caption: "Uptime on critical systems",
    detail:
      "Designed for failure from the start. Circuit breakers, graceful degradation, zero-downtime deploys.",
    accent: "emerald",
  },
  {
    id: "services",
    metric: "10+",
    caption: "Production microservices",
    detail:
      "Designed, built, and shipped end-to-end — auth, payments, search, notifications, queues.",
    accent: "amber",
  },
  {
    id: "zero",
    metric: "$0→",
    caption: "Zero to revenue",
    detail:
      "Taken two products from empty repo to paying customers. No playbook — just shipping.",
    accent: "rose",
  },
];

// ---------------------------------------------------------------------------
// Philosophy cards — "How I Build"
// ---------------------------------------------------------------------------

export interface PhilosophyCard {
  id: string;
  icon: string;
  accent: AccentKey;
  headline: string;
  body: string;
  featured?: boolean;
}

export const philosophy: PhilosophyCard[] = [
  {
    id: "backend-first",
    icon: "Server",
    accent: "orange",
    headline: "Backend-first, always.",
    body: "I start with the data model, the API contract, and the failure modes — before writing a single line of frontend. Postgres, Redis, queues, observability wired in from day one.",
    featured: true,
  },
  {
    id: "ship-fast",
    icon: "Zap",
    accent: "blue",
    headline: "Ship fast. Fix in prod.",
    body: "Velocity over perfection. Get something live, measure what breaks, iterate. A week of over-engineering is worth less than an hour of user feedback.",
  },
  {
    id: "own-stack",
    icon: "Layers",
    accent: "emerald",
    headline: "Own the whole stack.",
    body: "No handoff gaps. I design the API, provision the infra, write the migrations, and set up the alerts. You get one engineer who covers the full depth.",
  },
  {
    id: "ai-native",
    icon: "Sparkles",
    accent: "purple",
    headline: "AI as a tool, not a gimmick.",
    body: "I wire LLMs in where they add real leverage — not to tick a checkbox. RAG, agents, tool-calling — all built with production constraints in mind.",
  },
];

// ---------------------------------------------------------------------------
// Services — "Roles I take"
// ---------------------------------------------------------------------------

export interface Service {
  id: string;
  icon: string;
  accent: AccentKey;
  title: string;
  body: string;
  featured?: boolean;
}

export const services: Service[] = [
  {
    id: "cto",
    icon: "Crown",
    accent: "orange",
    title: "Fractional CTO",
    body: "Own the engineering org: hiring bar, architecture decisions, roadmap sequencing, vendor calls. You focus on the business; I make sure the tech doesn't become the bottleneck.",
    featured: true,
  },
  {
    id: "backend",
    icon: "Server",
    accent: "blue",
    title: "Backend Architecture",
    body: "Design and build the API layer, data models, and service boundaries that scale without rewrites.",
  },
  {
    id: "ai",
    icon: "Sparkles",
    accent: "purple",
    title: "AI Integration",
    body: "Production-grade LLM pipelines — RAG, agents, tool-calling, evals. No toy demos.",
  },
  {
    id: "scale",
    icon: "TrendingUp",
    accent: "emerald",
    title: "System Scaling",
    body: "Diagnose bottlenecks, add the right caching layer, tune queries, rethink the hot path. Before you burn money on more infra.",
  },
  {
    id: "team",
    icon: "Users",
    accent: "amber",
    title: "Engineering Team Setup",
    body: "Establish the practices, review culture, and on-call runbooks that let a small team move fast without breaking things.",
  },
];
