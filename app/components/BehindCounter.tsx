"use client";

import styles from "./BehindCounter.module.css";

const BADGES = ["Handi-Sealed", "90-Min Dum", "Slow Fire"];

// "Behind the counter" — mobile-only story card pairing the steaming handi
// shot with a line from the kitchen.
export default function BehindCounter() {
  return (
    <section className={styles.section} aria-label="Behind the counter">
      <div className={styles.wrap}>
        <div className={styles.photoCard}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/imgs/mr-biryani-tradition.jpg"
            alt="Steam rising from a freshly opened handi of biryani"
            className={styles.photo}
            loading="lazy"
          />
          <div className={styles.photoScrim} />
          <span className={styles.photoTag}>From the handi</span>
        </div>

        <div className={styles.quoteCard}>
          <span className={styles.eyebrow}>Behind the Counter</span>
          <blockquote className={styles.quote}>
            &ldquo;A handi tells you when it&rsquo;s ready &mdash; you only have
            to listen. That&rsquo;s the dum way.&rdquo;
          </blockquote>
          <span className={styles.attribution}>The Kitchen, Mr Biryani</span>

          <div className={styles.badges}>
            {BADGES.map((b) => (
              <span key={b} className={styles.badge}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
