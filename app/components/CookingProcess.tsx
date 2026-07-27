"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CookingProcess.module.css";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Marinate",
    desc: "Tender meat soaked in yogurt, ginger-garlic, and hand-ground royal spices. Rested patiently until every fiber absorbs the flavor.",
  },
  {
    num: "02",
    title: "Layer",
    desc: "Parboiled basmati rice meets marinated meat, layered with crispy fried onions, saffron threads, and fresh mint leaves.",
  },
  {
    num: "03",
    title: "Seal",
    desc: "The handi is sealed airtight with wheat-flour dough. Not a wisp of steam can escape — every aroma stays trapped inside.",
  },
  {
    num: "04",
    title: "Dum Cook",
    desc: "Slow fire, gentle heat. The sealed pot breathes from within as steam circulates, infusing every grain with deep, layered flavor.",
  },
  {
    num: "05",
    title: "Serve",
    desc: "The seal cracks open. A burst of saffron-scented steam. Golden rice, tender meat, and centuries of tradition — ready for the table.",
  },
];

const POT_STEAM = [
  { delay: 0.0, duration: 3.0, drift: -8, size: 34, left: 30 },
  { delay: 0.4, duration: 3.4, drift: 12, size: 28, left: 45 },
  { delay: 0.8, duration: 2.8, drift: -5, size: 38, left: 55 },
  { delay: 1.2, duration: 3.2, drift: 15, size: 26, left: 40 },
  { delay: 1.6, duration: 3.0, drift: -10, size: 32, left: 60 },
  { delay: 2.0, duration: 3.5, drift: 8, size: 30, left: 50 },
  { delay: 2.4, duration: 2.9, drift: -3, size: 36, left: 35 },
  { delay: 2.8, duration: 3.3, drift: 14, size: 28, left: 65 },
];

export default function CookingProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const potGlowRef = useRef<HTMLDivElement>(null);
  const potBodyRef = useRef<HTMLDivElement>(null);
  const fireGlowRef = useRef<HTMLDivElement>(null);
  const potRef = useRef<HTMLDivElement>(null);
  const doughSealRef = useRef<HTMLDivElement>(null);
  const steamContainerRef = useRef<HTMLDivElement>(null);
  const indicatorLineFillRef = useRef<HTMLDivElement>(null);
  const indicatorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const breadcrumbRowRef = useRef<HTMLDivElement>(null);
  const breadcrumbClipRef = useRef<HTMLDivElement>(null);
  const crumbItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const layers = layerRefs.current.filter(Boolean) as HTMLElement[];
      const indicators = indicatorRefs.current.filter(Boolean) as HTMLElement[];
      const glow = potGlowRef.current;
      const potBody = potBodyRef.current;
      const fireGlow = fireGlowRef.current;
      const pot = potRef.current;
      const seal = doughSealRef.current;
      const steam = steamContainerRef.current;
      const lineFill = indicatorLineFillRef.current;
      const counter = counterRef.current;
      const breadcrumbRow = breadcrumbRowRef.current;
      const breadcrumbClip = breadcrumbClipRef.current;
      const crumbItems = crumbItemRefs.current.filter(Boolean) as HTMLElement[];
      const descs = descRefs.current.filter(Boolean) as HTMLElement[];

      // Calculate horizontal travel distance
      const trackWidth = track.scrollWidth;
      const travelDist = trackWidth - window.innerWidth;

      // --- Breadcrumb: measure widths and calculate x offsets ---
      const clipWidth = breadcrumbClip?.offsetWidth || 400;
      const crumbWidths = crumbItems.map(c => c.offsetWidth);
      const cumulativeWidths: number[] = [];
      let cumul = 0;
      crumbWidths.forEach(w => { cumul += w; cumulativeWidths.push(cumul); });
      // x positions: right-align the visible crumbs within the clip
      const stepX = cumulativeWidths.map(w => clipWidth - w);

      // Initial states
      gsap.set(layers, { autoAlpha: 0, y: 30 });
      gsap.set(seal, { autoAlpha: 0, y: -10 });
      gsap.set(steam, { autoAlpha: 0 });
      gsap.set(glow, { autoAlpha: 0, scale: 0.8 });
      gsap.set(fireGlow, { autoAlpha: 0, scale: 0.5 });
      gsap.set(indicators[0], { scale: 1.15 });
      gsap.set(breadcrumbRow, { x: stepX[0] });
      // All crumbs hidden except first
      gsap.set(crumbItems, { autoAlpha: 0 });
      gsap.set(crumbItems[0], { autoAlpha: 1 });
      gsap.set(descs, { autoAlpha: 0, y: 20 });
      gsap.set(descs[0], { autoAlpha: 1, y: 0 });
      if (counter) counter.textContent = "1";

      // Single unified timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      // Track horizontal movement across full timeline (0 → 5)
      tl.fromTo(
        track,
        { x: 0 },
        { x: -travelDist, ease: "none", duration: 5 },
        0
      );

      // Counter counts up 1 → 5 across full timeline
      const counterObj = { val: 1 };
      tl.to(counterObj, {
        val: 5,
        duration: 5,
        ease: "none",
        onUpdate: () => {
          if (counter) counter.textContent = String(Math.round(counterObj.val));
        },
      }, 0);

      // === Step 1: Marinate (0 → 1) ===
      tl.to(layers[0], { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0)
        .to(lineFill, { width: "0%", duration: 0.01 }, 0);

      // === Step 2: Layer (1 → 2) ===
      tl.to(layers[1], { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 1)
        .to(layers[2], { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 1.5)
        // Fire starts flickering under pot
        .to(fireGlow, { autoAlpha: 0.4, scale: 0.8, duration: 0.5, ease: "power2.out" }, 1)
        // Pot body warms up slightly
        .to(potBody, {
          boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(255,100,30,0.08), inset -6px -6px 18px rgba(0,0,0,0.3), inset 6px 6px 12px rgba(255,200,100,0.1)",
          duration: 0.5,
          ease: "power2.out",
        }, 1)
        .to(breadcrumbRow, { x: stepX[1], duration: 0.6, ease: "power2.out" }, 1)
        .to(crumbItems[1], { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 1.1)
        .to(descs[0], { autoAlpha: 0, y: -20, duration: 0.3, ease: "power2.in" }, 0.8)
        .to(descs[1], { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 1)
        .to(indicators[0], { scale: 1, duration: 0.3, ease: "power2.out" }, 1)
        .to(indicators[1], { scale: 1.15, duration: 0.3, ease: "power2.out" }, 1)
        .to(lineFill, { width: "25%", duration: 0.3, ease: "power2.out" }, 1);

      // === Step 3: Seal (2 → 3) ===
      tl.to(layers[3], { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, 2.3)
        .to(seal, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 2.4)
        // Fire intensifies
        .to(fireGlow, { autoAlpha: 0.7, scale: 1, duration: 0.5, ease: "power2.out" }, 2)
        .to(breadcrumbRow, { x: stepX[2], duration: 0.6, ease: "power2.out" }, 2)
        .to(crumbItems[2], { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 2.1)
        .to(descs[1], { autoAlpha: 0, y: -20, duration: 0.3, ease: "power2.in" }, 1.8)
        .to(descs[2], { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 2)
        .to(indicators[1], { scale: 1, duration: 0.3, ease: "power2.out" }, 2)
        .to(indicators[2], { scale: 1.15, duration: 0.3, ease: "power2.out" }, 2)
        .to(lineFill, { width: "50%", duration: 0.3, ease: "power2.out" }, 2);

      // === Step 4: Dum Cook (3 → 4) ===
      tl.to(steam, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 3)
        // Fire at full intensity
        .to(fireGlow, { autoAlpha: 1, scale: 1.2, duration: 0.5, ease: "power2.out" }, 3)
        // Pot shakes from pressure
        .to(pot, { x: "-=3", duration: 0.08, ease: "power1.inOut", yoyo: true, repeat: 5 }, 3.2)
        .to(pot, { x: "+=3", duration: 0.08, ease: "power1.inOut", yoyo: true, repeat: 5 }, 3.6)
        // Pot body glows hot
        .to(potBody, {
          boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 50px rgba(255,120,30,0.2), 0 0 80px rgba(255,80,20,0.1), inset -6px -6px 18px rgba(0,0,0,0.3), inset 6px 6px 16px rgba(255,180,80,0.15)",
          duration: 0.8,
          ease: "power2.out",
        }, 3)
        .to(breadcrumbRow, { x: stepX[3], duration: 0.6, ease: "power2.out" }, 3)
        .to(crumbItems[3], { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 3.1)
        .to(descs[2], { autoAlpha: 0, y: -20, duration: 0.3, ease: "power2.in" }, 2.8)
        .to(descs[3], { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 3)
        .to(indicators[2], { scale: 1, duration: 0.3, ease: "power2.out" }, 3)
        .to(indicators[3], { scale: 1.15, duration: 0.3, ease: "power2.out" }, 3)
        .to(lineFill, { width: "75%", duration: 0.3, ease: "power2.out" }, 3);

      // === Step 5: Serve (4 → 5) ===
      tl.to(seal, { autoAlpha: 0, y: -25, duration: 0.4, ease: "power2.in" }, 4)
        .to(glow, { autoAlpha: 1, scale: 1.3, duration: 0.5, ease: "power2.out" }, 4)
        .to(steam, { autoAlpha: 0.7, duration: 0.3, ease: "power2.out" }, 4)
        // Fire dies down
        .to(fireGlow, { autoAlpha: 0.2, scale: 0.6, duration: 0.5, ease: "power2.out" }, 4)
        .to(potBody, {
          boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 60px rgba(255,215,90,0.2), inset -6px -6px 18px rgba(0,0,0,0.3), inset 6px 6px 12px rgba(255,200,100,0.15)",
          duration: 0.8,
          ease: "power2.out",
        }, 4)
        .to(breadcrumbRow, { x: stepX[4], duration: 0.6, ease: "power2.out" }, 4)
        .to(crumbItems[4], { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 4.1)
        .to(descs[3], { autoAlpha: 0, y: -20, duration: 0.3, ease: "power2.in" }, 3.8)
        .to(descs[4], { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 4)
        .to(indicators[3], { scale: 1, duration: 0.3, ease: "power2.out" }, 4)
        .to(indicators[4], { scale: 1.15, duration: 0.3, ease: "power2.out" }, 4)
        .to(lineFill, { width: "100%", duration: 0.3, ease: "power2.out" }, 4);

      // Refresh after everything is set up
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className={styles.section}>
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />

      <div className={styles.sticky}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.headerLabel}>The Art of Biryani</span>
          <h2 className={styles.headerTitle}>From Kitchen to Plate</h2>
        </div>

        {/* Pot — stays centered */}
        <div className={styles.potWrapper}>
          <div ref={potGlowRef} className={styles.potGlow} />

          {/* Fire glow under pot */}
          <div ref={fireGlowRef} className={styles.fireGlow} />

          <div ref={potRef} className={styles.pot}>
            <div className={styles.potShadow} />
            <div ref={potBodyRef} className={styles.potBody} />
            <div className={`${styles.potHandle} ${styles.potHandleLeft}`} />
            <div className={`${styles.potHandle} ${styles.potHandleRight}`} />

            {/* Interior with layers */}
            <div className={styles.potInterior}>
              <div ref={(el) => { layerRefs.current[0] = el; }} className={`${styles.layer} ${styles.layerMeat}`} />
              <div ref={(el) => { layerRefs.current[1] = el; }} className={`${styles.layer} ${styles.layerRice}`} />
              <div ref={(el) => { layerRefs.current[2] = el; }} className={`${styles.layer} ${styles.layerSpices}`} />
              <div ref={(el) => { layerRefs.current[3] = el; }} className={`${styles.layer} ${styles.layerTopRice}`} />
            </div>

            {/* Dough seal */}
            <div ref={doughSealRef} className={styles.doughSeal}>
              <div className={styles.doughSealCrack} />
            </div>

            {/* Rim */}
            <div className={styles.potRim} />

            {/* Steam */}
            <div ref={steamContainerRef} className={styles.steamContainer}>
              {POT_STEAM.map((puff, i) => (
                <div
                  key={i}
                  className={styles.steamPuff}
                  style={{
                    left: `${puff.left}%`,
                    width: `${puff.size}px`,
                    height: `${puff.size}px`,
                    animationDuration: `${puff.duration}s`,
                    animationDelay: `${puff.delay}s`,
                    ["--puff-drift" as string]: `${puff.drift}px`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal track — invisible spacer for scroll distance */}
        <div ref={trackRef} className={styles.track}>
          {STEPS.map((_, i) => (
            <div key={i} className={styles.panel} />
          ))}
        </div>

        {/* Step text — counter + breadcrumb + description on right side */}
        <div className={styles.stepArea}>
          {/* Counter number */}
          <div className={styles.counterRow}>
            <span className={styles.counterLabel}>STEP</span>
            <span ref={counterRef} className={styles.counterNum}>1</span>
          </div>

          {/* Breadcrumb — accumulating titles with | separators */}
          <div className={styles.breadcrumbClip} ref={breadcrumbClipRef}>
            <div className={styles.breadcrumbRow} ref={breadcrumbRowRef}>
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  ref={(el) => { crumbItemRefs.current[i] = el; }}
                  className={styles.crumbItem}
                >
                  {i > 0 && <span className={styles.crumbSep}>|</span>}
                  <span className={styles.crumbTitle}>{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description — fades in/out per step */}
          <div className={styles.descArea}>
            {STEPS.map((step, i) => (
              <p
                key={i}
                ref={(el) => { descRefs.current[i] = el; }}
                className={styles.stepDesc}
              >
                {step.desc}
              </p>
            ))}
          </div>
        </div>

        {/* Step indicators */}
        <div className={styles.indicators}>
          <div className={styles.indicatorLine}>
            <div ref={indicatorLineFillRef} className={styles.indicatorLineFill} />
          </div>
          {STEPS.map((step, i) => (
            <div
              key={i}
              ref={(el) => { indicatorRefs.current[i] = el; }}
              className={styles.indicator}
            >
              {step.num}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
