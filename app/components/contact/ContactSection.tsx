import RevealOnScroll from "../../lib/RevealOnScroll";
import ContactCard from "./ContactCard";

interface ContactSectionProps {
  onContactClick: (
    recipientKey: "tom" | "therese",
    displayName: string
  ) => void;
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

export default function ContactSection({
  onContactClick,
}: ContactSectionProps) {
  return (
    <section
      data-snap
      className="min-h-screen flex items-center justify-center px-4 py-20"
    >
      <RevealOnScroll className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Have a project in mind? Love to hear from you. Reach out to us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
