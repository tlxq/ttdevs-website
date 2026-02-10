"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

const THEMES = ["linda", "thelma", "tom", "alexander", "lofi"] as const;
type Theme = (typeof THEMES)[number];

function modeForTheme(t: Theme) {
  return t === "lofi" ? "lofi" : "hifi";
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("lofi");

  useEffect(() => {
    const stored = window.localStorage.getItem("wc-theme") as Theme | null;
    const initial: Theme = stored ?? "lofi";
    setTheme(initial);

    document.documentElement.dataset.wcTheme = initial;
    document.documentElement.dataset.wcMode = modeForTheme(initial);
  }, []);

  function apply(next: Theme) {
    setTheme(next);

    document.documentElement.dataset.wcTheme = next;
    document.documentElement.dataset.wcMode = modeForTheme(next);

    window.localStorage.setItem("wc-theme", next);
  }

  return (
    <aside className={styles.wrap} aria-label="Color palettes">
      <div className={styles.title}>Palette</div>
      <div className={styles.buttons}>
        {THEMES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => apply(t)}
            className={t === theme ? styles.btnActive : styles.btn}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
    </aside>
  );
}
