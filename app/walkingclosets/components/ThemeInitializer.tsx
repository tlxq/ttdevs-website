"use client";

import { useEffect } from "react";

const THEMES = ["linda", "thelma", "tom", "alexander", "lofi"] as const;
type Theme = (typeof THEMES)[number];

function modeForTheme(t: Theme) {
  return t === "lofi" ? "lofi" : "hifi";
}

export default function ThemeInitializer() {
  useEffect(() => {
    const stored = window.localStorage.getItem("wc-theme") as Theme | null;
    const theme: Theme = stored ?? "lofi";

    document.documentElement.dataset.wcTheme = theme;
    document.documentElement.dataset.wcMode = modeForTheme(theme);
  }, []);

  return null;
}
