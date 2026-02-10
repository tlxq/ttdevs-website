"use client";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import PhoneFrame from "../../components/PhoneFrame";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import styles from "./create.module.css";

export default function CreateKassePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to the created kasse (id=1 as per requirements)
      router.push("/walkingclosets/kasse/1");
    }, 800);
  };

  return (
    <PhoneFrame title="Skapa kasse" leftSlot={<ThemeSwitcher />}>
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          <Link className={styles.backBtn} href="/walkingclosets/home" aria-label="Back to home">
            <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
          </Link>

          {/* Lofi title */}
          <h1 className={styles.h1} data-lofi-only="true">Lorem Ipsum</h1>

          {/* Hifi title */}
          <h1 className={styles.h1} data-hifi-only="true">Skapa ny kasse</h1>
        </header>

        {/* Form content */}
        <div className={styles.content}>
          {/* Lofi form */}
          <div data-lofi-only="true">
            <div className={styles.lofiFormGroup}>
              <div className={styles.lofiLabel}>Lorem ipsum</div>
              <div className={styles.lofiInput} />
            </div>
            <div className={styles.lofiFormGroup}>
              <div className={styles.lofiLabel}>Lorem ipsum</div>
              <div className={styles.lofiInput} />
            </div>
            <div className={styles.lofiFormGroup}>
              <div className={styles.lofiLabel}>Lorem ipsum</div>
              <div className={styles.lofiImagePicker}>
                <div className={styles.lofiPlus} />
              </div>
            </div>
            <div className={styles.lofiButton} />
          </div>

          {/* Hifi form */}
          <form onSubmit={handleSubmit} data-hifi-only="true">
            <div className={styles.formGroup}>
              <label htmlFor="kasse-name" className={styles.label}>
                Namn på kasse
              </label>
              <input
                id="kasse-name"
                type="text"
                className={styles.input}
                placeholder="T.ex. VintageKassen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="kasse-category" className={styles.label}>
                Kategori
              </label>
              <select
                id="kasse-category"
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Välj kategori</option>
                <option value="vintage">Vintage</option>
                <option value="casual">Casual</option>
                <option value="formal">Formellt</option>
                <option value="sport">Sport</option>
                <option value="accessories">Accessoarer</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Bild</label>
              <div className={styles.imagePicker}>
                <PlusIcon className={styles.plusIcon} aria-hidden="true" />
                <span className={styles.imageText}>Lägg till bild</span>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting || !name.trim()}>
              {isSubmitting ? "Skapar..." : "Skapa kasse"}
            </button>
          </form>
        </div>
      </div>
    </PhoneFrame>
  );
}
