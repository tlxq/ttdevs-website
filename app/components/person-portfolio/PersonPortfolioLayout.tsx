"use client";

import { useState } from "react";
import type { RecipientKey, SelectedPerson } from "../../lib/types";
import { useSmoothScroll } from "../../lib/hooks/useSmoothScroll";
import { useScrollSnap } from "../../lib/hooks/useScrollSnap";
import AmbientBackground from "../../lib/AmbientBackground";
import ScrollProgressBar from "../../lib/components/ScrollProgressBar";
import Header from "../header/Header";
import PersonHero from "./PersonHero";
import PersonAboutSection from "./PersonAboutSection";
import PersonProjectsSection from "./PersonProjectsSection";
import PersonSkillsSection from "./PersonSkillsSection";
import PersonContactSection from "./PersonContactSection";
import ContactModal from "../contact/ContactModal";
import Footer from "../footer/Footer";

const PERSON_NAMES: Record<"tom" | "therese", string> = {
  tom: "Tom",
  therese: "Therese",
};

interface PersonPortfolioLayoutProps {
  person: "tom" | "therese";
}

export default function PersonPortfolioLayout({ person }: PersonPortfolioLayoutProps) {
  const { lenis, scrollToSection } = useSmoothScroll();
  const [selectedPerson, setSelectedPerson] = useState<SelectedPerson | null>(null);
  const name = PERSON_NAMES[person];

  useScrollSnap(lenis);

  function openModal(recipientKey: RecipientKey, displayName: string) {
    setSelectedPerson({ recipientKey, name: displayName });
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
          <PersonAboutSection person={person} />
          <PersonProjectsSection person={person} />
          <PersonSkillsSection person={person} />
          <PersonContactSection person={person} name={name} onContactClick={openModal} />
        </main>

        <Footer />
      </div>

      {selectedPerson && (
        <ContactModal person={selectedPerson} onClose={closeModal} />
      )}
    </>
  );
}
