export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface FirebaseData {
  projects: Project[];
  timeline: TimelineItem[];
}