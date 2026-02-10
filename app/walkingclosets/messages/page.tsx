import { MagnifyingGlassIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PhoneFrame from "../components/PhoneFrame";
import TabBar from "../components/TabBar";
import styles from "./messages.module.css";

export default function MessagesPage() {
  return (
    <PhoneFrame title="Chatt">
      <div className={styles.screen}>
        <header className={styles.header}>
          <div className={styles.headerTitle} data-lofi-only="true">Lorem ipsum</div>
          <div className={styles.headerTitle} data-hifi-only="true">Meddelanden</div>

          <div className={styles.searchRow}>
            <div className={styles.searchPill} aria-label="Search">
              <MagnifyingGlassIcon className={styles.searchIcon} aria-hidden="true" />
              <span className={styles.searchText}>Lorem ipsum dolor...</span>
            </div>

            <div className={styles.addBtn} aria-label="New chat">
              <PlusIcon className={styles.addIcon} aria-hidden="true" />
            </div>
          </div>
        </header>

        <main className={styles.list} aria-label="Conversations">
          <Link className={styles.row} href="/walkingclosets/messages/open-chat">
            <div className={styles.avatar} aria-hidden="true" />
            <div className={styles.rowText}>
              <div className={styles.rowTitle} data-lofi-only="true">Lorem ipsum</div>
              <div className={styles.rowTitle} data-hifi-only="true">Anna Svensson</div>
              <div className={styles.rowSub} data-lofi-only="true">Lorem ipsum dolor sit amet...</div>
              <div className={styles.rowSub} data-hifi-only="true">Hej! Är klänningen fortfarande tillgänglig?</div>
            </div>
          </Link>

          <Link className={styles.row} href="/walkingclosets/messages/open-chat">
            <div className={styles.avatar} aria-hidden="true" />
            <div className={styles.rowText}>
              <div className={styles.rowTitle} data-lofi-only="true">Lorem ipsum</div>
              <div className={styles.rowTitle} data-hifi-only="true">Erik Nilsson</div>
              <div className={styles.rowSub} data-lofi-only="true">Lorem ipsum dolor sit amet...</div>
              <div className={styles.rowSub} data-hifi-only="true">Tack för senast! Jackan var perfekt 👌</div>
            </div>
          </Link>

          {/* "Delete" highlighted row (wireframe-like) */}
          <div className={styles.deleteRow}>
            <div className={styles.deleteLeft}>
              <div className={styles.rowTitle} data-lofi-only="true">Lorem ipsum</div>
              <div className={styles.rowTitle} data-hifi-only="true">Maria Andersson</div>
              <div className={styles.rowSub} data-lofi-only="true">Lorem ipsum dolor sit amet...</div>
              <div className={styles.rowSub} data-hifi-only="true">Kan vi boka för nästa helg?</div>
            </div>
            <div className={styles.deleteBtn} aria-hidden="true">
              <TrashIcon className={styles.trashIcon} />
            </div>
          </div>
        </main>

        <TabBar active="messages" />
      </div>
    </PhoneFrame>
  );
}
