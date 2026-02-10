"use client";
import Link from "next/link";
import PhoneFrame from "../components/PhoneFrame";
import styles from "./signup.module.css";

export default function SignupPage() {
  return (
    <PhoneFrame title="Sign up page">
      <div className={styles.screen}>
        <h1 className={styles.title}>Bli medlem</h1>
        <div className={styles.subtitle}>Create account</div>

        <div className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Lorem</label>
            <div className={styles.wireInput} />

            <label className={styles.label}>Lorem</label>
            <div className={styles.wireInput} />

            <label className={styles.label}>Lorem</label>
            <div className={styles.wireInput} />
          </div>

          <button
            className={styles.cta}
            type="button"
            onClick={() => alert("Prototype demo: Create account")}
          >
            CTA
          </button>

          <div className={styles.dividerRow} aria-hidden="true">
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>Lorem</span>
            <span className={styles.dividerLine} />
          </div>

          <div className={styles.options}>
            <OptionRow text="Lorem Ipsum" />
            <OptionRow text="Lorem ipsum" />
            <OptionRow text="Lorem ipsum" />
            <OptionRow text="Lorem ipsum" />
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

function OptionRow({ text }: { text: string }) {
  return (
    <div className={styles.optionRow}>
      <span className={styles.optionDot} aria-hidden="true" />
      <span className={styles.optionText}>{text}</span>
    </div>
  );
}
