"use client";
import { ChevronLeftIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PhoneFrame from "../../../components/PhoneFrame";
import TabBar from "../../../components/TabBar";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import styles from "./queue.module.css";

export default function QueuePage({ params }: { params: { id: string } }) {
  const kasseId = params.id;

  return (
    <PhoneFrame title="Kö" leftSlot={<ThemeSwitcher />}>
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          <Link
            className={styles.backBtn}
            href={`/walkingclosets/kasse/${kasseId}`}
            aria-label="Tillbaka"
          >
            <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
          </Link>

          <h1 className={styles.h1} data-lofi-only="true">
            Lorem ipsum
          </h1>
          <h1 className={styles.h1} data-hifi-only="true">
            Kassekön
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
            {/* Count badge */}
            <div className={styles.countBadge}>
              <UserGroupIcon className={styles.countIcon} aria-hidden="true" />
              <span className={styles.countText}>32 medlemmar</span>
            </div>

            {/* Members list */}
            <div className={styles.members}>
              {Array.from({ length: 12 }, (_, i) => (
                <MemberItem
                  key={i}
                  name={getMemberName(i)}
                  position={i + 1}
                  status={i < 3 ? "active" : "waiting"}
                />
              ))}
            </div>

            {/* Back link */}
            <Link href={`/walkingclosets/kasse/${kasseId}`} className={styles.backLink}>
              Tillbaka
            </Link>
          </div>
        </div>

        <TabBar active="find" />
      </div>
    </PhoneFrame>
  );
}

function MemberItem({
  name,
  position,
  status,
}: {
  name: string;
  position: number;
  status: "active" | "waiting";
}) {
  return (
    <div className={`${styles.memberItem} ${status === "active" ? styles.active : ""}`}>
      <div className={styles.memberLeft}>
        <div className={styles.position}>{position}</div>
        <div className={styles.avatar} />
        <div className={styles.name}>{name}</div>
      </div>
      {status === "active" && <div className={styles.badge}>Aktiv</div>}
    </div>
  );
}

function getMemberName(index: number): string {
  const names = [
    "Linda",
    "Erik",
    "Sara",
    "Johan",
    "Emma",
    "Lucas",
    "Amanda",
    "Oscar",
    "Ebba",
    "William",
    "Alice",
    "Hugo",
  ];
  return names[index] || `Medlem ${index + 1}`;
}
