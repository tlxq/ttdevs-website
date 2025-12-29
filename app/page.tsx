import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full flex flex-col justify-center items-center px-4"
      style={{
        background: "linear-gradient(to right, #2F0743, #41295a)",
      }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white text-center drop-shadow-lg">
        We are fullstack
      </h1>
      <main
        className="bg-white/30 dark:bg-neutral-900/30 rounded-3xl shadow-xl px-8 py-12 w-full max-w-lg border border-white/20 dark:border-neutral-800 backdrop-blur-md animate-fadein"
        style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
      >
        <p className="mb-8 text-lg text-neutral-700/80 dark:text-neutral-300/80 text-center tracking-wide">
          Contact us
        </p>
        <div className="flex flex-col gap-6">
          <ContactCard name="Tom" role="Frontend" email="tom@ttdevs.com" />
          <ContactCard
            name="Therese"
            role="Backend"
            email="therese@ttdevs.com"
          />
        </div>
        <footer className="mt-10 text-xs text-neutral-200/80 text-center">
          © {new Date().getFullYear()} TTdevs. All rights reserved.
        </footer>
      </main>
      <style>
        {`
          @keyframes fadein {
            0% { opacity: 0; transform: translateY(24px);}
            100% { opacity: 1; transform: none;}
          }
          .animate-fadein {
            animation: fadein 1s cubic-bezier(.54,1.52,.46,1) both;
          }
        `}
      </style>
    </div>
  );
}

function ContactCard({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: string;
}) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl p-4 bg-white/25 dark:bg-neutral-800/30 border border-white/15 dark:border-neutral-700/50 shadow-lg backdrop-blur-lg transition transform hover:scale-[1.025] hover:shadow-emerald-200/30 dark:hover:shadow-emerald-800/15 duration-300 group"
      style={{ transition: "box-shadow 0.3s, transform 0.3s" }}
    >
      <div className="bg-emerald-500/80 dark:bg-emerald-600/60 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold text-white shadow-md transition group-hover:scale-110">
        {name[0]}
      </div>
      <div>
        <p className="text-lg font-medium text-[var(--foreground)]">{name}</p>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
          {role}
        </p>
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-1 text-sm text-emerald-700 dark:text-emerald-300 hover:underline hover:text-emerald-500 dark:hover:text-emerald-200 transition duration-200"
        >
          <EnvelopeIcon className="w-5 h-5 inline-block" />
          {email}
        </a>
      </div>
    </div>
  );
}
