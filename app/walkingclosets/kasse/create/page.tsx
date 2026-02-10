"use client";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhoneFrame from "../../components/PhoneFrame";
import TabBar from "../../components/TabBar";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import styles from "./create-kasse.module.css";

export default function CreateKassePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageClick = () => {
    // Simulate image upload in hifi mode
    if (imagePreview) {
      setImagePreview(null);
    } else {
      // Simulate a placeholder image
      setImagePreview("/img/placeholder-vintage.jpg");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to the created kasse
    router.push("/walkingclosets/kasse/1");
  };

  return (
    <PhoneFrame title="Skapa kasse" leftSlot={<ThemeSwitcher />}>
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          <Link className={styles.backBtn} href="/walkingclosets/find" aria-label="Tillbaka">
            <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
          </Link>

          <h1 className={styles.h1} data-lofi-only="true">
            Lorem ipsum
          </h1>
          <h1 className={styles.h1} data-hifi-only="true">
            Skapa ny kasse
          </h1>
        </header>

        {/* Content */}
        <div className={styles.content}>
          {/* Lofi */}
          <div data-lofi-only="true">
            <div className={styles.lofiBlock} />
            <div className={styles.lofiBlock} />
            <div className={styles.lofiBlock} />
            <div className={styles.lofiBlockSmall} />
          </div>

          {/* Hifi */}
          <form data-hifi-only="true" className={styles.form} onSubmit={handleSubmit}>
            {/* Image upload */}
            <div
              className={styles.imageUpload}
              onClick={handleImageClick}
              role="button"
              tabIndex={0}
              aria-label="Ladda upp bild"
            >
              {imagePreview ? (
                <div className={styles.imagePreview}>
                  <div className={styles.imagePlaceholder} />
                </div>
              ) : (
                <>
                  <div className={styles.plusIcon}>
                    <PlusIcon className={styles.plusIconSvg} aria-hidden="true" />
                  </div>
                  <span className={styles.uploadText}>Lägg till bild</span>
                </>
              )}
            </div>

            {/* Name field */}
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Namn på kasse
              </label>
              <input
                id="name"
                type="text"
                className={styles.input}
                placeholder="T.ex. VintageKassen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Category field */}
            <div className={styles.field}>
              <label htmlFor="category" className={styles.label}>
                Kategori
              </label>
              <select
                id="category"
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Välj kategori</option>
                <option value="vintage">Vintage</option>
                <option value="streetwear">Streetwear</option>
                <option value="formal">Formellt</option>
                <option value="casual">Casual</option>
                <option value="sportswear">Sportkläder</option>
              </select>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting || !name || !category}
            >
              {isSubmitting ? "Skapar..." : "Skapa kasse"}
            </button>
          </form>
        </div>

        <TabBar active="find" />
      </div>
    </PhoneFrame>
  );
}
