import { EnvelopeIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface ContactCardProps {
  recipientKey: "tom" | "therese";
  name: string;
  role: string;
  bio: string;
  avatar: string;
  color: string;
  onContactClick: (
    recipientKey: "tom" | "therese",
    displayName: string
  ) => void;
}

export default function ContactCard({
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
      {/* Glow effect on hover */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500`}
      ></div>

      {/* Card content */}
      <div className="relative bg-white/10 dark:bg-neutral-900/50 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 h-full flex flex-col">
        {/* Avatar */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
          >
            {avatar}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
            <p className="text-emerald-300 text-sm font-semibold flex items-center gap-1">
              <SparklesIcon className="w-4 h-4" />
              {role}
            </p>
            {/* Optional display of email */}
  
          </div>
        </div>

        {/* Bio */}
        <p className="text-white/70 text-sm mb-6 flex-grow leading-relaxed">
          {bio}
        </p>

        {/* Contact button */}
        <button
          onClick={() => onContactClick(recipientKey, name)}
          className={`w-full bg-gradient-to-r ${color} hover:shadow-lg hover:shadow-emerald-500/50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02]`}
        >
          <EnvelopeIcon className="w-5 h-5" />
          <span>Send Message</span>
        </button>
      </div>
    </div>
  );
}
