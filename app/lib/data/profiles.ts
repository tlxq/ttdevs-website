export interface Project {
  title: string;
  tag: string;
  desc: string;
  href?: string;
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Fullstack" | "Tools" | "Database" | "Styling" | "Animation" | "DevOps";
  level: number;
}

export interface Interest {
  id: string;
}

export interface Profile {
  id: "joint" | "tom" | "therese";
  name: string;
  role: string;
  bio: string;
  aboutTitle: string;
  aboutText: string;
  projects: Project[];
  skills: Skill[];
  interests?: Interest[];
  recipientKey: "tom" | "therese";
  imageUrl?: string;
}

export const PROFILES: Record<string, Profile> = {
  joint: {
    id: "joint",
    name: "TTdevs",
    role: "Software Development Duo",
    bio: "We merge cutting-edge technology with refined design to create high-performance digital environments.",
    aboutTitle: "Who We Are",
    aboutText: "A two-person collective dedicated to building sustainable, high-performance digital environments.",
    recipientKey: "tom",
    projects: [],
    skills: [
      { name: "React / Next.js", category: "Frontend", level: 98 },
      { name: "Node.js / Bun", category: "Backend", level: 92 },
      { name: "PostgreSQL / Redis", category: "Database", level: 88 },
      { name: "Tailwind / Framer", category: "Styling", level: 95 }
    ]
  },
  tom: {
    id: "tom",
    name: "Tom",
    role: "Junior Fullstack-utvecklare",
    bio: "Fullstack-utvecklare fokuserad på TypeScript, React och backend-utveckling.",
    aboutTitle: "Interface Artistry",
    aboutText: "Expert in crafting pixel-perfect, interactive user interfaces with a focus on accessibility and speed.",
    imageUrl: "/tom-profile.webp",
    recipientKey: "tom",
    projects: [],
    skills: [
      { name: "React, Next.js, TypeScript, Tailwind CSS", category: "Frontend", level: 95 },
      { name: "Node.js, Supabase, PostgreSQL, REST APIs", category: "Backend", level: 90 },
      { name: "Docker, Git, Linux, Bash, CI/CD", category: "DevOps", level: 85 }
    ],
    interests: [
      { id: "football" },
      { id: "gym" },
      { id: "cats" }
    ]
  },
  therese: {
    id: "therese",
    name: "Therese",
    role: "Systems Engineer",
    bio: "Architecting secure, scalable, and efficient backend foundations.",
    aboutTitle: "Systems Design",
    aboutText: "Specialist in database modeling, cloud infrastructure, and highly available backends.",
    imageUrl: "/therese-profile.webp",
    recipientKey: "therese",
    projects: [],
    skills: [
      { name: "Node.js", category: "Backend", level: 96 },
      { name: "PostgreSQL", category: "Database", level: 94 },
      { name: "System Design", category: "Tools", level: 90 }
    ]
  }
};
