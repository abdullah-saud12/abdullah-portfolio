import type { Project } from "./types";

// Stub data borrowed from reference portfolio — replace with real projects over time.
export const projects: Project[] = [
  {
    id: 1,
    slug: "memcontext",
    title: "MemContext",
    description:
      "Persistent, evolving memory layer for AI coding agents with MCP-native integrations, hybrid retrieval, and cross-session recall.",
    detailedDescription:
      "MemContext solves one of the biggest gaps in AI-assisted development: agents lose user preferences, project context, and prior decisions between sessions. Built as a persistent memory layer that plugs into MCP-compatible tools so assistants can save, retrieve, and evolve context instead of starting from zero every time.\n\nThe system combines a Hono API, MCP server, Next.js dashboard, and marketing site inside a Turborepo monorepo. Under the hood it uses hybrid retrieval with vector embeddings and PostgreSQL full-text search, relation-aware memory updates, temporal expiry, feedback-aware ranking, and project-scoped organization.",
    challenges: [
      "Combining vector embeddings, PostgreSQL full-text search, and query-variant retrieval into a memory layer that surfaces relevant context instead of noisy matches.",
      "Designing evolving memory flows so entries can be saved, updated, extended, expired, and ranked by feedback without creating duplicate context.",
      "Building MCP-native integrations that work reliably across multiple coding agents, transports, and setup styles.",
    ],
    tags: ["TypeScript", "Hono", "Next.js", "PostgreSQL", "MCP", "Redis", "OpenRouter"],
    year: "2026",
    duration: "2 Months",
    category: "AI",
    featured: true,
    imageUrl: "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPuFUBv7VILjGC7RxNs1WqaPXeldA0nz3E968k",
    demoLink: "https://memcontext.in",
    githubLink: "https://github.com/CyberBoyAyush/memcontext",
  },
  {
    id: 2,
    slug: "zenox",
    title: "Zenox",
    description:
      "Agent orchestration plugin for OpenCode with specialized subagents, background tasks, and fast multi-agent workflows.",
    detailedDescription:
      "Zenox extends OpenCode with a team-of-agents model instead of a single monolithic assistant. Designed four specialized agents: Explorer for codebase search, Librarian for external docs, Oracle for architecture reviews, and UI Planner for frontend work. The plugin adds background task execution, keyword-triggered deep research modes, and bundled MCP support.",
    challenges: [
      "Designing delegation rules that route work to the right agent without making the system feel unpredictable.",
      "Implementing background execution and result retrieval so independent research can run in parallel.",
      "Integrating multiple MCP tools into one plugin while keeping prompts and output quality consistent.",
    ],
    tags: ["TypeScript", "OpenCode", "AI Agents", "MCP", "Bun"],
    year: "2026",
    duration: "5 Days",
    category: "AI",
    featured: true,
    imageUrl: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1768073623/ZENOX_e4boob.png",
    demoLink: "https://www.npmjs.com/package/zenox",
    githubLink: "https://github.com/CyberBoyAyush/zenox",
  },
  {
    id: 3,
    slug: "plnr",
    title: "Plnr",
    description:
      "AI planning and security CLI for codebases that turns architecture context into concrete implementation plans.",
    detailedDescription:
      "Plnr is a CLI built for the phase before implementation starts: understanding the codebase, mapping the architecture, and turning ambiguity into an actionable plan. It inspects frameworks, dependencies, code patterns, and security risks, then combines that context with LLMs to produce implementation guidance grounded in the actual repo.",
    challenges: [
      "Fitting rich codebase context into model windows without losing the signals that matter for planning.",
      "Building prompt flows that switch between chat, planning, and security review while staying context-aware.",
      "Integrating live docs and web search through MCP so generated plans are based on current library behavior.",
    ],
    tags: ["TypeScript", "OpenRouter", "Node.js", "MCP", "Exa AI"],
    year: "2025",
    duration: "7 Days",
    category: "AI",
    featured: true,
    imageUrl: "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPipbvM9fLSeCsIaE1NktK9ur3Tyv6x4QMqg8z",
    demoLink: "https://www.npmjs.com/package/plnr",
    githubLink: "https://github.com/CyberBoyAyush/plnr",
    videoUrl: "https://www.youtube.com/embed/8VMi3AoLEz4?si=b5JoXW31UPcFPfLj",
  },
  {
    id: 4,
    slug: "cappychat",
    title: "CappyChat",
    description:
      "Production AI chat workspace with multi-model routing, realtime sync, tool calling, and a local-first UX.",
    detailedDescription:
      "CappyChat supports 30+ models, realtime sync, a local-first architecture, voice input, file uploads, image generation, and collaborative workflows. Optimized around responsiveness so users can switch models, recover prior context, and keep working without the interface feeling slow or fragile.",
    challenges: [
      "Building a local-first chat experience that stays responsive while still syncing reliably across devices.",
      "Supporting many model providers and capabilities without turning the interface into configuration overload.",
      "Hardening the product for production with logging, rate limiting, and performance work across a rapidly evolving feature set.",
    ],
    tags: ["Next.js", "TypeScript", "Appwrite", "OpenRouter", "Zustand", "Redis"],
    year: "2025",
    duration: "15 Days",
    category: "AI",
    featured: true,
    imageUrl: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1759138327/AV_1_zztl3w.png",
    demoLink: "https://cappychat.com",
    githubLink: "https://github.com/cyberboyayush/CappyChat",
    videoUrl: "https://www.youtube.com/embed/vP5HSx9GxjI?si=SwFiZUV4No-Ji8pV",
  },
  {
    id: 5,
    slug: "bucket-buddy",
    title: "Bucket Buddy",
    description:
      "Secure S3-style storage manager for AWS, Cloudflare R2, and other compatible providers with a polished developer UX.",
    detailedDescription:
      "Bucket Buddy turns object storage management into a cleaner, safer workflow for developers and small teams. Provides a focused interface for bucket setup, file previews, uploads, search, and multi-provider management across AWS S3, Cloudflare R2, and other S3-compatible services.",
    challenges: [
      "Handling cloud credentials securely while still making multi-provider setup approachable.",
      "Designing file operations and previews for large object stores without making the UI feel bloated.",
      "Normalizing provider-specific behavior across AWS S3 and S3-compatible services.",
    ],
    tags: ["Next.js", "Prisma", "PostgreSQL", "AWS SDK", "TailwindCSS"],
    year: "2025",
    duration: "7 Days",
    category: "Web",
    featured: true,
    imageUrl: "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPI5rAcrjSq8BcalUnAK51orufTp2SNkO7GxHz",
    demoLink: "https://bucketbuddy.aysh.me/",
    githubLink: "https://github.com/cyberboyayush/bucketbuddy",
  },
  {
    id: 6,
    slug: "tuduai",
    title: "TuduAI",
    description:
      "Natural-language task manager with collaborative workspaces, smart organization, and AI-assisted task creation.",
    detailedDescription:
      "TuduAI lets users write tasks the way they think. AI parses natural language, extracts dates and intent, and creates organized tasks automatically. Layers in workspace collaboration so teams can plan together instead of treating task management as a solo workflow.",
    challenges: [
      "Making natural-language task creation reliable enough to be useful in real planning, not just demos.",
      "Designing collaboration flows without slowing down the core single-user experience.",
      "Handling fuzzy date and intent parsing from natural language without creating confusing output.",
    ],
    tags: ["React", "JavaScript", "TailwindCSS", "Appwrite", "OpenAI API"],
    year: "2025",
    duration: "15 Days",
    category: "AI",
    featured: false,
    imageUrl: "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPFe7ghJ5FxlZUcq1BwOub9PyMKG7d26vQfaTC",
    demoLink: "https://tuduai.aysh.me/",
    githubLink: "https://github.com/cyberboyayush/tuduai",
  },
  {
    id: 7,
    slug: "effisense",
    title: "Effisense",
    description:
      "AI productivity dashboard for scheduling, focus planning, analytics, and Google Calendar-aware workload management.",
    detailedDescription:
      "Effisense answers a harder question than simple task lists: how should your actual time be allocated? Combines task planning, focus-time suggestions, productivity analytics, and Google Calendar integration so users understand both what they need to do and when to realistically do it.",
    challenges: [
      "Using AI to generate time and focus recommendations that feel practical instead of arbitrary.",
      "Integrating Google Calendar cleanly while keeping the task workflow central.",
      "Turning productivity data into visualizations that help users act, not just observe.",
    ],
    tags: ["React", "Google Calendar API", "GROQ", "Appwrite", "TailwindCSS", "Recharts"],
    year: "2025",
    duration: "3 Months",
    category: "AI",
    featured: false,
    imageUrl: "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPfgNH3bZTmUXblVz2o8y4iIF6cHMBLqAhke5Y",
    demoLink: "https://effisense.ayush-sharma.in/",
    githubLink: "https://github.com/cyberboyayush/effisense",
  },
  {
    id: 8,
    slug: "skillcompass",
    title: "SkillCompass",
    description:
      "Adaptive learning platform that generates AI-powered curricula, flashcards, quizzes, and progress tracking.",
    detailedDescription:
      "Built in 72 hours for a hackathon. Users define a goal and the system generates a personalized learning path with interactive content, quizzes, flashcards, and progress tracking. Combined Gemini, Groq, and Appwrite to create a compact but ambitious learning product under tight time constraints.",
    challenges: [
      "Building a multi-surface learning experience in only 72 hours without collapsing into unfinished features.",
      "Coordinating multiple AI providers so curriculum generation stayed reliable under hackathon conditions.",
      "Shipping a polished UX while integrating auth, storage, and AI generation simultaneously.",
    ],
    tags: ["React", "Gemini", "Appwrite", "TailwindCSS", "Groq", "Llama 3.3"],
    year: "2025",
    duration: "72 Hours",
    category: "AI",
    featured: false,
    imageUrl: "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPUFlBGN1k8DdHYcXLswQzrg6SM7qbVytx3Npf",
    demoLink: "https://skillcompass.ayush-sharma.in/",
    githubLink: "https://github.com/glucon-d/skillcompass",
    videoUrl: "https://www.youtube.com/embed/-7sjCjZc0SI?si=4UnRtmOgKWqKjA1t",
    isHackathonProject: true,
  },
  {
    id: 9,
    slug: "quickbang",
    title: "QuickBang",
    description: "Browser search shortcut utility that brings bang-style redirects to any search bar.",
    detailedDescription:
      "A lightweight browser utility inspired by DuckDuckGo bangs. Lets users type shortcuts like !g, !gh, or !yt directly into a search field and jump to the right destination instantly. Intentionally small and fast — most work happens on the client, configuration stays simple, and the product focuses on one job only.",
    challenges: [
      "Building shortcut parsing that feels instant and predictable across different query patterns.",
      "Keeping the extension simple enough to stay fast while still supporting customization.",
      "Handling browser-specific behavior around search engines and search bar integrations.",
    ],
    tags: ["React", "TypeScript", "Browser APIs"],
    year: "2025",
    duration: "5 Days",
    category: "Web",
    featured: false,
    imageUrl: "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAP4yZsxBVEKBr0gueU6fJkSAaYjWMON8X2HPdV",
    demoLink: "https://quickbang.aysh.me/",
    githubLink: "https://github.com/cyberboyayush/quickbang",
  },
  {
    id: 10,
    slug: "portdev",
    title: "PortDev",
    description: "Portfolio generator for developers with dynamic skill visuals, templates, and real-time content management.",
    detailedDescription:
      "PortDev is a portfolio builder made specifically for developers who want something more tailored than generic website builders. Focuses on technical profiles, project showcases, skill sections, and live content management, with a UI designed to help users publish quickly without assembling everything from scratch.",
    challenges: [
      "Designing templates that feel useful for different developer profiles without becoming too restrictive.",
      "Building dynamic skill and icon presentation so portfolios feel polished with minimal manual input.",
      "Balancing visual polish with a fast path to publication.",
    ],
    tags: ["React", "Firebase", "TailwindCSS", "Framer Motion"],
    year: "2025",
    duration: "1.5 Months",
    category: "Web",
    featured: false,
    imageUrl: "https://1kf0b6y5pd.ufs.sh/f/whL3sWlbNOAPiVdP9VfLSeCsIaE1NktK9ur3Tyv6x4QMqg8z",
    demoLink: "https://portdevv.vercel.app/",
    githubLink: "https://github.com/cyberboyayush/portdev",
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
