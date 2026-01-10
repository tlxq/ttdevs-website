import { EnvelopeIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface ContactCardProps {
  recipientKey: "tom" | "therese";
  name: string;
  role: string;
  bio: string;
  avatar: string;
  color: string;
  onContactClick: (recipientKey: "tom" | "therese", displayName: string) => void;
}

export default function ContactCard2({
  recipientKey,
  name,
  role,
  bio,
  avatar,
  color,
  onContactClick,
}: ContactCardProps) {
  return (
    <div className="group relative">
      {/* Glow effect on hover – use your palette blues instead of emerald */}
      <div
        className={`absolute -inset-0.5 bg-linear-to-r ${color} rounded-2xl opacity-0 blur transition duration-500 group-hover:opacity-75`}
      ></div>

      {/* Card content */}
      <div className="relative flex h-full flex-col rounded-2xl border border-white/15 bg-[#1B262C]/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-[#BBE1FA]/60">
        {/* Avatar */}
        <div className="mb-4 flex items-start gap-4">
          <div
            className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br ${color} text-2xl font-bold text-[#1B262C] shadow-lg`}
          >
            {avatar}
            <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#BBE1FA]/60 bg-[#BBE1FA]">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#1B262C]" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="mb-1 text-2xl font-bold text-[#BBE1FA]">{name}</h3>
            <p className="flex items-center gap-1 text-sm font-semibold text-[#BBE1FA]/80">
              <SparklesIcon className="h-4 w-4 text-[#BBE1FA]" />
              {role}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="mb-6 grow text-sm leading-relaxed text-[#BBE1FA]/80">{bio}</p>

        {/* Contact button – gradient from 3282B8 to BBE1FA */}
        <button
          onClick={() => onContactClick(recipientKey, name)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3282B8] to-[#BBE1FA] px-6 py-3 font-semibold text-[#1B262C] transition-all duration-300 group-hover:scale-[1.02] hover:shadow-lg hover:shadow-[#3282B8]/40"
        >
          <EnvelopeIcon className="h-5 w-5 text-[#1B262C]" />
          <span>Send Message</span>
        </button>
      </div>
    </div>
  );
}
