"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORIES, MENU_ITEMS } from "./menuData";
import styles from "./MenuBook.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function MenuBook() {
  const sectionRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const bookmarkRef = useRef<HTMLDivElement>(null);
  const gildedRightRef = useRef<HTMLDivElement>(null);
  const gildedBottomRef = useRef<HTMLDivElement>(null);
  const floatingItemsRef = useRef<HTMLDivElement>(null);
  const menuItemListRef = useRef<HTMLDivElement>(null);

  // Pick one random item per category — stable across renders
  const floatingDishes = useMemo(() => {
    // Deterministic pseudo-random based on index so it doesn't reshuffle on re-render
    return CATEGORIES.map((cat, i) => {
      const items = MENU_ITEMS.filter((m) => m.category === cat);
      const pick = items[i % items.length];
      return pick;
    }).filter(Boolean);
  }, []);

  // Pre-computed positions hugging the book edges
  const floatingPositions = useMemo(() => {
    const spots = [
      { top: "15%", left: "18%" },
      { top: "20%", left: "78%" },
      { top: "32%", left: "15%" },
      { top: "40%", left: "82%" },
      { top: "50%", left: "16%" },
      { top: "58%", left: "80%" },
      { top: "68%", left: "18%" },
      { top: "75%", left: "78%" },
      { top: "25%", left: "72%" },
      { top: "35%", left: "22%" },
      { top: "45%", left: "74%" },
      { top: "55%", left: "20%" },
      { top: "62%", left: "76%" },
      { top: "72%", left: "22%" },
      { top: "28%", left: "80%" },
      { top: "42%", left: "18%" },
      { top: "52%", left: "78%" },
      { top: "65%", left: "20%" },
      { top: "78%", left: "75%" },
      { top: "85%", left: "28%" },
      { top: "12%", left: "45%" },
      { top: "88%", left: "48%" },
    ];
    return spots;
  }, []);
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
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [showModal]);

  useEffect(() => {
    // Skip book animation on mobile
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const book = bookRef.current;
      const cover = coverRef.current;
      const spine = spineRef.current;
      const bookmark = bookmarkRef.current;
      const gildedRight = gildedRightRef.current;
      const gildedBottom = gildedBottomRef.current;
      const floatingContainer = floatingItemsRef.current;
      if (!section || !book || !cover) return;

      // Closed book occupies the right half of the container,
      // so shift the whole book left so the closed cover is screen-centered.
      gsap.set(book, { xPercent: -25, rotateX: 8, scale: 0.94, transformOrigin: "center center" });
      gsap.set(cover, { rotateY: 0, transformOrigin: "left center" });

      // Decorations hidden until the cover starts opening
      gsap.set([spine, bookmark, gildedRight, gildedBottom], { autoAlpha: 0 });

      // Floating dish names — visible from the start, will fly into the book
      const floatingEls = floatingContainer
        ? Array.from(floatingContainer.querySelectorAll("[data-float-item]")) as HTMLElement[]
        : [];

      // Calculate each item's distance to the menu item list on the right page
      const itemList = menuItemListRef.current;
      const targetRect = itemList
        ? itemList.getBoundingClientRect()
        : book.getBoundingClientRect();
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height * 0.3;

      floatingEls.forEach((el) => {
        const elRect = el.getBoundingClientRect();
        const elCenterX = elRect.left + elRect.width / 2;
        const elCenterY = elRect.top + elRect.height / 2;
        el.dataset.dx = String(targetX - elCenterX);
        el.dataset.dy = String(targetY - elCenterY);
      });

      gsap.set(floatingEls, { autoAlpha: 1, scale: 1 });

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
        .to(book, { xPercent: 0, duration: 50, ease: "power2.inOut" }, 0)
        // Spine fades in as the cover begins to lift
        .to(spine, { autoAlpha: 1, duration: 8, ease: "power2.out" }, 5)
        // Gilded edges + bookmark fade in as the cover passes the halfway point
        .to([gildedRight, gildedBottom], { autoAlpha: 1, duration: 10, ease: "power2.out" }, 20)
        .to(bookmark, { autoAlpha: 1, duration: 8, ease: "power2.out" }, 25);

      // Floating dish names — separate non-scrubbed timeline for smooth animation
      // Triggers when the book starts opening, plays independently of scroll
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          toggleActions: "play none none reverse",
        },
      })
        .to(floatingEls, {
          autoAlpha: 0,
          scale: 0.3,
          x: (_i: number, el: HTMLElement) => parseFloat(el.dataset.dx || "0"),
          y: (_i: number, el: HTMLElement) => parseFloat(el.dataset.dy || "0"),
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.08,
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative z-20 min-h-0 md:min-h-[250vh] max-md:py-16 overflow-x-clip flex-shrink-0"
      style={{ background: "linear-gradient(135deg, #0d0703 0%, #1a0f05 40%, #0a0502 100%)" }}
    >
      {/* Matching hero radial glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute" style={{ width: "55vw", height: "55vw", top: "-15vw", left: "-12vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,171,48,0.15) 0%, rgba(232,171,48,0.04) 45%, transparent 70%)", filter: "blur(90px)" }} />
        <div className="absolute" style={{ width: "50vw", height: "50vw", bottom: "-18vw", right: "-10vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,171,48,0.12) 0%, rgba(232,171,48,0.03) 50%, transparent 72%)", filter: "blur(100px)" }} />
        <div className="absolute" style={{ width: "40vw", height: "40vw", top: "30%", left: "30%", borderRadius: "50%", background: "radial-gradient(circle, rgba(232,171,48,0.08) 0%, transparent 60%)", filter: "blur(80px)" }} />
      </div>

      {/* ==================== Mobile Menu Preview ==================== */}
      <div className="md:hidden relative z-10 px-5 mx-auto max-w-md py-16">
        <div className="text-center mb-8">
          <div className={styles.modalOrnament} />
          <h2 className={styles.modalTitle}>Mr Biryani</h2>
          <p className={styles.modalSubtitle}>Royal Kitchen — Menu</p>
          <div className={styles.modalDivider} />
        </div>

        <div className={styles.menuItemList}>
          {MENU_ITEMS.filter((i) => i.category === "OG Dum Biryanis").slice(0, 3).map((item) => (
            <div key={item.name} className={styles.menuItemRow}>
              <div className={styles.menuItemInfo}>
                <h3 className={styles.menuItemName}>{item.name}</h3>
                <p className={styles.menuItemDesc}>{item.desc}</p>
              </div>
              <div className={styles.menuItemRight}>
                <span className={styles.menuItemPrice}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/menu"
          className="flex w-full items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base shadow-lg active:scale-95 transition-transform mt-8"
          style={{
            background: "linear-gradient(135deg, #E8AB30 0%, #D4951A 100%)",
            color: "#1a0f05",
            boxShadow: "0 8px 28px rgba(232, 171, 48, 0.4)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          View Full Menu
        </Link>
      </div>

      {/* ==================== Desktop Book Animation ==================== */}
      <div className="hidden md:block h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* Floating dish names around the book */}
        <div ref={floatingItemsRef} className={styles.floatingItems}>
          {floatingDishes.map((dish, i) => (
            <span
              key={i}
              data-float-item
              className={styles.floatingItem}
              style={{
                top: floatingPositions[i % floatingPositions.length].top,
                left: floatingPositions[i % floatingPositions.length].left,
              }}
            >
              <span
                className={styles.floatingItemInner}
                style={{
                  animationDelay: `${(i % 6) * 0.4}s`,
                }}
              >
                {dish.name}
              </span>
            </span>
          ))}
        </div>

        <div ref={bookRef} className={styles.book}>
          {/* Decorative spine — gold ornamental binding on the left edge */}
          <div ref={spineRef} className={styles.spine}>
            <div className={styles.spineRidge} />
            <div className={styles.spineRidge} />
            <div className={styles.spineRidge} />
            <div className={styles.spineCrest} />
          </div>

          {/* Gilded page edges — gold leaf on the right side */}
          <div ref={gildedRightRef} className={styles.gildedEdgeRight} />
          {/* Gilded page edges — gold leaf on the bottom */}
          <div ref={gildedBottomRef} className={styles.gildedEdgeBottom} />

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
            <div ref={menuItemListRef} className={styles.menuItemList}>
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

            <button className={styles.viewAllBtn} onClick={() => setShowModal(true)}>
              View Full Menu
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bookmark ribbon — hanging from between the pages */}
          <div ref={bookmarkRef} className={styles.bookmark}>
            <div className={styles.bookmarkTail} />
          </div>

          {/* Cover — starts closed over the right page, flips to the left */}
          <div ref={coverRef} className={styles.cover}>
            {/* Front of cover (visible when closed) */}
            <div className={styles.coverFront}>
              <Image
                src="/imgs/gallery/menu-cover.png"
                alt="Mr Biryani — Royal Kitchen Menu Cover"
                fill
                sizes="440px"
                className={styles.coverImage}
                priority
              />
              <Image
                src="/imgs/gallery/mrbiryani_logo_.png"
                alt="Mr Biryani logo"
                width={500}
                height={321}
                sizes="240px"
                className={styles.coverLogo}
                priority
              />
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
      </div>

      {/* ==================== Full Screen Menu Modal ==================== */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)} onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
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

