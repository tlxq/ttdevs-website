"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useParams } from "next/navigation";
import PhoneFrame from "../../../components/PhoneFrame";
import TabBar from "../../../components/TabBar";
import styles from "./queue.module.css";

export default function QueuePage() {
  const params = useParams();
  const kasseId = params.id as string;

  return (
    <PhoneFrame title="Kasse Kö">
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          <Link
            href={`/walkingclosets/kasse/${kasseId}`}
            className={styles.backLink}
          >
            <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
            <span>Tillbaka</span>
          </Link>

          <div className={styles.titleRow}>
            <h1 className={styles.title}>Kassekön</h1>
            <div className={styles.countBadge}>32</div>
          </div>
        </header>

        {/* Queue list */}
        <section className={styles.queueList}>
          {/* Lofi */}
          <div data-lofi-only="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.lofiItem} />
            ))}
          </div>

          {/* Hifi */}
          <div data-hifi-only="true">
            <QueueItem position={1} name="Anna Andersson" joinTime="2h sedan" isYou />
            <QueueItem position={2} name="Erik Svensson" joinTime="3h sedan" />
            <QueueItem position={3} name="Maria Larsson" joinTime="5h sedan" />
            <QueueItem position={4} name="Johan Nilsson" joinTime="6h sedan" />
            <QueueItem position={5} name="Sara Persson" joinTime="8h sedan" />
            <QueueItem position={6} name="Gustav Karlsson" joinTime="10h sedan" />
            <QueueItem position={7} name="Emma Johansson" joinTime="12h sedan" />
            <QueueItem position={8} name="David Berg" joinTime="1d sedan" />
          </div>
        </section>

        <TabBar active="find" />
      </div>
    </PhoneFrame>
  );
}

function QueueItem({
  position,
  name,
  joinTime,
  isYou,
}: {
  position: number;
  name: string;
  joinTime: string;
  isYou?: boolean;
}) {
  return (
    <div className={isYou ? styles.queueItemYou : styles.queueItem}>
      <div className={styles.position}>{position}</div>
      <div className={styles.avatar} />
      <div className={styles.info}>
        <div className={styles.name}>
          {name} {isYou && <span className={styles.youBadge}>(Du)</span>}
        </div>
        <div className={styles.joinTime}>{joinTime}</div>
      </div>
    </div>
  );
}
