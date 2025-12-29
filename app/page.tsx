import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <main className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl px-8 py-12 w-full max-w-lg border border-neutral-200 dark:border-neutral-800">
        <h1 className="text-3xl font-bold mb-3 tracking-tight text-[var(--foreground)]">
          Välkommen till TTdevs
        </h1>
        <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-300">
          Portfolio & kontakt
        </p>

        <div className="flex flex-col gap-6">
          <ContactCard name="Tom" email="tom@ttdevs.com" />
          <ContactCard name="Therese" email="therese@ttdevs.com" />
        </div>

        <footer className="mt-10 text-xs text-neutral-400 text-center">
          © {new Date().getFullYear()} TTdevs. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

function ContactCard({ name, email }: { name: string; email: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
      <div className="bg-neutral-200 dark:bg-neutral-700 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold text-neutral-700 dark:text-neutral-200">
        {name[0]}
      </div>
      <div>
        <p className="text-lg font-medium text-[var(--foreground)]">{name}</p>
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          <EnvelopeIcon className="w-5 h-5 inline-block" />
          {email}
        </a>
      </div>
    </div>
  );
}
