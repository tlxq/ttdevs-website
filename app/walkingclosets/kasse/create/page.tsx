"use client";

import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhoneFrame from "../../components/PhoneFrame";
import TabBar from "../../components/TabBar";
import styles from "./create-kasse.module.css";

export default function CreateKassePage() {
  const router = useRouter();
  const [kasseName, setKasseName] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated submission
    setTimeout(() => {
      router.push("/walkingclosets/kasse/1");
    }, 1000);
  };

  return (
    <PhoneFrame title="Skapa Kasse">
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          <Link href="/walkingclosets/find" className={styles.backLink}>
            <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
            <span>Tillbaka</span>
          </Link>

          <h1 className={styles.title} data-lofi-only="true">
            Lorem Ipsum
          </h1>
          <h1 className={styles.title} data-hifi-only="true">
            Skapa din egen kasse
          </h1>
        </header>

        {/* Form */}
        <section className={styles.formSection}>
          {/* Lofi */}
          <div data-lofi-only="true">
            <div className={styles.lofiBlock} />
            <div className={styles.lofiBlock} />
            <div className={styles.lofiBlock} />
            <div className={styles.lofiBlockLarge} />
          </div>

          {/* Hifi */}
          <form onSubmit={handleSubmit} data-hifi-only="true">
            {/* Image upload placeholder */}
            <div className={styles.imageUpload}>
              <div className={styles.imagePlaceholder}>
                <PlusIcon className={styles.plusIcon} aria-hidden="true" />
                <span className={styles.imageText}>Lägg till bild</span>
              </div>
            </div>

            {/* Name field */}
            <div className={styles.formGroup}>
              <label htmlFor="kasse-name" className={styles.label}>
                Namn på kasse
              </label>
              <input
                id="kasse-name"
                type="text"
                value={kasseName}
                onChange={(e) => setKasseName(e.target.value)}
                placeholder="T.ex. VintageKassen"
                className={styles.input}
                required
              />
            </div>

            {/* Category field */}
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>
                Kategori
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.select}
                required
              >
                <option value="">Välj kategori</option>
                <option value="vintage">Vintage</option>
                <option value="modern">Modern</option>
                <option value="streetwear">Streetwear</option>
                <option value="formal">Formell</option>
                <option value="casual">Casual</option>
              </select>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || !kasseName || !category}
            >
              {isSubmitting ? "Skapar..." : "Skapa kasse"}
            </button>
          </form>
        </section>

        <TabBar active="find" />
      </div>
    </PhoneFrame>
  );
}
