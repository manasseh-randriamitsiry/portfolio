export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  isPresent?: boolean;
  type?: 'work' | 'internship';
}

export interface Skill {
  name: string;
  icon?: string;
  category: 'mobile' | 'backend' | 'tool';
  color?: string;
}

export type ViewState = 'home' | 'works' | 'resume' | 'contact';