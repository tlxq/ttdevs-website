import Image from "next/image";
import Link from "next/link";
import PhoneFrame from "./components/PhoneFrame";
import ThemeSwitcher from "./components/ThemeSwitcher";
import styles from "./onboarding.module.css";

export default function WalkingClosetsOnboarding() {
  return (
    <PhoneFrame title="Onboarding page" leftSlot={<ThemeSwitcher />}>
      <div className={styles.screen}>
        {/* Hi-fi logo (hidden in lofi via CSS) */}
        <div className={styles.brand} aria-hidden="true">
          <Image
            src="/img/logo.png"
            alt="Walking Closets"
            width={180}
            height={60}
            priority
            className={styles.logo}
          />
        </div>

        <h1 className={styles.title}>Lorem Ipsum!</h1>

        <div className={styles.hero}>
          {/* Low-fi icon (hidden in hifi via CSS) */}
          <div className={styles.heroIcon} aria-hidden="true">
            <div className={styles.heroDot} />
            <div className={styles.heroBag} />
          </div>

          {/* Hi-fi overlay content (optional) */}
          <div className={styles.heroHifi} aria-hidden="true" />
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
