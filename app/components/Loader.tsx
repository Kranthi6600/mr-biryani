"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import styles from "./Loader.module.css";

const STEAM_PUFFS = [
  { left: 20, delay: 0, duration: 2.5, drift: -6, size: 30 },
  { left: 35, delay: 0.3, duration: 2.8, drift: 8, size: 24 },
  { left: 50, delay: 0.6, duration: 2.2, drift: -4, size: 34 },
  { left: 65, delay: 0.9, duration: 2.6, drift: 10, size: 26 },
  { left: 80, delay: 1.2, duration: 2.4, drift: -8, size: 28 },
];

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setDone(true), 100);
        },
      });

      // Initial states
      gsap.set(logoRef.current, { autoAlpha: 0, scale: 0.6, y: 30 });
      gsap.set(taglineRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(steamRef.current, { autoAlpha: 0 });
      gsap.set([curtainLeftRef.current, curtainRightRef.current], { x: 0 });

      // Logo animates in
      tl.to(logoRef.current, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.6)",
      }, 0.2);

      // Steam fades in
      tl.to(steamRef.current, {
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.out",
      }, 0.6);

      // Tagline fades in
      tl.to(taglineRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }, 1.0);

      // Hold
      tl.to({}, { duration: 0.8 });

      // Logo fades out
      tl.to([logoRef.current, taglineRef.current, steamRef.current], {
        autoAlpha: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
      }, 2.4);

      // Curtains lift (slide apart)
      tl.to(curtainLeftRef.current, {
        x: "-100%",
        duration: 0.9,
        ease: "power3.inOut",
      }, 2.6)
        .to(curtainRightRef.current, {
          x: "100%",
          duration: 0.9,
          ease: "power3.inOut",
        }, 2.6);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div ref={containerRef} className={styles.overlay}>
      {/* Curtains */}
      <div ref={curtainLeftRef} className={`${styles.curtain} ${styles.curtainLeft}`} />
      <div ref={curtainRightRef} className={`${styles.curtain} ${styles.curtainRight}`} />

      {/* Content */}
      <div className={styles.content}>
        {/* Steam */}
        <div ref={steamRef} className={styles.steamContainer}>
          {STEAM_PUFFS.map((puff, i) => (
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

        {/* Logo */}
        <div ref={logoRef} className={styles.logo}>
          <span className={styles.logoMr}>Mr.</span>
          <span className={styles.logoBiryani}>Biryani</span>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className={styles.tagline}>
          <span className={styles.taglineLine} />
          <span className={styles.taglineText}>Royal Kitchen</span>
          <span className={styles.taglineLine} />
        </div>
      </div>
    </div>
  );
}
