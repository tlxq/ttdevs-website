"use client";

import { useState } from "react";
import type { RecipientKey, SelectedPerson } from "../lib/types";
import { useSmoothScroll } from "../lib/hooks/useSmoothScroll";
import AmbientBackground from "../lib/AmbientBackground";
import Header from "./header/Header";
import Hero from "./hero/Hero";
import AboutSection from "./about/AboutSection";
import ProjectsSection from "./projects/ProjectsSection";
import SkillsSection from "./skills/SkillsSection";
import ContactSection from "./contact/ContactSection";
import ContactModal from "./contact/ContactModal";
import Footer from "./footer/Footer";

/**
 * Full portfolio page layout.
 * Owns smooth scroll, modal state, and section wiring so that page.tsx stays minimal.
 */
export default function PortfolioLayout() {
  const { lenis, scrollToSection } = useSmoothScroll();
  const [selectedPerson, setSelectedPerson] = useState<SelectedPerson | null>(null);

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

      <div className="relative z-10 w-full animate-[fadeIn_0.8s_ease-out_forwards]">
        <Header scrollToSection={scrollToSection} />

        <main>
          <Hero scrollToSection={scrollToSection} />
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
