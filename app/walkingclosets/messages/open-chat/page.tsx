import { ChevronLeftIcon, FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PhoneFrame from "../../components/PhoneFrame";
import TabBar from "../../components/TabBar";
import styles from "./chat.module.css";

export default function ChatDetailPage() {
  return (
    <PhoneFrame title="Chatt">
      <div className={styles.screen}>
        <header className={styles.header}>
          <Link className={styles.backBtn} href="/walkingclosets/messages" aria-label="Back">
            <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
          </Link>

          <div className={styles.headerCenter}>
            <div className={styles.headerAvatar} aria-hidden="true" />
            <div className={styles.headerName} data-lofi-only="true">Lorem ipsum</div>
            <div className={styles.headerName} data-hifi-only="true">Anna Svensson</div>
          </div>

          <div style={{ width: 26 }} />
        </header>

        <main className={styles.chat} aria-label="Messages">
          <Msg side="left" />
          <Msg side="left" />
          <Msg side="right" />
          <Msg side="left" />
          <Msg side="right" />
          <Msg side="left" big />
          <Msg side="left" />
          <Msg side="right" />
        </main>

        <footer className={styles.composer} aria-label="Message composer">
          <FaceSmileIcon className={styles.composerIcon} aria-hidden="true" />

          <div className={styles.inputPill}>
            <span className={styles.inputText} data-lofi-only="true">Lorem ipsum dolor...</span>
            <span className={styles.inputText} data-hifi-only="true">Skriv ett meddelande...</span>
          </div>

          <div className={styles.sendBtn} aria-label="Send">
            <PaperAirplaneIcon className={styles.sendIcon} aria-hidden="true" />
          </div>
        </footer>

        <TabBar active="messages" />
      </div>
    </PhoneFrame>
  );
}

function Msg({ side, big }: { side: "left" | "right"; big?: boolean }) {
  return (
    <div className={side === "left" ? styles.msgRowLeft : styles.msgRowRight}>
      {side === "left" && <div className={styles.msgAvatar} aria-hidden="true" />}
      <div className={big ? styles.bubbleBig : styles.bubble} aria-hidden="true" />
      {side === "right" && <div className={styles.msgAvatar} aria-hidden="true" />}
    </div>
  );
}
