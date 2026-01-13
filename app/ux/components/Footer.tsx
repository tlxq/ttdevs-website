import { SiGithub, SiLinkedin } from "react-icons/si";

type FooterProps = {
  variant?: "page" | "sidebar";
};

export default function Footer({ variant = "page" }: FooterProps) {
  const year = new Date().getFullYear();
  const isSidebar = variant === "sidebar";

  return (
    <footer
      className={
        isSidebar ? "border-t border-gray-200 pt-4" : "border-t border-gray-200 bg-white px-10 py-6"
      }
    >
      <div className={isSidebar ? "" : "max-w-3xl"}>
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <a
              href="https://www.linkedin.com/in/tlxq"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md px-2 py-1 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              aria-label="LinkedIn (öppnas i ny flik)"
              title="LinkedIn"
            >
              <SiLinkedin className="h-5 w-5" aria-hidden="true" />
            </a>

            <a
              href="https://github.com/tlxq"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md px-2 py-1 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              aria-label="GitHub (öppnas i ny flik)"
              title="GitHub"
            >
              <SiGithub className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
          <p className="text-xs text-gray-500">© {year} UX Skolarbete – tlxq</p>
        </div>
      </div>
    </footer>
  );
}
