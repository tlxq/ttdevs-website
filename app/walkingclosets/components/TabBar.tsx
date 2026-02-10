import {
  ChatBubbleLeftRightIcon,
  EllipsisHorizontalCircleIcon,
  HomeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import styles from "./TabBar.module.css";

type TabKey = "home" | "find" | "messages" | "more";

export default function TabBar({ active }: { active: TabKey }) {
  return (
    <nav className={styles.tabBar} aria-label="Bottom tabs">
      <Tab href="/walkingclosets/home" label="Startsida" active={active === "home"}>
        <HomeIcon className={styles.tabIcon} aria-hidden="true" />
      </Tab>

      <Tab href="/walkingclosets/find" label="Hitta kasse" active={active === "find"}>
        <ShoppingBagIcon className={styles.tabIcon} aria-hidden="true" />
      </Tab>

      <Tab href="/walkingclosets/messages" label="Meddelanden" active={active === "messages"}>
        <ChatBubbleLeftRightIcon className={styles.tabIcon} aria-hidden="true" />
      </Tab>

      <Tab href="/walkingclosets/more" label="Mer" active={active === "more"}>
        <EllipsisHorizontalCircleIcon className={styles.tabIcon} aria-hidden="true" />
      </Tab>
    </nav>
  );
}

function Tab({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link className={styles.tab} href={href} aria-current={active ? "page" : undefined}>
      <span className={active ? styles.tabIconWrapActive : styles.tabIconWrap}>{children}</span>
      <span className={active ? styles.tabLabelActive : styles.tabLabel}>{label}</span>
    </Link>
  );
}
