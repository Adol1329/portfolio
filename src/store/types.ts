export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  category: string;
  role: string;
  isCollaborative: boolean;
  githubUrl: string;
  liveUrl: string;
  thumbnailUrl: string;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  color: string;
  skills: Skill[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

export interface Profile {
  name: string;
  headline: string;
  bio: string;
  location: string;
  phone: string;
  social: SocialLinks;
  availabilityStatus: 'open' | 'closed' | 'freelance';
  currentlyLearning: string[];
  languages: string[];
}

export interface CVInfo {
  filename: string;
  uploadedAt: string;
  available: boolean;
}

export interface PortfolioStore {
  projects: Project[];
  skillCategories: SkillCategory[];
  profile: Profile;
  cv: CVInfo;
  lastUpdated: string;
}
