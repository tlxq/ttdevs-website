import {
  ChatBubbleLeftRightIcon,
  EllipsisHorizontalCircleIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import PhoneFrame from "../components/PhoneFrame";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <PhoneFrame title="Startsida">
      <div className={styles.screen}>
        <div className={styles.topRow}>
          <div className={styles.avatar} aria-hidden="true" />
          <div className={styles.topTitle}>Lorem Ipsum!</div>
          <UserCircleIcon className={styles.profileIcon} aria-hidden="true" />
        </div>

        <div className={styles.cards}>
          <div className={styles.cardSmall} />
          <div className={styles.cardLarge} />
          <div className={styles.cardMedium} />
        </div>

        <nav className={styles.tabBar} aria-label="Bottom tabs">
          <Tab label="Startsida" active icon={<HomeIcon className={styles.tabIcon} />} />
          <Tab label="Hitta kasse" icon={<ShoppingBagIcon className={styles.tabIcon} />} />
          <Tab label="Meddelanden" icon={<ChatBubbleLeftRightIcon className={styles.tabIcon} />} />
          <Tab label="Mer" icon={<EllipsisHorizontalCircleIcon className={styles.tabIcon} />} />
        </nav>
      </div>
    </PhoneFrame>
  );
}

function Tab({ label, icon, active }: { label: string; icon: React.ReactNode; active?: boolean }) {
  return (
    <div className={styles.tab}>
      <div className={active ? styles.tabIconWrapActive : styles.tabIconWrap} aria-hidden="true">
        {icon}
      </div>
      <div className={active ? styles.tabLabelActive : styles.tabLabel}>{label}</div>
    </div>
  );
}
