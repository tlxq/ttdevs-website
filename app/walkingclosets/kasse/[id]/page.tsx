"use client";
import {
  ChatBubbleLeftIcon,
  ChevronLeftIcon,
  StarIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import PhoneFrame from "../../components/PhoneFrame";
import TabBar from "../../components/TabBar";
import BottomSheet from "../../components/BottomSheet";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import styles from "./kasse.module.css";

export default function KassePage({ params }: { params: { id: string } }) {
  const [joinQueueOpen, setJoinQueueOpen] = useState(false);
  const [leaveKasseOpen, setLeaveKasseOpen] = useState(false);
  const [skipNextOpen, setSkipNextOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const kasseId = params.id;

  const handleJoinQueue = () => {
    setIsMember(true);
    setJoinQueueOpen(false);
  };

  const handleLeaveKasse = () => {
    setIsMember(false);
    setLeaveKasseOpen(false);
  };

  return (
    <PhoneFrame title="Kasse" leftSlot={<ThemeSwitcher />}>
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          <Link className={styles.backBtn} href="/walkingclosets/find" aria-label="Tillbaka">
            <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
          </Link>

          <h1 className={styles.h1} data-lofi-only="true">
            Lorem ipsum
          </h1>
          <h1 className={styles.h1} data-hifi-only="true">
            VintageKassen
          </h1>
        </header>

        {/* Content */}
        <div className={styles.content}>
          {/* Lofi */}
          <div data-lofi-only="true">
            <div className={styles.lofiBlock} />
            <div className={styles.lofiBlock} />
            <div className={styles.lofiBlock} />
          </div>

          {/* Hifi */}
          <div data-hifi-only="true">
            {/* Rating */}
            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} className={styles.starIcon} aria-hidden="true" />
                ))}
              </div>
              <span className={styles.ratingText}>(127 omdömen)</span>
            </div>

            {/* Members preview */}
            <div className={styles.membersRow}>
              <div className={styles.avatars}>
                <div className={styles.avatar} />
                <div className={styles.avatar} />
                <div className={styles.avatar} />
                <div className={styles.avatar} />
              </div>
              <Link href={`/walkingclosets/kasse/${kasseId}/queue`} className={styles.membersBtn}>
                <UserGroupIcon className={styles.membersIcon} aria-hidden="true" />
                <span className={styles.membersCount}>32</span>
              </Link>
            </div>

            {/* Feed cards */}
            <div className={styles.feed}>
              <FeedCard
                author="Linda"
                time="2 tim sedan"
                content="Hittade den perfekta vintageväskan! ✨"
                likes={24}
              />
              <FeedCard
                author="Erik"
                time="5 tim sedan"
                content="Vilka är intresserade av ett gruppköp av vintagesneakers?"
                likes={12}
              />
              <FeedCard
                author="Sara"
                time="1 dag sedan"
                content="Tack för att ni välkomnade mig till kassen! 💕"
                likes={38}
              />
            </div>

            {/* CTA Row */}
            <div className={styles.ctaRow}>
              {!isMember ? (
                <button
                  type="button"
                  className={styles.ctaBtn}
                  onClick={() => setJoinQueueOpen(true)}
                >
                  Gå med i kassen
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className={styles.ctaBtnSecondary}
                    onClick={() => setLeaveKasseOpen(true)}
                  >
                    Lämna kassen
                  </button>
                  <button
                    type="button"
                    className={styles.ctaBtnSecondary}
                    onClick={() => setSkipNextOpen(true)}
                  >
                    Hoppa över nästa
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <TabBar active="find" />

        {/* Modals */}
        <BottomSheet
          isOpen={joinQueueOpen}
          onClose={() => setJoinQueueOpen(false)}
          title="Gå med i kassen"
        >
          <p className={styles.modalText}>
            Vill du gå med i kassen och ställa dig i kön?
          </p>
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.modalBtnSecondary}
              onClick={() => setJoinQueueOpen(false)}
            >
              Avbryt
            </button>
            <button type="button" className={styles.modalBtn} onClick={handleJoinQueue}>
              Gå med
            </button>
          </div>
        </BottomSheet>

        <BottomSheet
          isOpen={leaveKasseOpen}
          onClose={() => setLeaveKasseOpen(false)}
          title="Lämna kassen"
        >
          <p className={styles.modalText}>
            Är du säker på att du vill lämna kassen?
          </p>
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.modalBtnSecondary}
              onClick={() => setLeaveKasseOpen(false)}
            >
              Avbryt
            </button>
            <button type="button" className={styles.modalBtn} onClick={handleLeaveKasse}>
              Lämna
            </button>
          </div>
        </BottomSheet>

        <BottomSheet
          isOpen={skipNextOpen}
          onClose={() => setSkipNextOpen(false)}
          title="Hoppa över nästa"
        >
          <p className={styles.modalText}>
            Är du säker på att du vill hoppa över nästa kasse?
          </p>
          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.modalBtnSecondary}
              onClick={() => setSkipNextOpen(false)}
            >
              Avbryt
            </button>
            <button type="button" className={styles.modalBtn} onClick={() => setSkipNextOpen(false)}>
              Hoppa över
            </button>
          </div>
        </BottomSheet>
      </div>
    </PhoneFrame>
  );
}

function FeedCard({
  author,
  time,
  content,
  likes,
}: {
  author: string;
  time: string;
  content: string;
  likes: number;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.feedCard}>
      <div className={styles.feedHeader}>
        <div className={styles.feedAvatar} />
        <div className={styles.feedMeta}>
          <div className={styles.feedAuthor}>{author}</div>
          <div className={styles.feedTime}>{time}</div>
        </div>
      </div>
      <div className={styles.feedContent}>{content}</div>
      <div className={styles.feedFooter}>
        <button
          type="button"
          className={`${styles.likeBtn} ${liked ? styles.liked : ""}`}
          onClick={() => setLiked(!liked)}
        >
          <HeartIcon className={styles.heartIcon} aria-hidden="true" />
          <span>{liked ? likes + 1 : likes}</span>
        </button>
        <Link href={`/walkingclosets/kasse/${1}/comments`} className={styles.commentBtn}>
          <ChatBubbleLeftIcon className={styles.commentIcon} aria-hidden="true" />
          <span>Kommentera</span>
        </Link>
      </div>
    </div>
  );
}
