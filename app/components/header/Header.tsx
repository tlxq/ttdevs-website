"use client";

import { useState, memo } from "react";
import { Link, usePathname, useRouter } from "../../../src/i18n/routing";
import { Button } from "../ui/Button";
import { usePulse } from "../../lib/pulse/PulseContext";
import { TerminalModal } from "../terminal/TerminalModal";
import { useTranslations, useLocale } from "next-intl";

interface HeaderProps {
  backHref?: string;
  scrollToSection?: (id: string) => void;
}

function HeaderComponent({ backHref, scrollToSection }: HeaderProps) {
  const t = useTranslations("Header");
  const tc = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { tom, therese, isLoading } = usePulse();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "sv" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="text-xl font-bold tracking-tighter text-white hover:text-zinc-400 transition-colors">
              TTDEVS
            </Link>
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2 py-1 rounded border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-[10px] font-mono text-zinc-400 hover:text-white"
            >
              <span className={locale === "sv" ? "text-nebula-accent font-bold" : ""}>SV</span>
              <span className="opacity-20">/</span>
              <span className={locale === "en" ? "text-nebula-accent font-bold" : ""}>EN</span>
            </button>

            {/* Terminal Trigger - Desktop only next to logo */}
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-nebula-accent/20 bg-nebula-accent/5 hover:bg-nebula-accent/10 transition-colors group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-nebula-accent animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-nebula-accent/70 group-hover:text-nebula-accent">{t("terminal")}</span>
            </button>
          </div>

          {/* System Status Display - Minimalistized for performance */}
          {!isLoading && (
            <div className="hidden lg:flex items-center gap-3 text-[9px] font-mono tracking-[0.15em] uppercase text-zinc-500">
              <span className="text-zinc-600 font-bold opacity-80">{tc("systemStatus")}:</span>
              
              <div className="flex items-center gap-1.5">
                <span className={tom.isOnline ? "text-emerald-500/90" : "text-zinc-700"}>
                  TOM [{tom.isOnline ? tc("online") : tc("offline")}]
                </span>
              </div>

              <span className="opacity-20">|</span>

              <div className="flex items-center gap-1.5">
                <span className={therese.isOnline ? "text-emerald-500/90" : "text-zinc-700"}>
                  THERESE [{therese.isOnline ? tc("active") : tc("away")}]
                </span>
              </div>
            </div>
          )}

          <nav className="flex items-center gap-4 md:gap-8">
            {/* Mobile Terminal Trigger */}
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="lg:hidden p-2 text-nebula-accent/70 hover:text-nebula-accent transition-colors"
              aria-label="Open Terminal"
            >
              <span className="font-mono text-sm font-bold">$_</span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {scrollToSection ? (
                <>
                  <button onClick={() => scrollToSection("about")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">{t("about")}</button>
                  <button onClick={() => scrollToSection("projects")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">{t("projects")}</button>
                  <button onClick={() => scrollToSection("skills")} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">{t("skills")}</button>
                  <Button size="sm" onClick={() => scrollToSection("contact")}>{t("contact")}</Button>
                </>
              ) : (
                backHref && (
                  <Link href={backHref as any}>
                    <Button variant="ghost" size="sm">← {tc("back")}</Button>
                  </Link>
                )
              )}
            </div>
          </nav>
        </div>
      </header>

      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </>
  );
}

export default memo(HeaderComponent);
