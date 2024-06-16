export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink?: string;
  image?: string;
  featured?: boolean;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  tags?: string[];
}

export interface FirebaseData {
  about: string;
  projects: Project[];
  timeline: TimelineItem[];
  skills?: SkillCategory[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}
export interface Contribution {
  repo: string;
  description: string;
  url: string;
  type: "fork" | "pr";
  prCount?: number;
  prTitle?: string;
  technologies: string[];
}

export type SectionId = "about" | "experience" | "projects" | "contributing";

export interface NavItem {
  id: SectionId;
  label: string;
  icon: string;
}
