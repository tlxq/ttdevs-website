"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { FadeIn, SlideIn } from "../../lib/components/FadeIn";
import SectionTag from "../../lib/components/SectionTag";

type Status = "live" | "in-progress" | "planned";

interface Project {
  title: string;
  description: string;
  role: string;
  tags: string[];
  status: Status;
  href?: string;
}

// ─── Person data ──────────────────────────────────────────────────────────────

const DATA: Record<"tom" | "therese", { sectionTag: string; subtext: string; projects: Project[] }> = {
  tom: {
    sectionTag: "What I've built",
    subtext: "Frontend projects — from polished UIs to accessible design systems.",
    projects: [
      {
        title: "TTdevs Portfolio",
        description:
          "Designed and built this site from the ground up. Interactive terminal landing page, smooth Lenis scrolling, scroll-synced ambient gradients, and a Framer Motion animation system. Every interaction was hand-crafted.",
        role: "Lead Frontend",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"],
        status: "live",
        href: "https://ttdevs.com",
      },
      {
        title: "EPA-appen — UI",
        description:
          "Mobile-first React interface for EPA car enthusiasts. Invite-based account flows, community feed, real-time updates, and a design system built in Tailwind. Optimised for low-end devices and slow connections.",
        role: "Frontend Lead",
        tags: ["React", "TypeScript", "Tailwind CSS", "REST API", "Mobile-first"],
        status: "in-progress",
      },
      {
        title: "Component Library",
        description:
          "A growing library of accessible, fully-typed React components. Built with Radix UI primitives, Tailwind variants, and Storybook documentation. Designed to be copy-paste friendly and framework-agnostic.",
        role: "Solo",
        tags: ["React", "TypeScript", "Radix UI", "Storybook", "WCAG AA"],
        status: "planned",
      },
      {
        title: "Accessibility Audit Tool",
        description:
          "A browser extension and CI integration for automated WCAG AA auditing. Highlights contrast failures, missing ARIA labels, and keyboard traps — with line-level fix suggestions piped directly into your editor.",
        role: "Solo",
        tags: ["TypeScript", "Chrome Extensions API", "WCAG", "Node.js"],
        status: "planned",
      },
    ],
  },
  therese: {
    sectionTag: "What I've built",
    subtext: "Backend systems, APIs, and infrastructure — built to last.",
    projects: [
      {
        title: "TTdevs Contact API",
        description:
          "Serverless email routing built as a Next.js API route. Validates payloads with Zod, routes messages to the correct recipient via Resend, and returns structured errors — fully typed, zero cold-start issues.",
        role: "Lead Backend",
        tags: ["Next.js API Routes", "Resend", "TypeScript", "Zod"],
        status: "live",
      },
      {
        title: "EPA-appen — API",
        description:
          "REST backend powering the EPA-appen community platform. Handles invite registration, user profiles, content feeds, and media uploads. PostgreSQL for persistence, Redis for sessions and rate-limiting.",
        role: "Backend Lead",
        tags: ["Node.js", "PostgreSQL", "Redis", "REST API", "TypeScript"],
        status: "in-progress",
      },
      {
        title: "Auth Microservice",
        description:
          "A standalone JWT authentication service with refresh-token rotation, device tracking, and brute-force protection. Built to drop into any Node project as a dependency with a single configuration object.",
        role: "Solo",
        tags: ["Node.js", "JWT", "Redis", "PostgreSQL", "TypeScript"],
        status: "planned",
      },
      {
        title: "DB Migration Runner",
        description:
          "Zero-downtime schema migration tool for PostgreSQL. Supports forward-only migrations, rollback snapshots, and CI integration. Designed around the expand-contract pattern for safe production deploys.",
        role: "Solo",
        tags: ["TypeScript", "PostgreSQL", "CLI", "Docker"],
        status: "planned",
      },
    ],
  },
};

const STATUS_MAP: Record<Status, { label: string; className: string }> = {
  live:          { label: "Live",           className: "tt-status-live"     },
  "in-progress": { label: "In Development", className: "tt-status-progress" },
  planned:       { label: "Planned",        className: "tt-status-planned"  },
};

// ─── Component ────────────────────────────────────────────────────────────────

interface Props { person: "tom" | "therese" }

export default function PersonProjectsSection({ person }: Props) {
  const { sectionTag, subtext, projects } = DATA[person];

  return (
    <section id="projects" data-snap className="tt-section">
      <div className="tt-container">
        <FadeIn className="tt-section-header">
          <SectionTag>{sectionTag}</SectionTag>
          <h2 className="tt-heading">Projects</h2>
          <p className="tt-subtext">{subtext}</p>
        </FadeIn>

        <div className="tt-projects-grid">
          {projects.map((project, i) => (
            <SlideIn
              key={project.title}
              from={i % 3 === 0 ? "left" : i % 3 === 1 ? "up" : "right"}
              delay={i * 0.13}
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
  const { label, className } = STATUS_MAP[project.status];
  const isPlanned = project.status === "planned";
  const reduced = useReducedMotion();

  const card = (
    <motion.div
      whileHover={isPlanned || reduced ? {} : { y: -5, boxShadow: "var(--shadow-card-hover)" }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
      className={["tt-card flex h-full flex-col group", isPlanned ? "opacity-55" : ""].join(" ")}
    >
      {!isPlanned && <div className="tt-card-glow-left" />}

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="tt-card-title">{project.title}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-tt-muted/60">
            {project.role}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className={className}>{label}</span>
          {project.href && (
            <ArrowTopRightOnSquareIcon className="tt-card-link-icon" aria-hidden="true" />
          )}
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
