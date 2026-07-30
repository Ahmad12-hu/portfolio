export type ProjectCategory = 'Tous' | 'Agri-tech' | 'Fullstack' | 'Frontend' | 'Mini-jeux' | 'Web' | 'Web & Mobile';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDescription: string;
  category: ProjectCategory;
  tags: string[];
  highlights: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  image: string;
  interactiveType?: 'ka-farm' | 'sunujob' | 'fitpulse' | 'quiz-css' | 'digital-hub';
  stats?: { label: string; value: string }[];
}

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    iconName: string;
    description: string;
    badgeColor?: string;
  }[];
}

export interface TimelineItem {
  year: string;
  role: string;
  institution: string;
  location: string;
  description: string;
  highlights: string[];
  type: 'education' | 'community' | 'project';
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface UserProfile {
  name: string;
  avatar?: string;
  title: string;
  subtitle?: string;
  tagline: string;
  location: string;
  country: string;
  bio: string;
  detailedBio: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  twitter?: string;
  facebook?: string;
  stats: {
    projectsCount: number;
    studentsReached: number;
    githubCommits: string;
    yearsLearning: string;
    experienceYears: string;
  };
}
