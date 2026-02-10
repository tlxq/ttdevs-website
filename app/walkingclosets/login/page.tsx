"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PhoneFrame from "../components/PhoneFrame";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();

  return (
    <PhoneFrame title="Sign in page">
      <div className={styles.screen}>
        <h1 className={styles.title}>Logga in</h1>
        <div className={styles.subtitle} data-lofi-only="true">Login</div>
        <div className={styles.subtitle} data-hifi-only="true">Välkommen tillbaka!</div>

        <div className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} data-lofi-only="true">Lorem</label>
            <label className={styles.label} data-hifi-only="true">E-postadress</label>
            <div className={styles.wireInput} />

            <label className={styles.label} data-lofi-only="true">Lorem</label>
            <label className={styles.label} data-hifi-only="true">Lösenord</label>
            <div className={styles.wireInput} />

            <div className={styles.forgotRow}>
              <button
                type="button"
                className={styles.forgot}
                onClick={() => alert("Prototype: forgot password")}
                data-lofi-only="true"
              >
                Lorem ?
              </button>
              <button
                type="button"
                className={styles.forgot}
                onClick={() => alert("Prototype: forgot password")}
                data-hifi-only="true"
              >
                Glömt lösenord?
              </button>
            </div>
          </div>

          <button
            className={styles.cta}
            type="button"
            onClick={() => router.push("/walkingclosets/home")}
            data-lofi-only="true"
          >
            CTA
          </button>
          <button
            className={styles.cta}
            type="button"
            onClick={() => router.push("/walkingclosets/home")}
            data-hifi-only="true"
          >
            Logga in
          </button>

          {/* rest unchanged... */}
          <div className={styles.dividerRow} aria-hidden="true">
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>Lorem</span>
            <span className={styles.dividerLine} />
          </div>

          <div className={styles.options}>
            <OptionRow lofiText="Lorem ipsum" hifiText="Logga in med Google" />
            <OptionRow lofiText="Lorem ipsum" hifiText="Logga in med Apple" />
            <OptionRow lofiText="Lorem ipsum" hifiText="Logga in med Facebook" />
          </div>

          <div className={styles.bottom}>
            <Link className={styles.createAccount} href="/walkingclosets/signup">
              Create account
            </Link>

            <Link className={styles.back} href="/walkingclosets">
              ← Back
            </Link>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OptionRow({ lofiText, hifiText }: { lofiText: string; hifiText: string }) {
  return (
    <div className={styles.optionRow}>
      <span className={styles.optionDot} aria-hidden="true" />
      <span className={styles.optionText} data-lofi-only="true">{lofiText}</span>
      <span className={styles.optionText} data-hifi-only="true">{hifiText}</span>
    </div>
  );
}
