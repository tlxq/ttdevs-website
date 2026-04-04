export interface Project {
  title: string;
  tag: string;
  desc: string;
  href?: string;
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Fullstack" | "Tools" | "Database" | "Styling" | "Animation";
  level: number;
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
    role: "Interface Engineer",
    bio: "Designing and building intuitive, high-performance web interfaces.",
    aboutTitle: "Interface Artistry",
    aboutText: "Expert in crafting pixel-perfect, interactive user interfaces with a focus on accessibility and speed.",
    imageUrl: "/tom-profile.webp",
    recipientKey: "tom",
    projects: [],
    skills: [
      { name: "React", category: "Frontend", level: 99 },
      { name: "Framer Motion", category: "Animation", level: 95 },
      { name: "Tailwind CSS", category: "Styling", level: 98 }
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
