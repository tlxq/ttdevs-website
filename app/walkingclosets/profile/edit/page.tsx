"use client";

import { ChevronDownIcon, PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import PhoneFrame from "../../components/PhoneFrame";
import TabBar from "../../components/TabBar";
import styles from "./edit-profile.module.css";

export default function EditProfilePage() {
  const [name] = useState("Lorem Ipsum!");
  const [status] = useState("Upphämtningsplats");
  const [address] = useState("");
  const [postal] = useState("");
  const [city] = useState("");
  const [contact] = useState("Kontaktsuppgifter");
  const [phone] = useState("");
  const [email] = useState("");

  return (
    <PhoneFrame title="Redigera profil">
      <div className={styles.screen}>
        {/* Top mini header like the wireframe */}
        <div className={styles.topRow}>
          <div className={styles.smallAvatar} aria-hidden="true" />
          <div className={styles.topTitle}>Lorem Ipsum!</div>
          <UserCircleIcon className={styles.profileIcon} aria-hidden="true" />
        </div>

        <div className={styles.content}>
          <div className={styles.profileRow}>
            <UserCircleIcon className={styles.bigAvatar} aria-hidden="true" />
            <div className={styles.profileName}>Lorem Ipsum!</div>
          </div>

          <label className={styles.label}>
            {status} <ChevronDownIcon className={styles.chev} aria-hidden="true" />
          </label>
          <div className={styles.wireInput} />

          <label className={styles.label}>Adress</label>
          <div className={styles.wireInput} />

          <div className={styles.twoCol}>
            <div>
              <label className={styles.label}>Postnummer</label>
              <div className={styles.wireInput} />
            </div>
            <div>
              <label className={styles.label}>Postort</label>
              <div className={styles.wireInput} />
            </div>
          </div>

          <label className={styles.label}>
            {contact} <ChevronDownIcon className={styles.chev} aria-hidden="true" />
          </label>
          <div className={styles.wireInput} />

          <div className={styles.inlineEditRow}>
            <span className={styles.inlineLabel}>Lorem ipsum</span>
            <PencilSquareIcon className={styles.pencil} aria-hidden="true" />
          </div>
          <div className={styles.wireInput} />
          <div className={styles.helperText}>Email</div>

          <div className={styles.inlineEditRow}>
            <span className={styles.inlineLabel}>Lorem ipsum</span>
            <PencilSquareIcon className={styles.pencil} aria-hidden="true" />
          </div>
          <div className={styles.wireInput} />

          <button className={styles.save} type="button" onClick={() => alert("Prototype: Sparad")}>
            Spara
          </button>
        </div>

        <TabBar active="home" />
      </div>
    </PhoneFrame>
  );
}
