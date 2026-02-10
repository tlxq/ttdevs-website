"use client";

import { ChatBubbleLeftIcon, StarIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import PhoneFrame from "../../components/PhoneFrame";
import TabBar from "../../components/TabBar";
import BottomSheet from "../../components/BottomSheet";
import styles from "./kasse.module.css";

export default function KassePage() {
  const params = useParams();
  const router = useRouter();
  const kasseId = params.id as string;

  const [joinSheetOpen, setJoinSheetOpen] = useState(false);
  const [leaveSheetOpen, setLeaveSheetOpen] = useState(false);
  const [skipSheetOpen, setSkipSheetOpen] = useState(false);

  const handleJoinQueue = () => {
    setJoinSheetOpen(false);
    // Simulated action
    alert("Du har gått med i kön!");
  };

  const handleLeaveKasse = () => {
    setLeaveSheetOpen(false);
    alert("Du har lämnat kassen");
  };

  const handleSkipNext = () => {
    setSkipSheetOpen(false);
    alert("Du har hoppat över nästa kasse");
  };

  return (
    <PhoneFrame title={`Kasse ${kasseId}`}>
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          {/* Lofi */}
          <h1 className={styles.title} data-lofi-only="true">
            Lorem Ipsum
          </h1>

          {/* Hifi */}
          <div data-hifi-only="true">
            <h1 className={styles.title}>VintageKassen</h1>
            
            {/* Rating row */}
            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <StarIcon key={n} className={styles.star} aria-hidden="true" />
                ))}
              </div>
              <span className={styles.ratingCount}>(247)</span>
            </div>

            {/* Members preview */}
            <div className={styles.membersRow}>
              <div className={styles.memberAvatars}>
                <div className={styles.memberAvatar} />
                <div className={styles.memberAvatar} />
                <div className={styles.memberAvatar} />
              </div>
              <button
                type="button"
                className={styles.membersButton}
                onClick={() => router.push(`/walkingclosets/kasse/${kasseId}/queue`)}
              >
                <UserGroupIcon className={styles.membersIcon} aria-hidden="true" />
                <span className={styles.memberCount}>32</span>
              </button>
            </div>
          </div>
        </header>

        {/* Feed / Content */}
        <section className={styles.feed}>
          {/* Lofi blocks */}
          <div data-lofi-only="true">
            <div className={styles.lofiBlock} />
            <div className={styles.lofiBlock} />
            <div className={styles.lofiBlock} />
          </div>

          {/* Hifi feed cards */}
          <div data-hifi-only="true">
            <FeedCard
              author="Anna M."
              time="2h sedan"
              text="Hittade en fantastisk vintage klänning här igår! Perfekt till bröllopet nästa vecka. 🥰"
            />
            <FeedCard
              author="Erik S."
              time="5h sedan"
              text="Älskar konceptet! Så mycket enklare än att leta i vanliga second hand butiker."
            />
            <FeedCard
              author="Sara L."
              time="1d sedan"
              text="Tack för en underbar upplevelse! Servicen var toppen och jag hittade precis vad jag sökte."
            />
          </div>
        </section>

        {/* CTA buttons - Hifi only */}
        <div className={styles.ctaRow} data-hifi-only="true">
          <button
            type="button"
            className={styles.ctaButton}
            onClick={() => setJoinSheetOpen(true)}
          >
            Gå med i kön
          </button>
          <button
            type="button"
            className={styles.ctaSecondary}
            onClick={() => router.push(`/walkingclosets/kasse/${kasseId}/comments`)}
          >
            <ChatBubbleLeftIcon className={styles.ctaIcon} aria-hidden="true" />
            Kommentarer
          </button>
        </div>

        {/* Action buttons - Hifi only */}
        <div className={styles.actionRow} data-hifi-only="true">
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => setLeaveSheetOpen(true)}
          >
            Lämna kassen
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => setSkipSheetOpen(true)}
          >
            Hoppa över nästa
          </button>
        </div>

        <TabBar active="find" />

        {/* Bottom sheets - Hifi only */}
        <BottomSheet
          isOpen={joinSheetOpen}
          onClose={() => setJoinSheetOpen(false)}
          title="Gå med i kön"
        >
          <div className={styles.sheetText}>
            Vill du gå med i kassen och ställa dig i kön?
          </div>
          <div className={styles.sheetButtons}>
            <button
              type="button"
              className={styles.sheetBtnPrimary}
              onClick={handleJoinQueue}
            >
              Ja, gå med
            </button>
            <button
              type="button"
              className={styles.sheetBtnSecondary}
              onClick={() => setJoinSheetOpen(false)}
            >
              Avbryt
            </button>
          </div>
        </BottomSheet>

        <BottomSheet
          isOpen={leaveSheetOpen}
          onClose={() => setLeaveSheetOpen(false)}
          title="Lämna kassen"
        >
          <div className={styles.sheetText}>
            Är du säker på att du vill lämna kassen?
          </div>
          <div className={styles.sheetButtons}>
            <button
              type="button"
              className={styles.sheetBtnDanger}
              onClick={handleLeaveKasse}
            >
              Ja, lämna
            </button>
            <button
              type="button"
              className={styles.sheetBtnSecondary}
              onClick={() => setLeaveSheetOpen(false)}
            >
              Avbryt
            </button>
          </div>
        </BottomSheet>

        <BottomSheet
          isOpen={skipSheetOpen}
          onClose={() => setSkipSheetOpen(false)}
          title="Hoppa över nästa"
        >
          <div className={styles.sheetText}>
            Är du säker på att du vill hoppa över nästa kasse?
          </div>
          <div className={styles.sheetButtons}>
            <button
              type="button"
              className={styles.sheetBtnPrimary}
              onClick={handleSkipNext}
            >
              Ja, hoppa över
            </button>
            <button
              type="button"
              className={styles.sheetBtnSecondary}
              onClick={() => setSkipSheetOpen(false)}
            >
              Avbryt
            </button>
          </div>
        </BottomSheet>
      </div>
    </PhoneFrame>
  );
}

function FeedCard({ author, time, text }: { author: string; time: string; text: string }) {
  return (
    <article className={styles.feedCard}>
      <div className={styles.feedHeader}>
        <div className={styles.feedAvatar} />
        <div className={styles.feedMeta}>
          <div className={styles.feedAuthor}>{author}</div>
          <div className={styles.feedTime}>{time}</div>
        </div>
      </div>
      <p className={styles.feedText}>{text}</p>
    </article>
  );
}
