import type { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description: "All projects built by Abdullah Saud — AI agents, backend systems, and full-stack applications.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
