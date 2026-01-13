type UXPageLayoutProps = {
  title: string;
  intro?: string;
  children: React.ReactNode;
};

export default function UXPageLayout({ title, intro, children }: UXPageLayoutProps) {
  return (
    <article className="space-y-10">
      {/* Header card */}
      <header className="rounded-xl border border-gray-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-8">
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-xs font-semibold tracking-[0.18em] text-indigo-500 uppercase">
            UX – Modul
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h1>
          {intro && <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{intro}</p>}
        </div>
      </header>

      {/* Page content */}
      <div className="space-y-10">{children}</div>
    </article>
  );
}
