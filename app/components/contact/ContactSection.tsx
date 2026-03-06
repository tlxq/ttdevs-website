import { FadeIn, Stagger, StaggerItem } from "../../lib/components/FadeIn";
import SectionTag from "../../lib/components/SectionTag";
import ContactCard from "./ContactCard";
import type { RecipientKey, TeamMember } from "../../lib/types";

interface ContactSectionProps {
  onContactClick: (recipientKey: RecipientKey, displayName: string) => void;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    recipientKey: "tom",
    name: "Tom",
    role: "Frontend Developer",
    bio: "Crafting beautiful user experiences with modern web technologies",
    avatar: "T",
    color: "tt-gradient-tom",
  },
  {
    recipientKey: "therese",
    name: "Therese",
    role: "Backend Developer",
    bio: "Building robust and scalable server architectures",
    avatar: "T",
    color: "tt-gradient-therese",
  },
];

export default function ContactSection({ onContactClick }: ContactSectionProps) {
  return (
    <section id="contact" data-snap className="tt-section">
      <div className="tt-container">
        <FadeIn className="tt-section-header">
          <SectionTag>Let&apos;s work together</SectionTag>
          <h2 className="tt-heading">Get in Touch</h2>
          <p className="tt-subtext">Have a project in mind? We&apos;d love to hear from you.</p>
        </FadeIn>

        <Stagger className="tt-contact-grid">
          {TEAM_MEMBERS.map((member) => (
            <StaggerItem key={member.recipientKey}>
              <ContactCard {...member} onContactClick={onContactClick} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

