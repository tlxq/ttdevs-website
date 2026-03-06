"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeIn, SlideIn } from "../../lib/components/FadeIn";
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
    <section id="about" data-snap className="tt-section">
      <div className="tt-container">
        <FadeIn className="tt-section-header">
          <SectionTag>The team</SectionTag>
          <h2 className="tt-heading">About Us</h2>
          <p className="tt-subtext">
            Two developers. One shared vision — ship fast, ship well, ship with care.
          </p>
        </FadeIn>

        <div className="tt-team-grid">
          {TEAM.map((member, i) => (
            <SlideIn key={member.name} from={i % 2 === 0 ? "left" : "right"} delay={i * 0.12}>
              <MemberCard member={member} />
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? {} : { y: -6, boxShadow: "var(--shadow-card-hover)" }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
      className="tt-card-lg group"
    >
      <div className="tt-card-glow" />

      <motion.div
        className={`tt-avatar-square mb-5 h-14 w-14 ${member.gradient}`}
        whileHover={reduced ? {} : { scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        aria-hidden="true"
      >
        {member.name[0]}
      </motion.div>

      <h3 className="tt-card-name">{member.name}</h3>
      <span className="tt-role-badge">{member.role}</span>
      <p className="mt-4 tt-body">{member.bio}</p>

      <div className="tt-tags-row">
        {member.tags.map((tag, i) => (
          <motion.span
            key={tag}
            className="tt-tech-tag"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.07, duration: 0.45 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}


