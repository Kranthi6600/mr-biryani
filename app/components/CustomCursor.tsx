"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

const TRAIL_COUNT = 12;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const trails = trailRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!dot || !ring || trails.length === 0) return;

    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const ringXTo = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const ringYTo = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    // Trail quickTo setters
    const trailX = trails.map((t, i) =>
      gsap.quickTo(t, "x", { duration: 0.3 + i * 0.04, ease: "power2.out" })
    );
    const trailY = trails.map((t, i) =>
      gsap.quickTo(t, "y", { duration: 0.3 + i * 0.04, ease: "power2.out" })
    );

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);
      trailX.forEach((fn) => fn(e.clientX));
      trailY.forEach((fn) => fn(e.clientY));
    };

    const onDown = () => {
      gsap.to(ring, { scale: 0.7, duration: 0.2, ease: "power2.out" });
    };

    const onUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    };

    // Hover effect on interactive elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, .cursor-pointer")) {
        gsap.to(ring, { scale: 1.6, borderColor: "#FFD75A", duration: 0.3, ease: "power2.out" });
        gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power2.out" });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, .cursor-pointer")) {
        gsap.to(ring, { scale: 1, borderColor: "#FFD75A", duration: 0.3, ease: "power2.out" });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Trail particles */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className={styles.trail}
          style={{
            opacity: (1 - i / TRAIL_COUNT) * 0.25,
            width: `${6 - i * 0.3}px`,
            height: `${6 - i * 0.3}px`,
          }}
        />
      ))}

      {/* Outer ring */}
      <div ref={ringRef} className={styles.ring} />

      {/* Center dot */}
      <div ref={dotRef} className={styles.dot} />
    </div>
  );
}
