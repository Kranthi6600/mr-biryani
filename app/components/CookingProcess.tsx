"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CookingProcess.module.css";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 115;
const FRAME_PATHS = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/imgs/1_frames/frame_${String(i + 1).padStart(3, "0")}.jpg`
);

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

export default function CookingProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepAreaRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const indicatorLineFillRef = useRef<HTMLDivElement>(null);
  const indicatorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const crumbItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  // ---------- Preload all frames ----------
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    let count = 0;

    FRAME_PATHS.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      const done = () => {
        if (cancelled) return;
        count++;
        setLoaded(count);
        if (count === FRAME_COUNT) setReady(true);
      };
      img.onload = done;
      img.onerror = done;
      imgs[i] = img;
    });

    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
  }, []);

  // ---------- Draw a frame to the canvas (cover-fit) ----------
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, w, h);
  };

  // ---------- Size canvas to viewport (with DPR) ----------
  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      // Redraw current frame after resize
      drawFrame(currentFrameRef.current);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // Track the current frame index so resize can redraw
  const currentFrameRef = useRef(0);

  // ---------- GSAP scroll-driven sequence + 3D stage ----------
  useEffect(() => {
    if (!ready) return;
    const section = sectionRef.current;
    if (!section) return;

    // Draw first frame
    drawFrame(0);
    currentFrameRef.current = 0;

    const ctx = gsap.context(() => {
      const crumbs = crumbItemRefs.current.filter(Boolean) as HTMLElement[];
      const descs = descRefs.current.filter(Boolean) as HTMLElement[];
      const indicators = indicatorRefs.current.filter(Boolean) as HTMLElement[];
      const lineFill = indicatorLineFillRef.current;
      const counter = counterRef.current;
      const stage = stageRef.current;
      const header = headerRef.current;
      const stepArea = stepAreaRef.current;

      // Initial states
      gsap.set(crumbs, { autoAlpha: 0 });
      gsap.set(crumbs[0], { autoAlpha: 1 });
      gsap.set(descs, { autoAlpha: 0, y: 30 });
      gsap.set(descs[0], { autoAlpha: 1, y: 0 });
      gsap.set(indicators, { scale: 1 });
      gsap.set(indicators[0], { scale: 1.15 });
      if (counter) counter.textContent = "1";

      const frameState = { frame: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });

      // Frame sequence 0 → 114
      tl.to(
        frameState,
        {
          frame: FRAME_COUNT - 1,
          duration: 5,
          ease: "none",
          onUpdate: () => {
            const f = Math.round(frameState.frame);
            if (f !== currentFrameRef.current) {
              currentFrameRef.current = f;
              drawFrame(f);
            }
          },
        },
        0
      );

      // 3D stage — tilts and pushes forward as you scroll
      tl.fromTo(
        stage,
        { rotateX: 8, scale: 1.18, z: -300 },
        { rotateX: -1, scale: 1.02, z: 0, duration: 5, ease: "none" },
        0
      );

      // Header parallax — drifts up and fades as you scroll in
      tl.fromTo(
        header,
        { y: 0, autoAlpha: 1 },
        { y: -60, autoAlpha: 0, duration: 0.8, ease: "power2.in" },
        0.6
      );

      // Step area — subtle 3D parallax
      tl.fromTo(
        stepArea,
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" },
        0.1
      );

      // Counter 1 → 5
      const counterObj = { val: 1 };
      tl.to(
        counterObj,
        {
          val: 5,
          duration: 5,
          ease: "none",
          onUpdate: () => {
            if (counter) counter.textContent = String(Math.round(counterObj.val));
          },
        },
        0
      );

      // Progress line 0 → 100%
      tl.fromTo(
        lineFill,
        { width: "0%" },
        { width: "100%", duration: 5, ease: "none" },
        0
      );

      // Step transitions at t = 1, 2, 3, 4
      [1, 2, 3, 4].forEach((t, idx) => {
        const next = idx + 1;
        tl.to(descs[idx], { autoAlpha: 0, y: -30, duration: 0.3, ease: "power2.in" }, t - 0.2)
          .to(descs[next], { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, t)
          .to(crumbs[next], { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, t)
          .to(indicators[idx], { scale: 1, duration: 0.3, ease: "power2.out" }, t)
          .to(indicators[next], { scale: 1.15, duration: 0.3, ease: "power2.out" }, t);
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const progressPct = Math.round((loaded / FRAME_COUNT) * 100);

  return (
    <section ref={sectionRef} id="process" className={styles.section}>
      <div className={styles.sticky}>
        {/* 3D Stage — canvas frame sequence with perspective tilt */}
        <div ref={stageRef} className={styles.stage}>
          <canvas ref={canvasRef} className={styles.canvas} />
          <div className={styles.vignette} />
          <div className={styles.grain} />
        </div>

        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.headerLabel}>The Art of Biryani</span>
          <h2 className={styles.headerTitle}>From Kitchen to Plate</h2>
        </div>

        {/* Loading progress */}
        {!ready && (
          <div className={styles.loader}>
            <div className={styles.loaderBar}>
              <div className={styles.loaderFill} style={{ width: `${progressPct}%` }} />
            </div>
            <span className={styles.loaderText}>Plating the experience… {progressPct}%</span>
          </div>
        )}

        {/* Step text — right side */}
        <div ref={stepAreaRef} className={styles.stepArea}>
          <div className={styles.counterRow}>
            <span className={styles.counterLabel}>STEP</span>
            <span ref={counterRef} className={styles.counterNum}>1</span>
          </div>

          <div className={styles.breadcrumbClip}>
            <div className={styles.breadcrumbRow}>
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
