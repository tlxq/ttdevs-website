"use client";
import { ChevronLeftIcon, UserGroupIcon, ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState, use } from "react";
import PhoneFrame from "../../components/PhoneFrame";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import BottomSheet from "../../components/BottomSheet";
import styles from "./kasse.module.css";

export default function KassePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeSheet, setActiveSheet] = useState<"skip" | "leave" | "join" | null>(null);

  const handleSkip = () => {
    setActiveSheet(null);
    // Simulated action
  };

  const handleLeave = () => {
    setActiveSheet(null);
    // Simulated action - could redirect to home
  };

  const handleJoin = () => {
    setActiveSheet(null);
    // Simulated action
  };

  return (
    <PhoneFrame title="Kasse" leftSlot={<ThemeSwitcher />}>
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          <Link className={styles.backBtn} href="/walkingclosets/home" aria-label="Back to home">
            <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
          </Link>

          {/* Lofi title */}
          <h1 className={styles.h1} data-lofi-only="true">Lorem Ipsum Kasse</h1>
          
          {/* Hifi title */}
          <h1 className={styles.h1} data-hifi-only="true">VintageKassen</h1>
        </header>

        {/* Main content */}
        <div className={styles.content}>
          {/* Rating row */}
          <div className={styles.ratingRow}>
            <div className={styles.stars} aria-label="4.5 out of 5 stars">
              <span className={styles.star}>★★★★</span>
              <span className={styles.starHalf}>☆</span>
            </div>
            <span className={styles.ratingText} data-lofi-only="true">Lorem (123)</span>
            <span className={styles.ratingText} data-hifi-only="true">4.5 (89 betyg)</span>
          </div>

          {/* Members preview - clickable in hifi */}
          <div className={styles.membersSection}>
            <div className={styles.lofiMembers} data-lofi-only="true">
              <div className={styles.memberIcon} />
              <div className={styles.memberInfo}>
                <div className={styles.memberTitle}>Lorem ipsum</div>
                <div className={styles.memberCount}>32 lorem</div>
              </div>
            </div>

            <Link href={`/walkingclosets/kasse/${id}/queue`} className={styles.hifiMembers} data-hifi-only="true">
              <UserGroupIcon className={styles.memberIconHifi} aria-hidden="true" />
              <div className={styles.memberInfo}>
                <div className={styles.memberTitle}>Medlemmar</div>
                <div className={styles.memberCount}>32 personer i kön</div>
              </div>
            </Link>
          </div>

          {/* Feed cards */}
          <div className={styles.feed}>
            {/* Lofi cards */}
            <div data-lofi-only="true">
              <FeedCardLofi />
              <FeedCardLofi />
              <FeedCardLofi />
            </div>

            {/* Hifi cards */}
            <div data-hifi-only="true">
              <FeedCardHifi
                author="Emma Svensson"
                time="2 timmar sedan"
                content="Just hittat den perfekta vintagejakkan! 🧥 Så glad att jag är med i den här kassen."
                likes={12}
                comments={3}
                kasseId={id}
              />
              <FeedCardHifi
                author="Linnea Andersson"
                time="5 timmar sedan"
                content="Tips: Kolla in den nya kollektionen från 80-talet som precis kom in!"
                likes={8}
                comments={5}
                kasseId={id}
              />
              <FeedCardHifi
                author="Sofia Berg"
                time="1 dag sedan"
                content="Tack för en fantastisk upplevelse! Hittade massor av unika plagg."
                likes={24}
                comments={7}
                kasseId={id}
              />
            </div>
          </div>
        </div>

        {/* Action buttons - hifi only */}
        <div className={styles.actions} data-hifi-only="true">
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => setActiveSheet("skip")}
          >
            Hoppa över
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => setActiveSheet("leave")}
          >
            Lämna
          </button>
          <button
            type="button"
            className={styles.actionBtnPrimary}
            onClick={() => setActiveSheet("join")}
          >
            Gå med i kön
          </button>
        </div>

        {/* Bottom sheets */}
        <BottomSheet
          isOpen={activeSheet === "skip"}
          onClose={() => setActiveSheet(null)}
          title="Hoppa över"
        >
          <p className={styles.sheetText}>Hoppa över nästa kasse?</p>
          <div className={styles.sheetActions}>
            <button className={styles.sheetBtnSecondary} onClick={() => setActiveSheet(null)}>
              Avbryt
            </button>
            <button className={styles.sheetBtnPrimary} onClick={handleSkip}>
              Hoppa över
            </button>
          </div>
        </BottomSheet>

        <BottomSheet
          isOpen={activeSheet === "leave"}
          onClose={() => setActiveSheet(null)}
          title="Lämna kasse"
        >
          <p className={styles.sheetText}>Lämna kassen?</p>
          <div className={styles.sheetActions}>
            <button className={styles.sheetBtnSecondary} onClick={() => setActiveSheet(null)}>
              Avbryt
            </button>
            <button className={styles.sheetBtnPrimary} onClick={handleLeave}>
              Lämna
            </button>
          </div>
        </BottomSheet>

        <BottomSheet
          isOpen={activeSheet === "join"}
          onClose={() => setActiveSheet(null)}
          title="Gå med i kasse"
        >
          <p className={styles.sheetText}>Vill du gå med i kassen och ställa dig i kön?</p>
          <div className={styles.sheetActions}>
            <button className={styles.sheetBtnSecondary} onClick={() => setActiveSheet(null)}>
              Avbryt
            </button>
            <button className={styles.sheetBtnPrimary} onClick={handleJoin}>
              Gå med
            </button>
          </div>
        </BottomSheet>
      </div>
    </PhoneFrame>
  );
}

function FeedCardLofi() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardAvatar} />
        <div className={styles.cardMeta}>
          <div className={styles.cardAuthor}>Lorem Ipsum</div>
          <div className={styles.cardTime}>Lorem ipsum</div>
        </div>
      </div>
      <div className={styles.cardContent}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.cardAction}>
          <div className={styles.cardIcon} />
          <span>12</span>
        </div>
        <div className={styles.cardAction}>
          <div className={styles.cardIcon} />
          <span>3</span>
        </div>
      </div>
    </div>
  );
}

function FeedCardHifi({
  author,
  time,
  content,
  likes,
  comments,
  kasseId,
}: {
  author: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  kasseId: string;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardAvatar} />
        <div className={styles.cardMeta}>
          <div className={styles.cardAuthor}>{author}</div>
          <div className={styles.cardTime}>{time}</div>
        </div>
      </div>
      <div className={styles.cardContent}>{content}</div>
      <div className={styles.cardFooter}>
        <button
          type="button"
          className={`${styles.cardAction} ${liked ? styles.cardActionLiked : ""}`}
          onClick={() => setLiked(!liked)}
        >
          <HeartIcon className={styles.cardIconHifi} aria-hidden="true" />
          <span>{liked ? likes + 1 : likes}</span>
        </button>
        <Link href={`/walkingclosets/kasse/${kasseId}/comments`} className={styles.cardAction}>
          <ChatBubbleLeftIcon className={styles.cardIconHifi} aria-hidden="true" />
          <span>{comments}</span>
        </Link>
      </div>
    </div>
  );
}
