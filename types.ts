export interface Metric {
  value: string;
  label: string;
}

export type ProjectVisual = 'agent' | 'shield' | 'rag' | 'collision' | 'bikes';

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  featured?: boolean;
  visual: ProjectVisual;
  problem: string;
  solution: string;
  architecture: string[];
  challenge: string;
  outcomes: Metric[];
  techStack: string[];
  repoLink: string;
  demoLink?: string;
}

export interface Workstream {
  title: string;
  stack: string[];
  points: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  companySubtitle?: string;
  period?: string;
  location?: string;
  summary: string;
  highlights?: Metric[];
  workstreams?: Workstream[];
  points?: string[];
  stack: string[];
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
  blurb: string;
  iconName: string;
  skills: string[];
}

export interface ApproachStep {
  stage: string;
  description: string;
}

export interface StoryChapter {
  index: string;
  label: string;
  title: string;
  body: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  iconName: string;
  what: string;
  tools: string[];
  where: { label: string; project?: string }[];
}
