import RevealOnScroll from "../../lib/RevealOnScroll";
import ContactCard from "./ContactCard";

interface ContactSectionProps {
  onContactClick: (name: string, email: string) => void;
}

const teamMembers = [
  {
    name: "Tom",
    role: "Frontend Developer",
    email: "tom@ttdevs.com",
    bio: "Crafting beautiful user experiences with modern web technologies",
    avatar: "T",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Therese",
    role: "Backend Developer",
    email: "therese@ttdevs.com",
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
            Have a project in mind? We'd love to hear from you. Reach out to our
            team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <ContactCard
              key={member.email}
              {...member}
              onContactClick={onContactClick}
            />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
