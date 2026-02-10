import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PhoneFrame from "../components/PhoneFrame";
import TabBar from "../components/TabBar";
import styles from "./more.module.css";

export default function MorePage() {
  return (
    <PhoneFrame title="Mer">
      <div className={styles.screen}>
        <div className={styles.list}>
          <Link className={styles.row} href="/walkingclosets/more/faq">
            <span className={styles.rowText}>FAQ</span>
            <ChevronRightIcon className={styles.chev} aria-hidden="true" />
          </Link>

          {/* add more items later if you want */}
          <div className={styles.rowDisabled}>
            <span className={styles.rowTextMuted}>Settings (coming soon)</span>
          </div>
        </div>

        <TabBar active="more" />
      </div>
    </PhoneFrame>
  );
}
