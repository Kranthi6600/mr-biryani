"use client";

import { useState } from "react";
import styles from "./TableBooking.module.css";

const PARTY_OPTIONS = [
  { label: "2", value: "2" },
  { label: "4", value: "4" },
  { label: "6", value: "6" },
  { label: "7+", value: "7+" },
];

const TIME_OPTIONS = [
  { label: "Lunch · 12 PM", value: "12:00" },
  { label: "Dinner · 7 PM", value: "19:00" },
  { label: "Late · 9 PM", value: "21:00" },
];

// Quick-book strip (mobile only) — picks a party size & slot, prefills the
// reservation form's uncontrolled fields, then scrolls to it.
export default function TableBooking() {
  const [party, setParty] = useState("2");
  const [time, setTime] = useState("19:00");
  const [sent, setSent] = useState(false);

  const book = () => {
    const partyEl = document.getElementById("party") as HTMLSelectElement | null;
    const timeEl = document.getElementById("time") as HTMLSelectElement | null;
    const dateEl = document.getElementById("date") as HTMLInputElement | null;

    if (partyEl) {
      partyEl.value = party;
      partyEl.dispatchEvent(new Event("change"));
    }
    if (timeEl) {
      timeEl.value = time;
      timeEl.dispatchEvent(new Event("change"));
    }
    if (dateEl && !dateEl.value) dateEl.value = new Date().toISOString().slice(0, 10);

    setSent(true);
    setTimeout(() => setSent(false), 2500);
    document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.section} aria-label="Quick table booking">
      <div className={styles.card}>
        <div className={styles.head}>
          <span className={styles.eyebrow}>Book a Table</span>
          <h2 className={styles.title}>Reserve in 10 seconds</h2>
        </div>

        <div className={styles.group}>
          <span className={styles.groupLabel}>Party size</span>
          <div className={styles.chips} role="group" aria-label="Party size">
            {PARTY_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`${styles.chip} ${party === o.value ? styles.chipActive : ""}`}
                onClick={() => setParty(o.value)}
                aria-pressed={party === o.value}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.groupLabel}>Time</span>
          <div className={styles.chips} role="group" aria-label="Time slot">
            {TIME_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`${styles.chip} ${time === o.value ? styles.chipActive : ""}`}
                onClick={() => setTime(o.value)}
                aria-pressed={time === o.value}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <button type="button" className={styles.cta} onClick={book}>
          {sent ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Added — finish below
            </>
          ) : (
            <>
              Find My Table
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
