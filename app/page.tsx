"use client";

import Lenis from "lenis";
import { useState } from "react";
import ContactModal from "./components/contact/ContactModal";
import ContactSection from "./components/contact/ContactSection";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import ScrollGradient from "./lib/ScrollGradient";
import SmoothScroll from "./lib/SmoothScroll";
import { useScrollSnap } from "./lib/useScrollSnap";

export default function Home() {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useScrollSnap(lenis);

  const openModal = (name: string, email: string) => {
    setSelectedPerson({ name, email });
    setShowModal(true);
    if (lenis) lenis.stop();
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPerson(null);
    if (lenis) lenis.start();
  };

  return (
    <SmoothScroll onLenis={setLenis}>
      <ScrollGradient lenis={lenis} />

      <div className="w-full">
        <Hero />
        <ContactSection onContactClick={openModal} />
        <Footer />
      </div>

      {showModal && selectedPerson && (
        <ContactModal person={selectedPerson} onClose={closeModal} />
      )}
    </SmoothScroll>
  );
}
