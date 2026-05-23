import type { SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    id: 1,
    name: "Backend & Languages",
    featured: true,
    skills: ["Node.js", "Express", "Python", "FastAPI", "GraphQL", "REST APIs", "gRPC"],
  },
  {
    id: 2,
    name: "Databases",
    featured: false,
    skills: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB", "Supabase", "Elasticsearch"],
  },
  {
    id: 3,
    name: "AI & Agents",
    featured: true,
    skills: ["LLM API Integration", "Agent Orchestration", "RAG", "Claude", "Codex", "STT / TTS", "Prompt Engineering"],
  },
  {
    id: 4,
    name: "Cloud & Infra",
    featured: false,
    skills: ["AWS Lambda", "Docker", "Serverless", "Microservices", "CI/CD", "GitHub Actions"],
  },
  {
    id: 5,
    name: "Frontend",
    featured: false,
    skills: ["React.js", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    id: 6,
    name: "Observability",
    featured: false,
    skills: ["Datadog", "CloudWatch", "Grafana", "Prometheus", "AWS X-Ray"],
  },
];

export function getAllSkillCategories(): SkillCategory[] {
  return skillCategories;
}
