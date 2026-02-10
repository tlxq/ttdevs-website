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
        <div className={styles.subtitle}>Login</div>

        <div className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Lorem</label>
            <div className={styles.wireInput} />

            <label className={styles.label}>Lorem</label>
            <div className={styles.wireInput} />

            <div className={styles.forgotRow}>
              <button
                type="button"
                className={styles.forgot}
                onClick={() => alert("Prototype: forgot password")}
              >
                Lorem ?
              </button>
            </div>
          </div>

          <button
            className={styles.cta}
            type="button"
            onClick={() => router.push("/walkingclosets/home")}
          >
            CTA
          </button>

          {/* rest unchanged... */}
          <div className={styles.dividerRow} aria-hidden="true">
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>Lorem</span>
            <span className={styles.dividerLine} />
          </div>

          <div className={styles.options}>
            <OptionRow text="Lorem ipsum" />
            <OptionRow text="Lorem ipsum" />
            <OptionRow text="Lorem ipsum" />
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

function OptionRow({ text }: { text: string }) {
  return (
    <div className={styles.optionRow}>
      <span className={styles.optionDot} aria-hidden="true" />
      <span className={styles.optionText}>{text}</span>
    </div>
  );
}
