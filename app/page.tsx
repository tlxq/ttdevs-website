"use client";

import { useState } from "react";
import Terminal from "./components/terminal/Terminal";
import PortfolioLayout from "./components/PortfolioLayout";

export default function Home() {
  const [phase, setPhase] = useState<"terminal" | "portfolio">("terminal");

  if (phase === "terminal") {
    return <Terminal onStart={() => setPhase("portfolio")} />;
  }

  return <PortfolioLayout />;
}

