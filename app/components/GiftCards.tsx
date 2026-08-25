"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./GiftCards.module.css";

gsap.registerPlugin(ScrollTrigger);

const GIFT_AMOUNTS = [500, 1000, 2000, 5000];

export default function GiftCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const amountsRef = useRef<HTMLDivElement>(null);
  const [selectedAmount, setSelectedAmount] = useState(1000);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const header = headerRef.current;
      const card = cardRef.current;
      const amounts = amountsRef.current;
      if (!header || !card || !amounts) return;

      gsap.set([header, card, amounts], { autoAlpha: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(header, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0)
        .to(card, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.2)
        .to(amounts, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.4);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gift-cards" className={styles.section}>
      <div className={styles.bgGlow} />

      <div className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>Share the Royal Experience</span>
          <h2 className={styles.title}>Gift Cards</h2>
          <div className={styles.ornament}>
            <div className={styles.ornamentLine} />
            <div className={styles.ornamentDot} />
            <div className={styles.ornamentLine} />
          </div>
        </div>

        <div className={styles.layout}>
          {/* Gift card visual */}
          <div ref={cardRef} className={styles.giftCard}>
            <div className={styles.giftCardInner}>
              {/* Corner ornaments */}
              <div className={`${styles.cardCorner} ${styles.cardCornerTL}`} />
              <div className={`${styles.cardCorner} ${styles.cardCornerTR}`} />
              <div className={`${styles.cardCorner} ${styles.cardCornerBL}`} />
              <div className={`${styles.cardCorner} ${styles.cardCornerBR}`} />

              <div className={styles.giftCardTop}>
                <span className={styles.giftCardBrand}>Mr Biryani</span>
                <span className={styles.giftCardSub}>Royal Kitchen</span>
              </div>

              <div className={styles.giftCardMiddle}>
                <span className={styles.giftCardLabel}>GIFT CARD</span>
                <span className={styles.giftCardAmount}>
                  ₹{selectedAmount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className={styles.giftCardBottom}>
                <div className={styles.giftCardChip} />
                <span className={styles.giftCardNote}>A taste of tradition</span>
              </div>
            </div>
          </div>

          {/* Amount selection + CTA */}
          <div ref={amountsRef} className={styles.purchaseSection}>
            <p className={styles.purchaseDesc}>
              Perfect for any occasion — birthdays, anniversaries, or just to say
              &ldquo;let&rsquo;s eat biryani.&rdquo; Delivered instantly via email.
            </p>

            <div className={styles.amountGrid}>
              {GIFT_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  className={`${styles.amountBtn} ${selectedAmount === amt ? styles.amountBtnActive : ""}`}
                  onClick={() => setSelectedAmount(amt)}
                >
                  ₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            <button className={styles.buyBtn}>
              Purchase Gift Card
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <span>Instant email delivery</span>
              </div>
              <div className={styles.featureItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <span>Valid at all locations</span>
              </div>
              <div className={styles.featureItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <span>No expiry date</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
