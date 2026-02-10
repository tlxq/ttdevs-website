import Link from "next/link";
import PhoneFrame from "./components/PhoneFrame";
import ThemeSwitcher from "./components/ThemeSwitcher";
import styles from "./onboarding.module.css";

export default function WalkingClosetsOnboarding() {
  return (
    <PhoneFrame title="Onboarding page" leftSlot={<ThemeSwitcher />}>
      <div className={styles.screen}>
        <h1 className={styles.title}>Lorem Ipsum!</h1>

        <div className={styles.hero}>
          <div className={styles.heroIcon} aria-hidden="true">
            <div className={styles.heroDot} />
            <div className={styles.heroBag} />
          </div>
        </div>

        <div className={styles.indicators} aria-hidden="true">
          <span className={styles.indicator} />
          <span className={styles.indicator} />
          <span className={styles.indicator} />
        </div>

        <Link className={styles.primaryButton} href="/walkingclosets/signup">
          Bli medlem
        </Link>

        <Link className={styles.skip} href="/walkingclosets/login">
          Hoppa över
        </Link>
      </div>
    </PhoneFrame>
  );
}
