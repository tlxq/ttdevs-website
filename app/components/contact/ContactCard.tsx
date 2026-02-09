import { EnvelopeIcon, SparklesIcon } from "@heroicons/react/24/outline";

type RecipientKey = "tom" | "therese";

interface ContactCardProps {
  recipientKey: RecipientKey;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  /** Tailwind gradient classes, e.g. "from-tt-blue to-tt-ice" */
  color: string;
  onContactClick: (recipientKey: RecipientKey, displayName: string) => void;
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
  const handleClick = () => onContactClick(recipientKey, name);

  return (
    <article className="group relative">
      {/* Hover glow using provided gradient */}
      <div
        className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${color} opacity-0 blur transition duration-500 group-hover:opacity-75`}
      />

      <div className="bg-tt-navy-dark/80 hover:border-tt-ice/60 relative flex h-full flex-col rounded-2xl border border-white/15 p-8 backdrop-blur-xl transition-all duration-300">
        <header className="mb-4 flex items-start gap-4">
          <div
            className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${color} text-tt-navy-dark text-2xl font-bold shadow-lg`}
          >
            {avatar}
            <div className="border-tt-ice/60 bg-tt-ice absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border-2">
              <div className="bg-tt-navy-dark h-2 w-2 animate-pulse rounded-full" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-tt-ice mb-1 text-2xl font-bold">{name}</h3>
            <p className="text-tt-ice/80 flex items-center gap-1 text-sm font-semibold">
              <SparklesIcon className="text-tt-ice h-4 w-4" />
              {role}
            </p>
          </div>
        </header>

        <p className="text-tt-ice/80 mb-6 grow text-sm leading-relaxed">{bio}</p>

        <button
          type="button"
          onClick={handleClick}
          className="from-tt-blue to-tt-ice text-tt-navy-dark hover:shadow-tt-blue/40 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3 font-semibold transition-all duration-300 group-hover:scale-[1.02] hover:shadow-lg"
        >
          <EnvelopeIcon className="text-tt-navy-dark h-5 w-5" />
          <span>Send Message</span>
        </button>
      </div>
    </article>
  );
}
