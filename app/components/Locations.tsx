"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Locations.module.css";

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS = [
  {
    name: "Mr Biryani — Scarborough",
    address: "2598 Birchmount Rd, Scarborough, ON M1T 3H1",
    hours: "11:30 AM – 11:00 PM Daily",
    openMins: 11 * 60 + 30,
    closeMins: 23 * 60,
    openLabel: "11:30 AM",
    closeLabel: "11:00 PM",
    phone: "+1 905-240-9585",
    email: "Mrbiryanica@gmail.com",
    mapQuery: "2598 Birchmount Rd, Scarborough, ON M1T 3H1",
    orderUrl: "https://mrbiryanirestaurant.smartonlineorder.com/",
  },
];

export default function Locations() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean | null>(null);

  // Live open/closed status — computed client-side so SSR markup stays stable.
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const mins = now.getHours() * 60 + now.getMinutes();
      setOpen(LOCATIONS.every((l) => mins >= l.openMins && mins < l.closeMins));
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const header = headerRef.current;
      const cards = cardsRef.current;
      if (!header || !cards) return;

      const cardEls = cards.querySelectorAll("[data-loc-card]");
      gsap.set([header, ...Array.from(cardEls)], { autoAlpha: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(header, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0)
        .to(cardEls, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.15 }, 0.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="locations" className={styles.section}>
      <div className={styles.bgGlow} />

      <div className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>Find Us</span>
          <h2 className={styles.title}>Plotting Your Next Biryani Break</h2>
          <p className={styles.subtitle}>
            Whether you&apos;re planning a cozy dinner, a festive gathering, or just
            craving that perfect plate of biryani&mdash;we&apos;re right here, ready to serve.
          </p>
          <div className={styles.ornament}>
            <div className={styles.ornamentLine} />
            <div className={styles.ornamentDot} />
            <div className={styles.ornamentLine} />
          </div>
        </div>

        {/* Location cards */}
        <div ref={cardsRef} className={styles.grid}>
          {LOCATIONS.map((loc, i) => (
            <div key={i} data-loc-card className={styles.card}>
              {/* Map iframe */}
              <div className={styles.mapWrap}>
                <iframe
                  title={`Map of ${loc.name}`}
                  className={styles.mapFrame}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(loc.mapQuery)}&z=14&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className={styles.mapOverlay} />
              </div>

              {/* Info */}
              <div className={styles.cardBody}>
                <div className={styles.cardHead}>
                  <h3 className={styles.cardTitle}>{loc.name}</h3>
                  <span
                    className={
                      open === null
                        ? styles.statusIdle
                        : open
                          ? styles.statusOpen
                          : styles.statusClosed
                    }
                  >
                    <i className={styles.statusDot} aria-hidden="true" />
                    {open === null
                      ? "Hours"
                      : open
                        ? `Open now · closes ${loc.closeLabel}`
                        : `Closed · opens ${loc.openLabel}`}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className={styles.infoText}>{loc.address}</span>
                </div>

                <div className={styles.infoRow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span className={styles.infoText}>{loc.hours}</span>
                </div>

                <div className={styles.infoRow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <a href={`tel:${loc.phone.replace(/[^+\d]/g, "")}`} className={styles.infoText}>{loc.phone}</a>
                </div>

                <div className={styles.infoRow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 6L2 7" />
                  </svg>
                  <a href={`mailto:${loc.email}`} className={styles.infoText}>{loc.email}</a>
                </div>

                <div className={styles.actions}>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directionsBtn}
                  >
                    Get Directions
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a href={`tel:${loc.phone.replace(/[^+\d]/g, "")}`} className={styles.actionBtn} aria-label={`Call ${loc.name}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </a>
                  <a
                    href={loc.orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionBtn}
                    aria-label="Order online"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <path d="M3 6h18M16 10a4 4 0 01-8 0" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
