"use client";

import { useState } from "react";
import { Profile } from "../../lib/data/profiles";
import { useSmoothScroll } from "../../lib/hooks/useSmoothScroll";
import BaseLayout from "../layouts/BaseLayout";
import { ProfileHero } from "./ProfileHero";
import { AboutSection } from "./AboutSection";
import { ProjectsSection } from "./ProjectsSection";
import { SkillsSection } from "./SkillsSection";
import { ContactSection } from "./ContactSection";
import ContactModal from "./ContactModal";
import { GhostTerminal } from "./GhostTerminal";
import type { SelectedPerson } from "../../lib/types";
import { GitHubRepo } from "../../lib/github/fetchRepos";

interface ProfileViewProps {
  profile: Profile;
  backHref?: string;
  repos?: GitHubRepo[];
}

export function ProfileView({ profile, backHref, repos = [] }: ProfileViewProps) {
  const { scrollToSection, lenis } = useSmoothScroll();
  const [selectedPerson, setSelectedPerson] = useState<SelectedPerson | null>(null);

  function openModal(recipientKey: "tom" | "therese", name: string) {
    setSelectedPerson({ recipientKey, name });
    lenis?.stop();
  }

  function closeModal() {
    setSelectedPerson(null);
    lenis?.start();
  }

  return (
    <BaseLayout backHref={backHref}>
      <ProfileHero profile={profile} scrollToSection={scrollToSection} />
      <AboutSection profile={profile} />
      <ProjectsSection profile={profile} repos={repos} />
      <SkillsSection profile={profile} />
      <ContactSection onContactClick={openModal} />

      <GhostTerminal repos={repos} />

      {selectedPerson && (
        <ContactModal person={selectedPerson} onClose={closeModal} />
      )}
    </BaseLayout>
  );
}
