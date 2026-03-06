"use client";

import { EnvelopeIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { FadeIn, SlideIn } from "../../lib/components/FadeIn";
import SectionTag from "../../lib/components/SectionTag";
import type { RecipientKey } from "../../lib/types";

interface PersonContactData {
  subtext: string;
  role: string;
  bio: string;
  gradient: string;
  availability: string;
}

const DATA: Record<"tom" | "therese", PersonContactData> = {
  tom: {
    subtext: "Got a frontend project or a UI challenge you want to tackle? Let's talk.",
    role: "Frontend Developer",
    bio: "I'm open to freelance projects, full-time roles, and interesting collaborations. If you need someone who cares as much about the details as you do — reach out.",
    gradient: "tt-gradient-tom",
    availability: "Available for freelance & full-time",
  },
  therese: {
    subtext: "Need a solid backend, a reliable API, or a technical co-founder? I'd love to hear from you.",
    role: "Backend Developer",
    bio: "I'm available for freelance backend work, consulting, and full-time engineering roles. Whether you're starting from scratch or need help scaling — let's figure it out together.",
    gradient: "tt-gradient-therese",
    availability: "Available for freelance & full-time",
  },
};

interface Props {
  person: "tom" | "therese";
  name: string;
  onContactClick: (recipientKey: RecipientKey, displayName: string) => void;
}

export default function PersonContactSection({ person, name, onContactClick }: Props) {
  const d = DATA[person];
  const isTom = person === "tom";

  return (
    <section id="contact" data-snap className="tt-section">
      <div className="tt-container">
        <FadeIn className="tt-section-header">
          <SectionTag>Let&apos;s work together</SectionTag>
          <h2 className="tt-heading">Get in Touch</h2>
          <p className="tt-subtext">{d.subtext}</p>
        </FadeIn>

        <SlideIn from="up" delay={0.15} className="mx-auto max-w-xl">
          <div className="tt-card-lg group relative">
            <div className="tt-card-glow" />
            <div className="tt-card-shimmer" />

            {/* Person header */}
            <header className="mb-6 flex items-center gap-4">
              <div className={`tt-avatar h-16 w-16 ${d.gradient}`}>
                {name[0]}
              </div>
              <div>
                <h3 className="tt-card-name-lg">{name}</h3>
                <p className={["tt-card-role", isTom ? "" : "tt-card-role-therese"].join(" ")}>
                  <SparklesIcon className="h-4 w-4" aria-hidden="true" />
                  {d.role}
                </p>
              </div>
            </header>

            {/* Availability badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-tt-success/30 bg-tt-success/10 px-3 py-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-tt-success" aria-hidden="true" />
              <span className="text-xs font-semibold text-tt-success">{d.availability}</span>
            </div>

            <p className="mb-8 tt-body">{d.bio}</p>

            {/* CTA */}
            <button
              type="button"
              onClick={() => onContactClick(person, name)}
              className={[
                "tt-btn-send",
                isTom ? "" : "tt-btn-send-therese",
              ].join(" ")}
              aria-label={`Send ${name} a message`}
            >
              <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
              <span>Send {name} a Message</span>
            </button>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}
