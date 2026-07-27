"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FloatingIngredients.module.css";

gsap.registerPlugin(ScrollTrigger);

const INGREDIENTS = [
  { emoji: "🌶️", top: 15, left: 8, size: 28, speed: 0.3, rotate: 15, delay: 0 },
  { emoji: "🌿", top: 35, left: 85, size: 24, speed: 0.5, rotate: -10, delay: 0.5 },
  { emoji: "🌸", top: 60, left: 12, size: 22, speed: 0.4, rotate: 20, delay: 1.0 },
  { emoji: "🧈", top: 75, left: 88, size: 26, speed: 0.25, rotate: -15, delay: 1.5 },
  { emoji: "🌶️", top: 50, left: 92, size: 20, speed: 0.6, rotate: 25, delay: 0.8 },
  { emoji: "🌿", top: 20, left: 75, size: 22, speed: 0.35, rotate: -20, delay: 2.0 },
  { emoji: "🧄", top: 80, left: 45, size: 24, speed: 0.45, rotate: 10, delay: 1.2 },
  { emoji: "🌶️", top: 10, left: 50, size: 18, speed: 0.55, rotate: -25, delay: 2.5 },
];

export default function FloatingIngredients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const ctx = gsap.context(() => {
      const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];

      items.forEach((item, i) => {
        const data = INGREDIENTS[i];
        const driftY = window.innerHeight * data.speed;

        // Parallax: move vertically based on scroll position
        gsap.to(item, {
          y: -driftY,
          rotation: data.rotate,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });

        // Subtle floating idle animation
        gsap.to(item, {
          x: `+=${data.delay > 1.5 ? 15 : -15}`,
          duration: 4 + data.delay,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Gentle rotation sway
        gsap.to(item, {
          rotation: `+=${data.rotate > 0 ? 8 : -8}`,
          duration: 5 + data.delay * 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {INGREDIENTS.map((ing, i) => (
        <div
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          className={styles.ingredient}
          style={{
            top: `${ing.top}%`,
            left: `${ing.left}%`,
            fontSize: `${ing.size}px`,
          }}
        >
          {ing.emoji}
        </div>
      ))}
    </div>
  );
}
