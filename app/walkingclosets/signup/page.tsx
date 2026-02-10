"use client";
import Link from "next/link";
import PhoneFrame from "../components/PhoneFrame";
import styles from "./signup.module.css";

export default function SignupPage() {
  return (
    <PhoneFrame title="Sign up page">
      <div className={styles.screen}>
        <h1 className={styles.title}>Bli medlem</h1>
        <div className={styles.subtitle} data-lofi-only="true">Create account</div>
        <div className={styles.subtitle} data-hifi-only="true">Gå med i Walking Closets idag</div>

        <div className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} data-lofi-only="true">Lorem</label>
            <label className={styles.label} data-hifi-only="true">Namn</label>
            <div className={styles.wireInput} />

            <label className={styles.label} data-lofi-only="true">Lorem</label>
            <label className={styles.label} data-hifi-only="true">E-postadress</label>
            <div className={styles.wireInput} />

            <label className={styles.label} data-lofi-only="true">Lorem</label>
            <label className={styles.label} data-hifi-only="true">Lösenord</label>
            <div className={styles.wireInput} />
          </div>

          <button
            className={styles.cta}
            type="button"
            onClick={() => alert("Prototype demo: Create account")}
            data-lofi-only="true"
          >
            CTA
          </button>
          <button
            className={styles.cta}
            type="button"
            onClick={() => alert("Prototype demo: Create account")}
            data-hifi-only="true"
          >
            Skapa konto
          </button>

          <div className={styles.dividerRow} aria-hidden="true">
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>Lorem</span>
            <span className={styles.dividerLine} />
          </div>

          <div className={styles.options}>
            <OptionRow lofiText="Lorem Ipsum" hifiText="Fortsätt med Google" />
            <OptionRow lofiText="Lorem ipsum" hifiText="Fortsätt med Apple" />
            <OptionRow lofiText="Lorem ipsum" hifiText="Fortsätt med Facebook" />
            <OptionRow lofiText="Lorem ipsum" hifiText="Fortsätt med E-post" />
          </div>

          <div className={styles.footerLinks}>
            <Link className={styles.back} href="/walkingclosets">
              ← Back
            </Link>
            <Link className={styles.alt} href="/walkingclosets/login">
              Already a member? Logga in
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
