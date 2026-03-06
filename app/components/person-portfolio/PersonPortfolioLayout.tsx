"use client";

import { useState } from "react";
import type { RecipientKey, SelectedPerson } from "../../lib/types";
import { useSmoothScroll } from "../../lib/hooks/useSmoothScroll";
import { useScrollSnap } from "../../lib/hooks/useScrollSnap";
import AmbientBackground from "../../lib/AmbientBackground";
import ScrollProgressBar from "../../lib/components/ScrollProgressBar";
import Header from "../header/Header";
import PersonHero from "./PersonHero";
import AboutSection from "../about/AboutSection";
import ProjectsSection from "../projects/ProjectsSection";
import SkillsSection from "../skills/SkillsSection";
import ContactSection from "../contact/ContactSection";
import ContactModal from "../contact/ContactModal";
import Footer from "../footer/Footer";

interface PersonPortfolioLayoutProps {
  person: "tom" | "therese";
}

/**
 * Reusable layout for individual developer portfolio pages (/tom, /therese).
 * Shares the same scroll infrastructure as PortfolioLayout but with a
 * person-specific hero and a back-link to TTdevs in the header.
 */
export default function PersonPortfolioLayout({ person }: PersonPortfolioLayoutProps) {
  const { lenis, scrollToSection } = useSmoothScroll();
  const [selectedPerson, setSelectedPerson] = useState<SelectedPerson | null>(null);

  useScrollSnap(lenis);

  function openModal(recipientKey: RecipientKey, name: string) {
    setSelectedPerson({ recipientKey, name });
    lenis?.stop();
  }

  function closeModal() {
    setSelectedPerson(null);
    lenis?.start();
  }

  return (
    <>
      <AmbientBackground />
      <ScrollProgressBar />

      <div className="relative z-10 w-full animate-[fadeIn_0.8s_ease-out_forwards]">
        <Header scrollToSection={scrollToSection} backHref="/" />

        <main>
          <PersonHero person={person} scrollToSection={scrollToSection} />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection onContactClick={openModal} />
        </main>

        <Footer />
      </div>

      {selectedPerson && (
        <ContactModal person={selectedPerson} onClose={closeModal} />
      )}
    </>
  );
}
