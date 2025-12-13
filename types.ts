export interface Project {
  title: string;
  summary: string;
  techStack: string[];
  repoLink: string;
  demoLink?: string;
  category: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'work' | 'education';
}

export interface SkillCategory {
  title: string;
  skills: string[];
  iconName: string;
}
