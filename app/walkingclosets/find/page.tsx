import { ChevronLeftIcon, MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import PhoneFrame from "../components/PhoneFrame";
import TabBar from "../components/TabBar";
import styles from "./find.module.css";

export default function FindPage() {
  return (
    <PhoneFrame title="Hitta kassar">
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.h1} data-lofi-only="true">Lorem ipsum</h1>
          <h1 className={styles.h1} data-hifi-only="true">Hitta Closets nära dig</h1>

          <div className={styles.searchRow}>
            <Link className={styles.backBtn} href="/walkingclosets/home" aria-label="Back">
              <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
            </Link>

            <div className={styles.searchPill}>
              <MagnifyingGlassIcon className={styles.searchIcon} aria-hidden="true" />
              <span className={styles.searchText} data-lofi-only="true">Lorem ipsum...</span>
              <span className={styles.searchText} data-hifi-only="true">Sök efter plats...</span>
            </div>
          </div>
        </header>

        {/* Map */}
        <section className={styles.mapWrap} aria-label="Map">
          <div className={styles.map} aria-hidden="true">
            {/* Lofi: simple map label */}
            <div className={styles.mapLabel} data-lofi-only="true">Lorem ipsum</div>
            {/* Hifi: GPS location text */}
            <div className={styles.mapLabel} data-hifi-only="true">Din kasse är här</div>
            <div className={styles.gpsIndicator} data-hifi-only="true" aria-hidden="true" />
          </div>

          <div className={styles.locateBtn} aria-label="Locate me">
            <MapPinIcon className={styles.locateIcon} aria-hidden="true" />
          </div>
        </section>

        {/* Results list */}
        <section className={styles.results} aria-label="Closets list">
          {/* Lofi items */}
          <div data-lofi-only="true">
            <ResultItem title="Lorem Ipsum" subtitle="Simply dummy text of the printing" />
            <ResultItem title="Lorem Ipsum" subtitle="Simply dummy text of the printing" />
            <ResultItem title="Lorem ipsum" subtitle="Simply dummy text of the printing" />
            <ResultItem title="Lorem ipsum" subtitle="Simply dummy text of the printing" />
          </div>
          
          {/* Hifi items with real content */}
          <div data-hifi-only="true">
            <ResultItem title="Södermalm - Stockholm" subtitle="15 Walking Closets tillgängliga, 2.3 km bort" />
            <ResultItem title="Vasastan - Stockholm" subtitle="8 Walking Closets tillgängliga, 3.1 km bort" />
            <ResultItem title="Östermalm - Stockholm" subtitle="12 Walking Closets tillgängliga, 4.5 km bort" />
            <ResultItem title="Gamla Stan - Stockholm" subtitle="6 Walking Closets tillgängliga, 1.8 km bort" />
          </div>
        </section>

        <TabBar active="find" />
      </div>
    </PhoneFrame>
  );
}

function ResultItem({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className={styles.item}>
      <div className={styles.itemIcon} aria-hidden="true" />
      <div className={styles.itemText}>
        <div className={styles.itemTitle}>{title}</div>
        <div className={styles.itemSub}>{subtitle}</div>
      </div>
    </div>
  );
}
