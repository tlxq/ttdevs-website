import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PhoneFrame from "../components/PhoneFrame";
import TabBar from "../components/TabBar";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <PhoneFrame title="Startsida">
      <div className={styles.screen}>
        <div className={styles.topRow}>
          <div className={styles.avatar} aria-hidden="true" />
          <div className={styles.topTitle}>Lorem Ipsum!</div>

          <Link
            href="/walkingclosets/profile/edit"
            aria-label="Open profile settings"
            className={styles.profileLink}
          >
            <UserCircleIcon className={styles.profileIcon} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.cards}>
          <div className={styles.cardSmall} />
          <div className={styles.cardLarge} />
          <div className={styles.cardMedium} />
        </div>

        <TabBar active="home" />
      </div>
    </PhoneFrame>
  );
}
