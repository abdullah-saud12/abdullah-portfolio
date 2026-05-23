export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  detailedDescription: string;
  challenges: string[];
  tags: string[];
  year: string;
  duration: string;
  category: "AI" | "Web" | "Other";
  featured: boolean;
  imageUrl: string;
  demoLink?: string;
  githubLink?: string;
  videoUrl?: string;
  isHackathonProject?: boolean;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  techStack: string[];
}

export interface SkillCategory {
  id: number;
  name: string;
  skills: string[];
  featured: boolean;
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  author: string;
  readingTime: string;
  imageUrl: string;
  featured: boolean;
  isHidden: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}
