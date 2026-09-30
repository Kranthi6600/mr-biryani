"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";

const PHONE = "+19052409585";
const PHONE_LABEL = "+1 (905) 240-9585";

const FLOATERS = [
  { src: "/imgs/ingredients/chilli.png",  top: "2%",  left: "-6%",  width: "34%", depth: 42,  dur: 7.5, delay: 0    },
  { src: "/imgs/ingredients/tomato1.png", top: "62%", left: "78%",  width: "26%", depth: 30,  dur: 6.5, delay: 0.8  },
  { src: "/imgs/ingredients/onion.png",   top: "70%", left: "-4%",  width: "30%", depth: 34,  dur: 8,   delay: 1.4  },
  { src: "/imgs/ingredients/ing1.png",    top: "-4%", left: "70%",  width: "28%", depth: 50,  dur: 7,   delay: 0.4  },
];

const TICKER_ITEMS = [
  "Royal Chicken Biryani",
  "Mutton Shahi Biryani",
  "Chicken Mandi",
  "Tandoori Chicken",
  "Chicken 65",
  "Paneer 65",
  "Mutton Sheek Kabab",
  "Apollo Fish",
  "Royal Falooda",
  "Qubani Ka Meetha",
  "Mango Lassi",
  "Masala Dosa",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  // Pointer parallax: two CSS vars drive every floating layer via --depth,
  // so no React state churn. Skipped entirely on touch / reduced-motion.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      hero.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    const onLeave = () => {
      hero.style.setProperty("--px", "0");
      hero.style.setProperty("--py", "0");
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className={styles.hero}>
      <div className={styles.aura} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      {/* ---------- Top bar ---------- */}
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label="Mr Biryani — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/imgs/gallery/mrbiryani_logo_.png"
            alt="Mr Biryani"
            className={styles.logo}
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <a href="#process">Our Craft</a>
          <a href="#gallery">Gallery</a>
          <a href="#locations">Locations</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className={styles.topActions}>
          <a href={`tel:${PHONE}`} className={styles.navCall}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span>{PHONE_LABEL}</span>
          </a>
          <Link href="/menu" className={styles.navMenu}>Menu</Link>
        </div>
      </header>

      {/* ---------- Main stage ---------- */}
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.diamond} aria-hidden="true" />
            Regional · Royal · Real
            <span className={styles.diamond} aria-hidden="true" />
          </p>

          <h1 className={styles.title}>
            <span className={styles.titleMr}>Mr</span>
            <span className={styles.titleMain}>Biryani</span>
          </h1>

          <p className={styles.tagline}>
            Slow-cooked in the dum tradition &mdash; saffron, tender meat, and
            centuries of flavour sealed inside every handi.
          </p>

          <div className={styles.ctaRow}>
            <Link href="/menu" className={styles.ctaPrimary}>
              Explore the Menu
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a href="#reservation" className={styles.ctaSecondary}>Reserve a Table</a>
          </div>

          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dd>100+</dd>
              <dt>Signature Dishes</dt>
            </div>
            <div className={styles.stat}>
              <dd>20+</dd>
              <dt>Categories</dt>
            </div>
            <div className={styles.stat}>
              <dd>Dum</dd>
              <dt>Sealed &amp; Slow-Cooked</dt>
            </div>
          </dl>
        </div>

        <div className={styles.stage}>
          <div className={styles.halo} aria-hidden="true" />
          <div className={styles.ringOuter} aria-hidden="true" />
          <div className={styles.ringInner} aria-hidden="true" />

          {FLOATERS.map((f, i) => (
            <div
              key={i}
              className={styles.float}
              aria-hidden="true"
              style={{
                top: f.top,
                left: f.left,
                width: f.width,
                "--depth": f.depth,
                "--dur": `${f.dur}s`,
                "--del": `${f.delay}s`,
              } as CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt="" className={styles.floatImg} />
            </div>
          ))}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/imgs/hero-plate/plate1.png"
            alt="Royal Chicken Biryani served on an ornate brass handi"
            className={styles.plate}
            fetchPriority="high"
          />

          <div className={styles.dishChip}>
            <span className={styles.chipStar} aria-hidden="true">★</span>
            <span className={styles.chipText}>
              <small>Signature</small>
              Royal Chicken Biryani
            </span>
            <span className={styles.chipPrice}>₹380</span>
          </div>
        </div>
      </div>

      {/* ---------- Scroll cue (desktop) ---------- */}
      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollLine} />
        Scroll
      </div>

      {/* ---------- Dish marquee ---------- */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((name, i) => (
            <span key={i} className={styles.tickerItem}>
              {name}
              <i className={styles.tickerDiamond} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
