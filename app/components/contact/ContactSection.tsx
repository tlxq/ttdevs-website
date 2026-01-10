import RevealOnScroll from "../../lib/RevealOnScroll";
import ContactCard from "./ContactCard";

interface ContactSectionProps {
  onContactClick: (recipientKey: "tom" | "therese", displayName: string) => void;
}

const teamMembers: Array<{
  recipientKey: "tom" | "therese";
  name: string;
  role: string;
  bio: string;
  avatar: string;
  color: string;
}> = [
  {
    recipientKey: "tom",
    name: "Tom",
    role: "Frontend Developer",
    bio: "Crafting beautiful user experiences with modern web technologies",
    avatar: "T",
    color: "from-tt-blue to-tt-ice",
  },
  {
    recipientKey: "therese",
    name: "Therese",
    role: "Backend Developer",
    bio: "Building robust and scalable server architectures",
    avatar: "T",
    color: "from-purple-500 to-pink-500",
  },
];

export default function ContactSection({ onContactClick }: ContactSectionProps) {
  return (
    <section
      data-snap
      className="relative flex min-h-screen items-center justify-center px-4 py-20"
    >
      <RevealOnScroll className="relative w-full max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-tt-ice mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            Get in Touch
          </h2>
          <p className="text-tt-ice/70 mx-auto max-w-2xl text-lg">
            Have a project in mind? We’d love to hear from you. Reach out to us.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {teamMembers.map((member) => (
            <ContactCard
              key={member.recipientKey}
              {...member}
              onContactClick={(recipientKey, displayName) =>
                onContactClick(recipientKey, displayName)
              }
            />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
