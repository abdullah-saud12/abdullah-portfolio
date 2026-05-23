import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    id: 1,
    company: "XBE",
    role: "Senior Software Engineer",
    startDate: "Aug 2025",
    endDate: "May 2026",
    location: "Remote, Chicago",
    current: false,
    description:
      "Leading AI-first engineering efforts — building conversational agents, voice-enabled workflows, and internal developer tooling.",
    responsibilities: [
      "Introduced AI-assisted development workflows across the engineering team, including prompt libraries and automation for PR reviews and technical spec generation.",
      "Integrated speech-to-text (STT) and text-to-speech (TTS) services to enable voice-based interaction flows in an internal agent tool.",
      "Built an engineering scorecard tool that analyses commit activity, PR timelines, and deployment data to surface delivery risks and team bottlenecks.",
      "Developed conversational workflow agents to automate internal developer support tasks and enable automated task execution.",
    ],
    techStack: [
      "Node.js",
      "Python",
      "LLM APIs",
      "RAG",
      "Agent Orchestration",
      "STT/TTS",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    id: 2,
    company: "Upscale AI",
    role: "Principal Engineer — Founding Member & First Hire",
    startDate: "Dec 2020",
    endDate: "Jul 2025",
    location: "Delaware, US (Remote)",
    current: false,
    description:
      "First engineering hire at an early-stage startup. Designed and built a Sales Engagement SaaS platform from the ground up, owning backend architecture through growth and scale.",
    responsibilities: [
      "Designed and built the entire backend architecture for a Sales Engagement SaaS platform as the first engineering hire.",
      "Built and operated distributed microservices handling 13 CRM integrations, OAuth2 authentication, and real-time bi-directional data sync.",
      "Designed real-time messaging pipelines using WebSockets for conversational and workflow-based interactions.",
      "Built webhook ingestion and large-scale async processing infrastructure.",
      "Maintained backend reliability using CloudWatch, X-Ray, alerts, and dashboards — significantly improving incident detection time.",
      "Engaged directly with customers and investors to translate product requirements into core architecture decisions.",
    ],
    techStack: [
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "AWS Lambda",
      "WebSockets",
      "OAuth2",
      "Docker",
      "Microservices",
    ],
  },
  {
    id: 3,
    company: "Nineleaps",
    role: "Software Engineer",
    startDate: "Jan 2019",
    endDate: "Dec 2020",
    location: "Bengaluru, India",
    current: false,
    description:
      "Worked on backend services at a LinkedIn Top 25 Startup, focusing on search performance, observability, and developer infrastructure.",
    responsibilities: [
      "Built and tuned Elasticsearch-backed search services — optimised index mappings and query DSL to improve search latency.",
      "Improved multiple slow API endpoints through query optimisation and database schema refactoring.",
      "Set up centralised log forwarding using Overseer and built Grafana dashboards for application monitoring.",
      "Created containerised development environments using Docker to mirror CI pipelines and surface integration issues early.",
    ],
    techStack: [
      "Node.js",
      "Elasticsearch",
      "PostgreSQL",
      "Docker",
      "Grafana",
      "Redis",
    ],
  },
];

export function getAllExperiences(): Experience[] {
  return experiences;
}
