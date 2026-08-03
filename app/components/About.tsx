"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const TITLE_PARTS = [
  { text: "Mr.", small: false },
  { text: " Biryani", small: false },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const promiseRef = useRef<HTMLParagraphElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const flourishRef = useRef<HTMLDivElement>(null);

  const letters = useMemo(() => {
    const items: { char: string; small: boolean }[] = [];
    for (const part of TITLE_PARTS) {
      for (const char of part.text) {
        items.push({ char, small: part.small });
      }
    }
    return items;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = titleRef.current;
      const section = sectionRef.current;
      if (!title || !section) return;

      const letterEls = title.querySelectorAll(`.${styles.letter}`);
      if (!letterEls.length) return;

      const isMobile = window.innerWidth < 640;

      gsap.set(letterEls, {
        z: isMobile ? 200 : 800,
        opacity: 0,
        rotateX: isMobile ? -45 : -90,
        scale: isMobile ? 1.3 : 2,
        transformOrigin: "center center",
        filter: isMobile ? "blur(4px)" : "blur(8px)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 5%",
          scrub: 5,
        },
      });

      tl.to(letterEls, {
        z: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
        ease: "expo.out",
        stagger: { each: 0.25, from: "start" },
      });

      // --- Rest of content: sequential fade-up reveals ---
      const contentEls = [
        headerRef.current,
        ornamentRef.current,
        bodyRef.current,
        taglineRef.current,
        promiseRef.current,
        flourishRef.current,
      ].filter(Boolean);

      gsap.set(contentEls, { y: 80, opacity: 0, scale: 0.95, filter: "blur(10px)" });

      const testimonialEls = testimonialsRef.current
        ? Array.from(testimonialsRef.current.querySelectorAll(`.${styles.testimonial}`))
        : [];
      gsap.set(testimonialEls, { y: 60, opacity: 0, scale: 0.9, filter: "blur(8px)" });

      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 40%",
          end: "bottom 80%",
          scrub: 4,
        },
      });

      contentTl
        .to(headerRef.current, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", ease: "expo.out", duration: 1.2 }, 0)
        .to(ornamentRef.current, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", ease: "expo.out", duration: 1.2 }, 0.25)
        .to(bodyRef.current, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", ease: "expo.out", duration: 1.2 }, 0.5)
        .to(taglineRef.current, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", ease: "expo.out", duration: 1.2 }, 0.8)
        .to(promiseRef.current, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", ease: "expo.out", duration: 1.2 }, 1.0)
        .to(testimonialEls, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", ease: "back.out(1.2)", duration: 1.2, stagger: 0.3 }, 1.3)
        .to(flourishRef.current, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", ease: "expo.out", duration: 1.2 }, 2.4);

      // Parallax depth + spotlight on testimonial hover (desktop only)
      if (window.innerWidth >= 768) {
        (testimonialEls as HTMLElement[]).forEach((card) => {
        const spotlight = card.querySelector(`.${styles.spotlight}`) as HTMLElement | null;
        const quote = card.querySelector(`.${styles.quoteMark}`) as HTMLElement | null;
        const text = card.querySelector(`.${styles.testimonialText}`) as HTMLElement | null;
        const author = card.querySelector(`.${styles.testimonialAuthor}`) as HTMLElement | null;

        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          const cx = px - 0.5;
          const cy = py - 0.5;

          if (spotlight) {
            gsap.to(spotlight, {
              opacity: 1,
              background: `radial-gradient(circle 200px at ${px * 100}% ${py * 100}%, rgba(245, 194, 66, 0.12) 0%, transparent 70%)`,
              duration: 0.3,
              ease: "power2.out",
            });
          }
          if (quote) gsap.to(quote, { x: cx * 20, y: cy * 16, duration: 0.5, ease: "power3.out" });
          if (text) gsap.to(text, { x: cx * 8, y: cy * 6, duration: 0.5, ease: "power3.out" });
          if (author) gsap.to(author, { x: cx * 4, y: cy * 3, duration: 0.5, ease: "power3.out" });
        });

        card.addEventListener("mouseleave", () => {
          if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.5, ease: "power2.out" });
          if (quote) gsap.to(quote, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
          if (text) gsap.to(text, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
          if (author) gsap.to(author, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
        });
      });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      {/* Background glows */}
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />

      <div className={styles.container}>
        {/* Header label */}
        <div ref={headerRef} className={styles.headerRow}>
          <div className={styles.headerLine} />
          <span className={styles.headerLabel}>Our Story</span>
          <div className={styles.headerLine} />
        </div>

        {/* Title */}
        <h2 ref={titleRef} className={styles.title}>
          {letters.map((l, i) => (
            <span
              key={i}
              className={`${styles.letter} ${l.small ? styles.letterSmall : ""}`}
            >
              {l.char === " " ? "\u00A0" : l.char}
            </span>
          ))}
        </h2>

        {/* Ornament divider */}
        <div ref={ornamentRef} className={styles.ornament}>
          <div className={styles.ornamentLine} />
          <div className={styles.ornamentDot} />
          <div className={styles.ornamentDiamond} />
          <div className={styles.ornamentDot} />
          <div className={styles.ornamentLine} />
        </div>

        {/* Body text */}
        <p ref={bodyRef} className={styles.bodyText}>
          At <span className={styles.bodyTextBold}>Mr. Biryani</span>, every dish is a journey
          &mdash; rooted in tradition, layered with flavor, and served with pride.
          From royal kitchens to street-side spice trails, we bring India&rsquo;s
          culinary soul to your plate.
        </p>

        {/* Tagline */}
        <div ref={taglineRef} className={styles.taglineRow}>
          <span className={styles.taglineItem}>Regional.</span>
          <div className={styles.taglineDivider} />
          <span className={styles.taglineItem}>Royal.</span>
          <div className={styles.taglineDivider} />
          <span className={styles.taglineItem}>Real.</span>
        </div>
        <p ref={promiseRef} className={styles.taglinePromise}>
          That&rsquo;s not just our tagline &mdash; it&rsquo;s our promise.
        </p>

        {/* Testimonials */}
        <div ref={testimonialsRef} className={styles.testimonials}>
          <div className={styles.testimonial}>
            <div className={styles.spotlight} />
            <div className={styles.quoteMark}>&ldquo;</div>
            <p className={styles.testimonialText}>
              The biryani here is nothing short of magical. Every bite transports
              you to the royal kitchens of Hyderabad. The flavors are layered,
              deep, and unforgettable.
            </p>
            <div className={styles.testimonialAuthor}>
              <span className={styles.authorName}>Arjun Mehta</span>
              <span className={styles.authorRole}>Food Critic, Mumbai</span>
            </div>
          </div>

          <div className={styles.testimonial}>
            <div className={styles.spotlight} />
            <div className={styles.quoteMark}>&ldquo;</div>
            <p className={styles.testimonialText}>
              I&rsquo;ve traveled across India for biryani, and Mr. Biryani stands
              among the finest. The dum cooking technique seals in every aroma,
              every spice. Pure perfection on a plate.
            </p>
            <div className={styles.testimonialAuthor}>
              <span className={styles.authorName}>Priya Nair</span>
              <span className={styles.authorRole}>Culinary Blogger, Delhi</span>
            </div>
          </div>

          <div className={styles.testimonial}>
            <div className={styles.spotlight} />
            <div className={styles.quoteMark}>&ldquo;</div>
            <p className={styles.testimonialText}>
              A truly royal experience. The saffron, the slow-cooked meat, the
              fragrant rice &mdash; it&rsquo;s clear that every recipe has been
              perfected over generations. This is biryani the way it was meant to be.
            </p>
            <div className={styles.testimonialAuthor}>
              <span className={styles.authorName}>Vikram Reddy</span>
              <span className={styles.authorRole}>Chef &amp; Restaurateur, Bangalore</span>
            </div>
          </div>
        </div>

        {/* Bottom flourish */}
        <div ref={flourishRef} className={styles.flourish}>
          <div className={styles.flourishLine} />
          <div className={styles.flourishDot} />
          <div className={styles.flourishDot} />
          <div className={styles.flourishDot} />
          <div className={styles.flourishLine} />
        </div>
      </div>
    </section>
  );
}
