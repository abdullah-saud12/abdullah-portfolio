"use client";

import { useAudience } from "@/context/audience-provider";
import Hero from "@/components/home/hero";
import Skills from "@/components/home/skills";
import Experience from "@/components/home/experience";
import Projects from "@/components/home/projects";
import Contact from "@/components/home/contact";
import FounderHome from "@/components/home/founder-home";

export default function HomeClient() {
  const { audience } = useAudience();

  if (audience === "founder") {
    return <FounderHome />;
  }

  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
