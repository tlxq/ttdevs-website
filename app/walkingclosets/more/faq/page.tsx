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

type Item = { 
  id: string; 
  title: string; 
  body: string;
  hifiTitle?: string;
  hifiBody?: string;
};

export default function FaqPage() {
  const items: Item[] = useMemo(
    () => [
      {
        id: "1",
        title: "Lorem ipsum?",
        body: "Lorem ipsum dolor sit...\n\nLorem ipsum dolor sit...",
        hifiTitle: "Hur fungerar uthyrning?",
        hifiBody: "Du kan hyra ut dina kläder direkt från din Walking Closet. Sätt ditt eget pris och villkor.\n\nVi hanterar betalningar säkert och du får betalt direkt när uthyrningen är klar.",
      },
      { 
        id: "2", 
        title: "Lorem ipsum", 
        body: "Lorem ipsum dolor sit...",
        hifiTitle: "Vad kostar det?",
        hifiBody: "Walking Closets tar 15% provision på varje uthyrning. Du bestämmer själv priset för dina plagg.",
      },
      { 
        id: "3", 
        title: "Lorem ipsum", 
        body: "Lorem ipsum dolor sit...",
        hifiTitle: "Hur skyddas mina kläder?",
        hifiBody: "Alla användare verifieras och vi har försäkring som täcker skador och förlust.",
      },
      { 
        id: "4", 
        title: "Lorem ipsum", 
        body: "Lorem ipsum dolor sit...",
        hifiTitle: "Hur lång är uthyrningsperioden?",
        hifiBody: "Du bestämmer själv längden. Vanligast är 3-7 dagar men det går att anpassa efter behov.",
      },
      { 
        id: "5", 
        title: "Lorem ipsum", 
        body: "Lorem ipsum dolor sit...",
        hifiTitle: "Vad händer vid skador?",
        hifiBody: "Vår försäkring täcker oavsiktliga skador. Hyresgästen ansvarar för att returnera plaggen i samma skick.",
      },
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

          <div className={styles.sectionLabel} data-lofi-only="true">Namn lorem ipsum...</div>
          <div className={styles.sectionLabel} data-hifi-only="true">Vanliga frågor</div>

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
                    <span className={styles.accTitle} data-lofi-only="true">{it.title}</span>
                    <span className={styles.accTitle} data-hifi-only="true">{it.hifiTitle || it.title}</span>
                    {open ? (
                      <ChevronUpIcon className={styles.chev} aria-hidden="true" />
                    ) : (
                      <ChevronDownIcon className={styles.chev} aria-hidden="true" />
                    )}
                  </button>

                  {open && (
                    <div className={styles.accBody}>
                      <div data-lofi-only="true">
                        {it.body.split("\n").map((line, idx) => (
                          <p key={idx} className={styles.p}>
                            {line || "\u00A0"}
                          </p>
                        ))}
                      </div>
                      <div data-hifi-only="true">
                        {(it.hifiBody || it.body).split("\n").map((line, idx) => (
                          <p key={idx} className={styles.p}>
                            {line || "\u00A0"}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className={styles.question} data-lofi-only="true">Lorem ipsum?</div>
          <div className={styles.question} data-hifi-only="true">Hittade du inte svar på din fråga?</div>

          <button
            type="button"
            className={styles.ctaRow}
            onClick={() => alert("Prototype: contact support")}
          >
            <EnvelopeIcon className={styles.mail} aria-hidden="true" />
            <span className={styles.ctaText} data-lofi-only="true">CTA</span>
            <span className={styles.ctaText} data-hifi-only="true">Kontakta support</span>
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
