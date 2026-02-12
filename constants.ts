import { Experience, Skill } from './types';

export const PROFILE_IMAGE = "https://lh3.googleusercontent.com/a/ACg8ocLCHN66F8m6vEpa_fRwg8sXh90P8Rm0adSqIWx73yqrClTYt0Y3ZA=s576-c-no";

// Google Maps style static image centered on Fianarantsoa, Madagascar
export const MAP_TEXTURE = "/fianarantsoa_map.png";

export const GITHUB_USERNAME = "manasseh-randriamitsiry";
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

// Map specific repos to images for the "Selected Works" visual
export const PROJECT_IMAGES: Record<string, string> = {
  "fihirana-JFF": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1000&auto=format&fit=crop",
  "event_symfony": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
  "permah-mvvn": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
  "fihirana-jff": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1000&auto=format&fit=crop",
  "default": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop"
};

// Featured projects with detailed descriptions
export const FEATURED_PROJECTS = {
  "fihirana-JFF": {
    name: "Fihirana JFF",
    description: "A comprehensive digital hymnal application featuring offline access to JFF (Jesus For All) hymns. Built with Flutter for cross-platform compatibility, allowing users to browse, search, and read hymns seamlessly.",
    stack: ["Flutter", "Dart", "Offline Storage"],
    url: "https://github.com/manasseh-randriamitsiry/fihirana-JFF"
  },
  "permah-mvvn": {
    name: "Permah MVVM",
    description: "A Flutter MVVM architecture template demonstrating clean separation of concerns. Provides a solid foundation for building scalable Flutter applications with proper state management and architectural patterns.",
    stack: ["Flutter", "Dart", "MVVM", "Clean Architecture"],
    url: "https://github.com/manasseh-randriamitsiry/permah-mvvn"
  },
  "event_symfony": {
    name: "Event Manager",
    description: "A full-featured event management backend built with Symfony. Handles event creation, attendee management, and scheduling with a robust API for integration with frontend applications.",
    stack: ["PHP", "Symfony", "MySQL", "REST API"],
    url: "https://github.com/manasseh-randriamitsiry/event_symfony"
  }
};

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Mobile & Flutter Developer",
    company: "Digital Concepts",
    period: "Jan 2025 - Present",
    description: "Developing cross-platform mobile applications with Flutter, implementing custom UI/UX designs and integrating with backend services.",
    isPresent: true,
    type: 'work'
  },
  {
    id: 2,
    role: "Freelance Flutter Developer",
    company: "Self-employed",
    period: "2023 - Jan 2025",
    description: "Crafting high-performance cross-platform mobile applications with custom UI/UX and robust backend integration.",
    isPresent: false,
    type: 'work'
  },
  {
    id: 3,
    role: "Gasikara Digital Internship",
    company: "Gasikara Digital",
    period: "2023",
    description: "Collaborated in agile teams to build scalable web services and modernized legacy database architectures.",
    isPresent: false,
    type: 'internship'
  }
];

export const SKILLS: Skill[] = [
  { name: "Flutter", category: "mobile", icon: "flutter_dash", color: "text-blue-400" },
  { name: "Dart", category: "mobile", color: "text-blue-500" },
  { name: "Symfony", category: "backend", icon: "php" },
  { name: "PHP", category: "backend" },
  { name: "React", category: "tool" },
  { name: "Node.js", category: "backend" },
  { name: "TypeScript", category: "tool" },
  { name: "Docker", category: "backend", icon: "dns", color: "text-blue-600" },
  { name: "Unit Testing", category: "tool" }
];

export const FOCUS_AREA = [
  { label: 'FRONT', height: 'h-24', color: 'bg-[#02579c]' },
  { label: 'BACK', height: 'h-16', color: 'bg-[#6aa0d1]' },
  { label: 'MOBILE', height: 'h-20', color: 'bg-[#8ab6dd]' },
  { label: 'DEVOPS', height: 'h-12', color: 'bg-[#02579c]' },
  { label: 'QA', height: 'h-28', color: 'bg-[#b6d2e9]' }
];

export const EDUCATION = {
  degree: "Master's Degree from ENI",
  major: "Computer Science",
  school: "ENI Fianarantsoa",
  period: "2020 - 2022",
  description: "Specialized in Software Engineering and Database Systems. Graduated with honors, focusing on scalable architecture and cross-platform mobile development ecosystems."
};
