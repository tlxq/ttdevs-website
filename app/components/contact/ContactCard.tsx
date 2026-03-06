"use client";

import { EnvelopeIcon, SparklesIcon } from "@heroicons/react/24/outline";
import type { RecipientKey, TeamMember } from "../../lib/types";
import { Card } from "../../lib/components/Card";
import { Button } from "../../lib/components/Button";

interface ContactCardProps extends TeamMember {
  onContactClick: (recipientKey: RecipientKey, displayName: string) => void;
}

export default function ContactCard({
  recipientKey, name, role, bio, avatar, color, onContactClick,
}: ContactCardProps) {
  return (
    <Card className="tt-card-lg" hover>
      <div className="tt-card-shimmer" />
      <div className="tt-card-glow" />

      <header className="mb-4 flex items-start gap-4">
        <div className={`tt-avatar relative h-16 w-16 ${color}`}>
          {avatar}
          <span className="tt-avatar-badge">
            <span className="tt-avatar-pulse" />
          </span>
        </div>
        <div className="flex-1">
          <h3 className="tt-card-name-lg">{name}</h3>
          <p className="tt-card-role">
            <SparklesIcon className="h-4 w-4" />
            {role}
          </p>
        </div>
      </header>

      <p className="mb-6 grow tt-body">{bio}</p>

      <Button
        variant="send"
        type="button"
        onClick={() => onContactClick(recipientKey, name)}
      >
        <EnvelopeIcon className="h-5 w-5" />
        <span>Send Message</span>
      </Button>
    </Card>
  );
}
