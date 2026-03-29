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
}

export const PROFILES: Record<string, Profile> = {
  joint: {
    id: "joint",
    name: "TTdevs",
    role: "Full-stack Developer Duo",
    bio: "We merge cutting-edge technology with refined design to create high-performance digital environments.",
    aboutTitle: "The Ecosystem",
    aboutText: "A two-person collective dedicated to building sustainable, high-performance digital environments.",
    recipientKey: "tom",
    projects: [
      { title: "TTdevs v3", tag: "Next.js 16 // Framer", desc: "Minimalist studio portfolio with real-time CLI engine." },
      { title: "EPA-appen", tag: "React Native // Node", desc: "Mobile ecosystem for car enthusiasts with real-time tracking." }
    ],
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
    role: "Frontend Specialist",
    bio: "Focused on high-performance interfaces and polished motion design.",
    aboutTitle: "Frontend Artistry",
    aboutText: "Expert in crafting pixel-perfect, interactive user interfaces with a focus on accessibility and speed.",
    recipientKey: "tom",
    projects: [
      { title: "Visual Engine", tag: "Three.js // GLSL", desc: "A custom shader-based background system for modern web apps." }
    ],
    skills: [
      { name: "React", category: "Frontend", level: 99 },
      { name: "Framer Motion", category: "Animation", level: 95 },
      { name: "Tailwind CSS", category: "Styling", level: 98 }
    ]
  },
  therese: {
    id: "therese",
    name: "Therese",
    role: "Backend Architect",
    bio: "Building robust system architectures and scalable API ecosystems.",
    aboutTitle: "Systems Design",
    aboutText: "Specialist in database modeling, cloud infrastructure, and highly available backends.",
    recipientKey: "therese",
    projects: [
      { title: "Scalable API", tag: "Go // Kubernetes", desc: "A high-throughput API layer serving millions of requests." }
    ],
    skills: [
      { name: "Node.js", category: "Backend", level: 96 },
      { name: "PostgreSQL", category: "Database", level: 94 },
      { name: "System Design", category: "Tools", level: 90 }
    ]
  }
};
