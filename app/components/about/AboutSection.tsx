"use client";

import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "../../lib/components/FadeIn";
import SectionTag from "../../lib/components/SectionTag";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  tags: string[];
  gradient: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Tom",
    role: "Frontend Developer",
    bio: "Passionate about crafting pixel-perfect interfaces that feel great to use. Turns design ideas into fast, accessible, and maintainable React applications.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Lenis"],
    gradient: "tt-gradient-tom",
  },
  {
    name: "Therese",
    role: "Backend Developer",
    bio: "Focused on building robust, scalable server architectures. Designs APIs and data models that make the frontend's job easy and keep systems reliable under load.",
    tags: ["Node.js", "PostgreSQL", "REST APIs", "Redis", "Docker"],
    gradient: "tt-gradient-therese",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="tt-section">
      <div className="tt-container">
        <FadeIn className="tt-section-header">
          <SectionTag>The team</SectionTag>
          <h2 className="tt-heading">About Us</h2>
          <p className="tt-subtext">
            Two developers. One shared vision — ship fast, ship well, ship with care.
          </p>
        </FadeIn>

        <Stagger className="tt-team-grid">
          {TEAM.map((member) => (
            <StaggerItem key={member.name}>
              <MemberCard member={member} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "var(--shadow-card-hover)" }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="tt-card-lg group"
    >
      <div className="tt-card-glow" />

      <div
        className={`tt-avatar-square mb-5 h-14 w-14 ${member.gradient}`}
        aria-hidden="true"
      >
        {member.name[0]}
      </div>

      <h3 className="tt-card-name">{member.name}</h3>
      <span className="tt-role-badge">{member.role}</span>
      <p className="mt-4 tt-body">{member.bio}</p>

      <div className="tt-tags-row">
        {member.tags.map((tag) => (
          <span key={tag} className="tt-tech-tag">{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}


