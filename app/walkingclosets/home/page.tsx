import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import PhoneFrame from "../components/PhoneFrame";
import TabBar from "../components/TabBar";
import ThemeSwitcher from "../components/ThemeSwitcher";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <PhoneFrame title="Startsida" leftSlot={<ThemeSwitcher />}>
      <div className={styles.screen}>
        <div className={styles.topRow}>
          <div className={styles.avatar} aria-hidden="true" />
          
          {/* Lofi: Lorem text */}
          <div className={styles.topTitle} data-lofi-only="true">Lorem Ipsum!</div>
          
          {/* Hifi: Logo */}
          <div className={styles.logoWrap} data-hifi-only="true">
            <Image
              src="/img/logo2.png"
              alt="Walking Closets"
              width={120}
              height={40}
              className={styles.logo}
            />
          </div>

          <Link
            href="/walkingclosets/profile/edit"
            aria-label="Open profile settings"
            className={styles.profileLink}
          >
            <UserCircleIcon className={styles.profileIcon} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.cards}>
          {/* Lofi: wireframe blocks */}
          <div className={styles.cardSmall} data-lofi-only="true" />
          <div className={styles.cardLarge} data-lofi-only="true" />
          <div className={styles.cardMedium} data-lofi-only="true" />
          
          {/* Hifi: real content cards */}
          <div className={styles.cardHifi} data-hifi-only="true">
            <div className={styles.cardTitle}>Dela din garderob</div>
            <div className={styles.cardText}>
              Tjäna pengar på kläder du inte använder. Hyra ut direkt från din egen Walking Closet.
            </div>
          </div>
          
          <div className={styles.cardHifiFeatured} data-hifi-only="true">
            <div className={styles.featuredBadge}>POPULÄRT</div>
            <div className={styles.cardTitle}>Hitta unika plagg</div>
            <div className={styles.cardText}>
              Upptäck hållbart mode från andra användare. Hyr det du behöver, när du behöver det.
            </div>
          </div>
          
          <div className={styles.cardHifi} data-hifi-only="true">
            <div className={styles.cardTitle}>Hållbart mode</div>
            <div className={styles.cardText}>
              Minska ditt klimatavtryck genom att dela och hyra kläder istället för att köpa nytt.
            </div>
          </div>
        </div>

        <TabBar active="home" />
      </div>
    </PhoneFrame>
  );
}
