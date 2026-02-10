"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PhoneFrame from "../../../components/PhoneFrame";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import styles from "./queue.module.css";

export default function QueuePage({ params }: { params: { id: string } }) {
  return (
    <PhoneFrame title="Kassekön" leftSlot={<ThemeSwitcher />}>
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          <Link className={styles.backBtn} href={`/walkingclosets/kasse/${params.id}`} aria-label="Back to kasse">
            <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
          </Link>
          <h1 className={styles.h1}>Kassekön</h1>
          <div className={styles.badge} data-hifi-only="true">32</div>
        </header>

        {/* Back link */}
        <div className={styles.backLinkWrap}>
          <Link href={`/walkingclosets/kasse/${params.id}`} className={styles.backLink}>
            <span data-lofi-only="true">← Lorem</span>
            <span data-hifi-only="true">← Tillbaka</span>
          </Link>
        </div>

        {/* Queue list */}
        <div className={styles.content}>
          {/* Lofi list */}
          <div data-lofi-only="true">
            <QueueItemLofi position={1} />
            <QueueItemLofi position={2} />
            <QueueItemLofi position={3} />
            <QueueItemLofi position={4} />
            <QueueItemLofi position={5} />
            <QueueItemLofi position={6} />
            <QueueItemLofi position={7} />
            <QueueItemLofi position={8} />
          </div>

          {/* Hifi list */}
          <div data-hifi-only="true">
            <QueueItemHifi position={1} name="Emma Svensson" joinedTime="Gick med för 2 dagar sedan" />
            <QueueItemHifi position={2} name="Linnea Andersson" joinedTime="Gick med för 5 dagar sedan" />
            <QueueItemHifi position={3} name="Sofia Berg" joinedTime="Gick med för 1 vecka sedan" />
            <QueueItemHifi position={4} name="Olivia Karlsson" joinedTime="Gick med för 2 veckor sedan" />
            <QueueItemHifi position={5} name="Maja Nilsson" joinedTime="Gick med för 2 veckor sedan" />
            <QueueItemHifi position={6} name="Ella Eriksson" joinedTime="Gick med för 3 veckor sedan" />
            <QueueItemHifi position={7} name="Wilma Larsson" joinedTime="Gick med för 3 veckor sedan" />
            <QueueItemHifi position={8} name="Alva Olsson" joinedTime="Gick med för 1 månad sedan" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function QueueItemLofi({ position }: { position: number }) {
  return (
    <div className={styles.item}>
      <div className={styles.position}>{position}</div>
      <div className={styles.avatar} />
      <div className={styles.info}>
        <div className={styles.name}>Lorem Ipsum</div>
        <div className={styles.time}>Lorem ipsum dolor</div>
      </div>
    </div>
  );
}

function QueueItemHifi({ position, name, joinedTime }: { position: number; name: string; joinedTime: string }) {
  return (
    <div className={styles.item}>
      <div className={styles.position}>{position}</div>
      <div className={styles.avatar} />
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.time}>{joinedTime}</div>
      </div>
    </div>
  );
}
