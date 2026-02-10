"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import PhoneFrame from "../components/PhoneFrame";
import styles from "./signup.module.css";

export default function SignupPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      router.push("/walkingclosets/home");
    }, 800);
  };

  return (
    <PhoneFrame title="Sign up page">
      <div className={styles.screen}>
        <h1 className={styles.title}>Bli medlem</h1>
        <div className={styles.subtitle} data-lofi-only="true">Create account</div>
        <div className={styles.subtitle} data-hifi-only="true">Gå med i Walking Closets idag</div>

        {/* Lofi wireframe form */}
        <div className={styles.form} data-lofi-only="true">
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

        {/* Hifi functional form */}
        <form className={styles.form} onSubmit={handleSubmit} data-hifi-only="true">
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="name">Namn</label>
            <input
              id="name"
              type="text"
              className={styles.realInput}
              placeholder="Ditt namn"
              required
              disabled={isSubmitting}
            />

            <label className={styles.label} htmlFor="email">E-postadress</label>
            <input
              id="email"
              type="email"
              className={styles.realInput}
              placeholder="din@email.se"
              required
              disabled={isSubmitting}
            />

            <label className={styles.label} htmlFor="password">Lösenord</label>
            <input
              id="password"
              type="password"
              className={styles.realInput}
              placeholder="Minst 8 tecken"
              minLength={8}
              required
              disabled={isSubmitting}
            />

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                disabled={isSubmitting}
              />
              <span className={styles.checkboxText}>
                Jag accepterar användarvillkoren
              </span>
            </label>
          </div>

          <button
            className={styles.cta}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Skapar konto..." : "Skapa konto"}
          </button>

          <div className={styles.dividerRow} aria-hidden="true">
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>eller</span>
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
        </form>
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
