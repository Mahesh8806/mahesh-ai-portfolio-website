export interface Project {
  title: string;
  summary: string;
  architecture: string[];
  challenge: string;
  techStack: string[];
  repoLink: string;
  demoLink?: string;
  category: string;
}

export interface ApproachStep {
  stage: string;
  iconName: string;
  description: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  companySubtitle?: string;
  period: string;
  location?: string;
  description: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string[];
  modules?: string[];
  thesis?: {
    title: string;
    summary: string;
  };
}

export interface SkillCategory {
  title: string;
  skills: string[];
  iconName: string;
}
