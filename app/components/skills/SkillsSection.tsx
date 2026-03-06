"use client";

import { motion } from "framer-motion";
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
    <section id="skills" className="tt-section">
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
  return (
    <div className="tt-card">
      <h3 className="tt-skill-category">{group.category}</h3>
      <ul className="space-y-2.5" role="list">
        {group.skills.map(({ name, Icon }, i) => (
          <motion.li
            key={name}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: 4 }}
            className="tt-skill-row"
          >
            <Icon className={`h-5 w-5 shrink-0 ${group.color}`} aria-hidden="true" />
            <span className="tt-skill-name">{name}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}


