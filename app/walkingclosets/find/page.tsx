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
          <h1 className={styles.h1}>Hitta Closets nära dig</h1>

          <div className={styles.searchRow}>
            <Link className={styles.backBtn} href="/walkingclosets/home" aria-label="Back">
              <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
            </Link>

            <div className={styles.searchPill}>
              <MagnifyingGlassIcon className={styles.searchIcon} aria-hidden="true" />
              <span className={styles.searchText}>Search...</span>
            </div>
          </div>
        </header>

        {/* Map */}
        <section className={styles.mapWrap} aria-label="Map">
          <div className={styles.map} aria-hidden="true">
            {/* Fake map labels like the wireframe */}
            <div className={styles.mapLabel}>Din kasse är här</div>
          </div>

          <div className={styles.locateBtn} aria-label="Locate me">
            <MapPinIcon className={styles.locateIcon} aria-hidden="true" />
          </div>
        </section>

        {/* Results list */}
        <section className={styles.results} aria-label="Closets list">
          <ResultItem title="Lorem Ipsum" subtitle="Simply dummy text of the printing" />
          <ResultItem
            title="Lorem Ipsum"
            subtitle="Simply dummy text of the printing , Simply dummy text of the printing"
          />
          <ResultItem title="Lorem ipsum" subtitle="Simply dummy text of the printing" />
          <ResultItem title="Lorem ipsum" subtitle="Simply dummy text of the printing" />
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
