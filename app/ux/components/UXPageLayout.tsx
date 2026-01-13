type UXPageLayoutProps = {
  title: string;
  intro?: string;
  children: React.ReactNode;
};

export default function UXPageLayout({ title, intro, children }: UXPageLayoutProps) {
  return (
    <article className="mt-5 space-y-10">
      <header className="rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm sm:px-8">
        <div className="space-y-3 text-center sm:text-left">
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            {/* Vänster streck */}
            <span className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-indigo-400 to-indigo-400 sm:block" />

            {/* Titel */}
            <h1 className="text-2xl font-semibold tracking-[0.18em] whitespace-nowrap text-gray-700 uppercase">
              {title}
            </h1>

            {/* Höger streck */}
            <span className="hidden h-px flex-1 bg-gradient-to-r from-indigo-400 to-transparent sm:block" />
          </div>

          {intro && <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{intro}</p>}
        </div>
      </header>

      <div className="space-y-10">{children}</div>
    </article>
  );
}
