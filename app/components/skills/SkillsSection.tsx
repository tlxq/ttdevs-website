"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  SiDocker, SiFigma, SiGit, SiNextdotjs, SiNodedotjs,
  SiPostgresql, SiReact, SiRedis, SiTailwindcss, SiTypescript, SiVercel,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import type { IconType } from "react-icons";
import { FadeIn, Stagger, StaggerItem } from "../../lib/components/FadeIn";
import SectionTag from "../../lib/components/SectionTag";

interface Skill  { name: string; Icon: IconType }
interface SkillGroup { category: string; color: string; skills: Skill[] }

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    color: "tt-icon-frontend",
    skills: [
      { name: "React",        Icon: SiReact       },
      { name: "Next.js",      Icon: SiNextdotjs   },
      { name: "TypeScript",   Icon: SiTypescript  },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
    ],
  },
  {
    category: "Backend",
    color: "tt-icon-backend",
    skills: [
      { name: "Node.js",    Icon: SiNodedotjs  },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Redis",      Icon: SiRedis      },
      { name: "REST APIs",  Icon: TbApi        },
    ],
  },
  {
    category: "Tools",
    color: "tt-icon-tools",
    skills: [
      { name: "Git",    Icon: SiGit    },
      { name: "Docker", Icon: SiDocker },
      { name: "Vercel", Icon: SiVercel },
      { name: "Figma",  Icon: SiFigma  },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" data-snap className="tt-section">
      <div className="tt-container">
        <FadeIn className="tt-section-header">
          <SectionTag>Tech stack</SectionTag>
          <h2 className="tt-heading">Skills</h2>
          <p className="tt-subtext">The tools and technologies we reach for to get the job done.</p>
        </FadeIn>

        <Stagger className="tt-skills-grid">
          {SKILL_GROUPS.map((group) => (
            <StaggerItem key={group.category}>
              <SkillGroupCard group={group} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function SkillGroupCard({ group }: { group: SkillGroup }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? {} : { y: -4, boxShadow: "var(--shadow-card-hover)" }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
      className="tt-card group"
    >
      <h3 className="tt-skill-category">{group.category}</h3>
      <ul className="space-y-2.5" role="list">
        {group.skills.map(({ name, Icon }, i) => (
          <motion.li
            key={name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduced ? {} : { x: 5 }}
            className="tt-skill-row"
          >
            <motion.span
              whileHover={reduced ? {} : { rotate: [0, -12, 12, -6, 0], scale: 1.2 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="shrink-0"
            >
              <Icon className={`h-5 w-5 ${group.color}`} aria-hidden="true" />
            </motion.span>
            <span className="tt-skill-name">{name}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}


