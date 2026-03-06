export default function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="tt-tag">
      <span className="tt-tag-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
