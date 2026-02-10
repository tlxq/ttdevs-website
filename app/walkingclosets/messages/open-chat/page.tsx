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
          <Msg side="left" text="Hej! Är klänningen fortfarande tillgänglig?" />
          <Msg side="left" text="Jag är intresserad av att hyra den till ett bröllop" />
          <Msg side="right" text="Hej Anna! Ja, den är tillgänglig 😊" />
          <Msg side="left" text="Vad kul! Vilket datum tänkte du?" />
          <Msg side="right" text="Nästa lördag, den 15:e" />
          <Msg side="left" big text="Perfekt! Då kan jag boka den åt dig. Priset är 450 kr för helgen. Vill du ha leverans eller kan du hämta själv?" />
          <Msg side="left" text="Swish fungerar bra?" />
          <Msg side="right" text="Jag kan hämta själv! Swish är toppen 👍" />
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

function Msg({ side, big, text }: { side: "left" | "right"; big?: boolean; text?: string }) {
  return (
    <div className={side === "left" ? styles.msgRowLeft : styles.msgRowRight}>
      {side === "left" && <div className={styles.msgAvatar} aria-hidden="true" />}
      <div className={big ? styles.bubbleBig : styles.bubble}>
        <span className={styles.bubbleText} data-hifi-only="true">{text}</span>
      </div>
      {side === "right" && <div className={styles.msgAvatar} aria-hidden="true" />}
    </div>
  );
}
