"use client";

import Lenis from "lenis";
import { useState } from "react";
import ContactModal from "./components/contact/ContactModal";
import ContactSection from "./components/contact/ContactSection";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import ScrollGradient from "./lib/ScrollGradient";
import SmoothScroll from "./lib/SmoothScroll";
import { useScrollSnap } from "./lib/useScrollSnap";

type RecipientKey = "tom" | "therese";

interface SelectedPerson {
  recipientKey: RecipientKey;
  name: string;
}

export default function Home() {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<SelectedPerson | null>(null);

  useScrollSnap(lenis);

  const openModal = (recipientKey: RecipientKey, displayName: string) => {
    setSelectedPerson({ recipientKey, name: displayName });
    setShowModal(true);
    lenis?.stop();
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPerson(null);
    lenis?.start();
  };

  return (
    <SmoothScroll onLenis={setLenis}>
      <ScrollGradient lenis={lenis} />

      <div className="w-full">
        <Header lenis={lenis} />
        <Hero />
        <ContactSection onContactClick={openModal} />
        <Footer />
      </div>

      {showModal && selectedPerson && <ContactModal person={selectedPerson} onClose={closeModal} />}
    </SmoothScroll>
  );
}
