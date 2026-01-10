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
    color: "from-blue-500 to-cyan-500",
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
    <section data-snap className="flex min-h-screen items-center justify-center px-4 py-20">
      <RevealOnScroll className="w-full max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-5xl font-bold text-white md:text-6xl">Get in Touch</h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Have a project in mind? Love to hear from you. Reach out to us
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
