"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dishes } from "./useDishSync";
import styles from "./MenuBook.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function MenuBook() {
  const sectionRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const book = bookRef.current;
      const cover = coverRef.current;
      if (!section || !book || !cover) return;

      // Closed book occupies the right half of the container,
      // so shift the whole book left so the closed cover is screen-centered.
      gsap.set(book, { xPercent: -25, rotateX: 8, scale: 0.94, transformOrigin: "center center" });
      gsap.set(cover, { rotateY: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      tl
        // Book gently settles flat + scales up as it comes into view
        .to(book, { rotateX: 0, scale: 1, duration: 20, ease: "power2.out" }, 0)
        // Cover flips open around the spine with a natural ease
        .to(cover, { rotateY: -180, duration: 50, ease: "power2.inOut" }, 0)
        // Subtle arc: cover lifts toward viewer at mid-flip then settles
        .to(cover, { z: 60, duration: 25, ease: "power1.out" }, 0)
        .to(cover, { z: 0, duration: 25, ease: "power1.in" }, 25)
        // Book slides right so the open spread stays centered
        .to(book, { xPercent: 0, duration: 50, ease: "power2.inOut" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative z-20 min-h-[250vh] overflow-x-clip"
      style={{ background: "linear-gradient(135deg, #E8AB30 0%, #D4951A 40%, #B88015 100%)" }}
    >
      {/* Matching hero radial glows */}
      <div className="absolute pointer-events-none" style={{ width: "55vw", height: "55vw", top: "-15vw", left: "-12vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,215,90,0.4) 0%, rgba(245,194,66,0.1) 45%, transparent 70%)", filter: "blur(90px)" }} />
      <div className="absolute pointer-events-none" style={{ width: "50vw", height: "50vw", bottom: "-18vw", right: "-10vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,200,80,0.32) 0%, rgba(245,194,66,0.07) 50%, transparent 72%)", filter: "blur(100px)" }} />
      <div className="absolute pointer-events-none" style={{ width: "40vw", height: "40vw", top: "30%", left: "30%", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,215,90,0.2) 0%, transparent 60%)", filter: "blur(80px)" }} />

      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div ref={bookRef} className={styles.book}>
          {/* Right page — menu content (revealed under the cover) */}
          <div className={styles.pageRight}>
            <h2 className={styles.menuTitle}>Our Menu</h2>
            <div className={styles.dishList}>
              {dishes.map((dish, i) => (
                <div key={i} className={styles.dishItem}>
                  <div className={styles.dishNumber}>0{i + 1}</div>
                  <div className={styles.dishInfo}>
                    <h3 className={styles.dishName}>{dish.name}</h3>
                    <p className={styles.dishDesc}>{dish.overview}</p>
                    <div className={styles.dishMeta}>
                      {dish.info.map((info, j) => (
                        <span key={j} className={styles.metaTag}>
                          {info.label}: {info.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.viewAllBtn}>
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Cover — starts closed over the right page, flips to the left */}
          <div ref={coverRef} className={styles.cover}>
            {/* Front of cover (visible when closed) */}
            <div className={styles.coverFront}>
              <div className={styles.coverOrnament} />
              <h1 className={styles.coverTitle}>Mr Biryani</h1>
              <p className={styles.coverSubtitle}>Royal Kitchen</p>
              <div className={styles.coverDivider} />
              <p className={styles.coverTagline}>A Collection of</p>
              <p className={styles.coverTaglineBold}>Signature Recipes</p>
              <div className={styles.coverOrnament} />
            </div>
            {/* Back of cover (becomes the left page when open) */}
            <div className={styles.coverBack}>
              <div className={styles.insideOrnament} />
              <p className={styles.insideQuote}>
                &ldquo;Biryani is not just food, it is an emotion served on a plate.&rdquo;
              </p>
              <div className={styles.insideDivider} />
              <p className={styles.insideNote}>
                Every dish is slow-cooked in the traditional dum style, sealed
                with dough, and infused with hand-ground royal spices.
              </p>
              <div className={styles.insideOrnament} />
            </div>
          </div>

          {/* Spine shadow */}
          <div className={styles.spine} />

          {/* Stacked page edge for book thickness */}
          <div className={styles.pageStack} />
        </div>
      </div>
    </section>
  );
}

