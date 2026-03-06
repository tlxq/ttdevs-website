"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { FadeIn, SlideIn } from "../../lib/components/FadeIn";
import SectionTag from "../../lib/components/SectionTag";

type Status = "live" | "in-progress" | "planned";

interface Project {
  title: string;
  description: string;
  tags: string[];
  status: Status;
  href?: string;
}

const PROJECTS: Project[] = [
  {
    title: "TTdevs Portfolio",
    description:
      "Our own portfolio and dev hub. Features an interactive terminal landing page, smooth Lenis scroll, a scroll-animated ambient background, and a contact form powered by Resend.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Lenis", "Resend"],
    status: "live",
    href: "https://ttdevs.com",
  },
  {
    title: "EPA-appen",
    description:
      "A mobile-first web app for EPA car enthusiasts. Invite-based account registration, community features, and a REST API backend — built for a niche but passionate user base.",
    tags: ["React", "Node.js", "PostgreSQL", "REST API", "Redis"],
    status: "in-progress",
  },
  {
    title: "More coming soon",
    description:
      "We're always working on something new. Check back here for future projects, open-source tools, and experiments.",
    tags: [],
    status: "planned",
  },
];

const STATUS: Record<Status, { label: string; className: string }> = {
  live:          { label: "Live",           className: "tt-status-live"     },
  "in-progress": { label: "In Development", className: "tt-status-progress" },
  planned:       { label: "Planned",        className: "tt-status-planned"  },
};

export default function ProjectsSection() {
  return (
    <section id="projects" data-snap className="tt-section">
      <div className="tt-container">
        <FadeIn className="tt-section-header">
          <SectionTag>What we&apos;ve built</SectionTag>
          <h2 className="tt-heading">Projects</h2>
          <p className="tt-subtext">A selection of things we&apos;ve designed, built, and shipped.</p>
        </FadeIn>

        <div className="tt-projects-grid">
          {PROJECTS.map((project, i) => (
            <SlideIn
              key={project.title}
              from={i % 3 === 0 ? "left" : i % 3 === 1 ? "up" : "right"}
              delay={i * 0.15}
            >
              <ProjectCard project={project} />
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { label, className } = STATUS[project.status];
  const isPlanned = project.status === "planned";
  const reduced = useReducedMotion();

  const card = (
    <motion.div
      whileHover={isPlanned || reduced ? {} : { y: -5, boxShadow: "var(--shadow-card-hover)" }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
      className={["tt-card flex h-full flex-col group", isPlanned ? "opacity-50" : ""].join(" ")}
    >
      {!isPlanned && (
        <div className="tt-card-glow-left" />
      )}
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="tt-card-title">{project.title}</h3>
        <div className="flex shrink-0 items-center gap-2">
          <span className={className}>{label}</span>
          {project.href && <ArrowTopRightOnSquareIcon className="tt-card-link-icon" />}
        </div>
      </div>
      <p className="flex-1 tt-body">{project.description}</p>
      {project.tags.length > 0 && (
        <div className="tt-tags-row">
          {project.tags.map((tag) => (
            <span key={tag} className="tt-tech-tag">{tag}</span>
          ))}
        </div>
      )}
    </motion.div>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} — opens in new tab`}
        className="tt-card-link"
      >
        {card}
      </a>
    );
  }
  return <div className="h-full">{card}</div>;
}


