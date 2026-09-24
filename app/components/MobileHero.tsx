"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./MobileHero.module.css";

const VIDEO_SRC = "/imgs/1.mp4";
const PHONE = "+19052409585";
const PHONE_LABEL = "Call";

export default function MobileHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // The source is attached here rather than in JSX so the ~2.7MB file is never
  // fetched on desktop (where this section is display:none) or for visitors who
  // asked for reduced motion. The poster carries the visual in those cases.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isSmall = window.matchMedia("(max-width: 1023px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isSmall || reduced) return;

    video.src = VIDEO_SRC;
    video.play().catch(() => {
      /* Autoplay can be refused (e.g. iOS Low Power Mode); poster remains. */
    });
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.video}
        poster="/imgs/mr-biryani-tradition.jpg"
        preload="none"
        muted
        loop
        playsInline
        autoPlay
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className={styles.scrim} />
      <div className={styles.glow} />

      <div className={styles.content}>
        <span className={styles.eyebrow}>Royal Kitchen</span>
        <h1 className={styles.title}>Mr Biryani</h1>

        <div className={styles.ornament}>
          <div className={styles.ornamentLine} />
          <div className={styles.ornamentDiamond} />
          <div className={styles.ornamentLine} />
        </div>

        <p className={styles.tagline}>
          Slow-cooked in the dum tradition &mdash; saffron, tender meat, and
          centuries of flavour in every handi.
        </p>

        <div className={styles.ctaRow}>
          <Link href="/menu" className={styles.ctaPrimary}>
            View Menu
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <a href={`tel:${PHONE}`} className={styles.ctaSecondary}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {PHONE_LABEL}
          </a>
        </div>

        <div className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollCueLabel}>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
