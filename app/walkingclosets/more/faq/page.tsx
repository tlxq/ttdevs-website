"use client";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useMemo, useState } from "react";
import PhoneFrame from "../../components/PhoneFrame";
import TabBar from "../../components/TabBar";
import styles from "./faq.module.css";

type Item = { id: string; title: string; body: string };

export default function FaqPage() {
  const items: Item[] = useMemo(
    () => [
      {
        id: "1",
        title: "Lorem ipsum?",
        body: "Lorem ipsum dolor sit...\n\nLorem ipsum dolor sit...",
      },
      { id: "2", title: "Lorem ipsum", body: "Lorem ipsum dolor sit..." },
      { id: "3", title: "Lorem ipsum", body: "Lorem ipsum dolor sit..." },
      { id: "4", title: "Lorem ipsum", body: "Lorem ipsum dolor sit..." },
      { id: "5", title: "Lorem ipsum", body: "Lorem ipsum dolor sit..." },
    ],
    []
  );

  const [openId, setOpenId] = useState<string>("1");

  return (
    <PhoneFrame title="FAQ">
      <div className={styles.screen}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>FAQ</div>
        </header>

        <div className={styles.content}>
          <div className={styles.searchPill} aria-label="Search">
            <MagnifyingGlassIcon className={styles.searchIcon} aria-hidden="true" />
            <span className={styles.searchText}>Lorem ipsum dolor...</span>
          </div>

          <div className={styles.sectionLabel}>Namn lorem ipsum...</div>

          <div className={styles.accordions}>
            {items.map((it) => {
              const open = it.id === openId;
              return (
                <div key={it.id} className={styles.acc}>
                  <button
                    type="button"
                    className={styles.accHeader}
                    onClick={() => setOpenId(open ? "" : it.id)}
                  >
                    <span className={styles.accIcon} aria-hidden="true" />
                    <span className={styles.accTitle}>{it.title}</span>
                    {open ? (
                      <ChevronUpIcon className={styles.chev} aria-hidden="true" />
                    ) : (
                      <ChevronDownIcon className={styles.chev} aria-hidden="true" />
                    )}
                  </button>

                  {open && (
                    <div className={styles.accBody}>
                      {it.body.split("\n").map((line, idx) => (
                        <p key={idx} className={styles.p}>
                          {line || "\u00A0"}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className={styles.question}>Lorem ipsum?</div>

          <button
            type="button"
            className={styles.ctaRow}
            onClick={() => alert("Prototype: contact support")}
          >
            <EnvelopeIcon className={styles.mail} aria-hidden="true" />
            <span className={styles.ctaText}>CTA</span>
          </button>

          <Link className={styles.back} href="/walkingclosets/more">
            ← Back
          </Link>
        </div>

        <TabBar active="more" />
      </div>
    </PhoneFrame>
  );
}
