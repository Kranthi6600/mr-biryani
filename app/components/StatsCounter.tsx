"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StatsCounter.module.css";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 10000, suffix: "+", label: "Plates Served" },
  { value: 50, suffix: "+", label: "Royal Spices" },
  { value: 25, suffix: "", label: "Years of Tradition" },
];

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const numbers = numberRefs.current.filter(Boolean) as HTMLSpanElement[];
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const line = lineRef.current;

      // Initial states
      gsap.set(cards, { autoAlpha: 0, y: 60, scale: 0.9 });
      gsap.set(line, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Line draws across
      tl.to(line, { scaleX: 1, duration: 0.8, ease: "power2.out" }, 0);

      // Cards stagger in
      tl.to(cards, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.4)",
      }, 0.2);

      // Numbers count up
      numbers.forEach((numEl, i) => {
        const target = STATS[i].value;
        const obj = { val: 0 };
        tl.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            const formatted = Math.floor(obj.val).toLocaleString();
            numEl.textContent = formatted;
          },
        }, 0.4 + i * 0.15);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.bgGlow} />

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Our Legacy</span>
          <h2 className={styles.title}>Numbers That Speak</h2>
        </div>

        <div ref={lineRef} className={styles.divider} />

        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={styles.card}
            >
              <div className={styles.numberRow}>
                <span
                  ref={(el) => { numberRefs.current[i] = el; }}
                  className={styles.number}
                >
                  0
                </span>
                <span className={styles.suffix}>{stat.suffix}</span>
              </div>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
