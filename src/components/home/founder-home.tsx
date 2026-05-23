"use client";

import FounderHero from "@/components/home/founder-hero";
import OutcomesWall from "@/components/founder/outcomes-wall";
import HowIBuild from "@/components/founder/how-i-build";
import WhatIDo from "@/components/founder/what-i-do";
import Experience from "@/components/home/experience";
import Projects from "@/components/home/projects";
import FounderContact from "@/components/founder/founder-contact";

export default function FounderHome() {
  return (
    <>
      <FounderHero />
      <OutcomesWall />
      <HowIBuild />
      <Experience />
      <WhatIDo />
      <Projects />
      <FounderContact />
    </>
  );
}
