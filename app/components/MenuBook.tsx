"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORIES, MENU_ITEMS } from "./menuData";
import styles from "./MenuBook.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function MenuBook() {
  const sectionRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const expandBtnRef = useRef<HTMLButtonElement>(null);
  const [activeCategory, setActiveCategory] = useState("OG Dum Biryanis");
  const [showModal, setShowModal] = useState(false);
  const [modalCategory, setModalCategory] = useState("OG Dum Biryanis");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredItems = MENU_ITEMS.filter(
    (item) => item.category === activeCategory
  );

  const modalItems = MENU_ITEMS.filter(
    (item) => item.category === modalCategory
  );

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

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
          onUpdate: (self) => {
            const btn = expandBtnRef.current;
            if (!btn) return;
            if (self.progress > 0.85) {
              gsap.to(btn, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" });
            } else {
              gsap.to(btn, { autoAlpha: 0, y: 20, duration: 0.3, ease: "power2.in" });
            }
          },
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
      className="relative z-20 min-h-[250vh]"
      style={{ background: "linear-gradient(135deg, #0d0703 0%, #1a0f05 40%, #0a0502 100%)" }}
    >
      {/* Matching hero radial glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute" style={{ width: "55vw", height: "55vw", top: "-15vw", left: "-12vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,171,48,0.15) 0%, rgba(232,171,48,0.04) 45%, transparent 70%)", filter: "blur(90px)" }} />
        <div className="absolute" style={{ width: "50vw", height: "50vw", bottom: "-18vw", right: "-10vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,171,48,0.12) 0%, rgba(232,171,48,0.03) 50%, transparent 72%)", filter: "blur(100px)" }} />
        <div className="absolute" style={{ width: "40vw", height: "40vw", top: "30%", left: "30%", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,171,48,0.08) 0%, transparent 60%)", filter: "blur(80px)" }} />
      </div>

      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div ref={bookRef} className={styles.book}>
          {/* Right page — menu content (revealed under the cover) */}
          <div className={styles.pageRight}>
            <h2 className={styles.menuTitle}>Our Menu</h2>

            {/* Category dropdown */}
            <div className={styles.dropdownWrap}>
              <button
                className={styles.dropdownHeader}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className={styles.dropdownLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </svg>
                  {activeCategory}
                </span>
                <svg
                  className={`${styles.dropdownChevron} ${dropdownOpen ? styles.dropdownChevronOpen : ""}`}
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {dropdownOpen && (
                <>
                  <div className={styles.dropdownBackdrop} onClick={() => setDropdownOpen(false)} />
                  <div className={styles.dropdownPanel}>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        className={`${styles.dropdownOption} ${activeCategory === cat ? styles.dropdownOptionActive : ""}`}
                        onClick={() => {
                          setActiveCategory(cat);
                          setDropdownOpen(false);
                        }}
                      >
                        <span className={styles.dropdownOptionDot} />
                        {cat}
                        {activeCategory === cat && (
                          <svg className={styles.dropdownCheck} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Filtered menu items */}
            <div className={styles.menuItemList}>
              {filteredItems.map((item, i) => (
                <div key={i} className={styles.menuItemRow}>
                  <div className={styles.menuItemInfo}>
                    <h3 className={styles.menuItemName}>{item.name}</h3>
                    <p className={styles.menuItemDesc}>{item.desc}</p>
                  </div>
                  <span className={styles.menuItemPrice}>{item.price}</span>
                </div>
              ))}
            </div>

            <button className={styles.viewAllBtn}>
              Order Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Expand button — appears when book is fully open */}
          <button
            ref={expandBtnRef}
            className={styles.expandBtn}
            onClick={() => setShowModal(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            View Full Menu
          </button>

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

        </div>
      </div>

      {/* ==================== Full Screen Menu Modal ==================== */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              className={styles.modalClose}
              onClick={() => setShowModal(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Modal header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalOrnament} />
              <h2 className={styles.modalTitle}>Mr Biryani</h2>
              <p className={styles.modalSubtitle}>Royal Kitchen — Full Menu</p>
              <div className={styles.modalDivider} />
            </div>

            {/* Category filters */}
            <div className={styles.modalFilterRow}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.modalFilterChip} ${modalCategory === cat ? styles.modalFilterChipActive : ""}`}
                  onClick={() => setModalCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu items grid */}
            <div className={styles.modalGrid}>
              {modalItems.map((item, i) => (
                <div key={i} className={styles.modalCard}>
                  <div className={styles.modalCardInfo}>
                    <h3 className={styles.modalCardName}>{item.name}</h3>
                    <p className={styles.modalCardDesc}>{item.desc}</p>
                  </div>
                  <div className={styles.modalCardRight}>
                    <span className={styles.modalCardPrice}>{item.price}</span>
                    <button className={styles.addToCartBtn}>Add to cart</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal footer */}
            <div className={styles.modalFooter}>
              <span className={styles.modalFooterText}>
                {MENU_ITEMS.length} dishes across {CATEGORIES.length} categories
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

