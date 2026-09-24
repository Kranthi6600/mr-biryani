"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { src: "/imgs/gallery/1.webp", alt: "Signature Biryani", span: "large" },
  { src: "/imgs/gallery/2.webp", alt: "Royal Spread", span: "small" },
  { src: "/imgs/gallery/3.webp", alt: "Fresh Spices", span: "small" },
  { src: "/imgs/gallery/4.webp", alt: "Slow Cooked", span: "small" },
  { src: "/imgs/gallery/5.webp", alt: "Golden Rice", span: "small" },
  { src: "/imgs/gallery/6.webp", alt: "Handi Special", span: "small" },
  { src: "/imgs/gallery/7.webp", alt: "Mughlai Feast", span: "small" },
  { src: "/imgs/gallery/8.webp", alt: "Saffron Layers", span: "large" },
  { src: "/imgs/gallery/9.webp", alt: "Tender Meat", span: "small" },
  { src: "/imgs/gallery/10.webp", alt: "Plated Perfect", span: "small" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const header = headerRef.current;
      const grid = gridRef.current;
      if (!header || !grid) return;

      const imageEls = grid.querySelectorAll(".galleryItem");

      // Split title into letters for stagger
      const titleEl = titleRef.current;
      const letterEls: Element[] = [];
      if (titleEl) {
        const text = titleEl.textContent || "";
        titleEl.textContent = "";
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.background =
            "linear-gradient(135deg, #f5c242 0%, #e8ab30 30%, #f5c242 60%, #d4951a 100%)";
          span.style.setProperty("-webkit-background-clip", "text");
          span.style.backgroundClip = "text";
          span.style.setProperty("-webkit-text-fill-color", "transparent");
          span.style.filter =
            "drop-shadow(1px 1px 0 rgba(0,0,0,0.5)) drop-shadow(2px 2px 0 rgba(0,0,0,0.35)) drop-shadow(4px 4px 12px rgba(0,0,0,0.5)) drop-shadow(0 2px 8px rgba(232,171,48,0.3))";
          titleEl.appendChild(span);
          letterEls.push(span);
        });
      }

      gsap.set([labelRef.current], { y: 30, opacity: 0 });
      gsap.set(letterEls, { y: 80, opacity: 0, rotateX: -90, rotateZ: -10 });
      gsap.set(ornamentRef.current, { scaleX: 0, opacity: 0 });

      imageEls.forEach((el, i) => {
        const fromLeft = i % 2 === 0;
        gsap.set(el, {
          x: fromLeft ? (isMobile ? -60 : -150) : (isMobile ? 60 : 150),
          y: isMobile ? 40 : 100,
          z: isMobile ? -100 : -600,
          opacity: 0,
          scale: isMobile ? 0.85 : 0.6,
          rotateY: fromLeft ? (isMobile ? -20 : -75) : (isMobile ? 20 : 75),
          rotateX: isMobile ? 8 : 25,
          transformOrigin: "center center",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(labelRef.current, { y: 0, opacity: 1, ease: "expo.out", duration: 1 }, 0)
        .to(letterEls, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          rotateZ: 0,
          ease: "back.out(1.6)",
          duration: 1,
          stagger: 0.08,
        }, 0.15)
        .to(ornamentRef.current, { scaleX: 1, opacity: 1, ease: "expo.out", duration: 1 }, 0.6)
        .to(imageEls, {
          x: 0,
          y: 0,
          z: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          ease: "expo.out",
          duration: 2,
          stagger: 0.25,
        }, 0.3);

      // Parallax depth hover on each gallery item (desktop only).
      // overwrite:"auto" lets hover coexist with the entrance timeline —
      // GSAP resolves conflicts on shared properties automatically.
      if (!isMobile) {
      imageEls.forEach((el) => {
        const item = el as HTMLElement;
        const img = item.querySelector(".galleryImg");
        const overlay = item.querySelector(".galleryOverlay");

        let rafId: number | null = null;
        let lastE: MouseEvent | null = null;

        const flush = () => {
          rafId = null;
          const e = lastE;
          if (!e) return;
          const rect = item.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(item, {
            rotateY: x * 10,
            rotateX: y * -8,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (img) gsap.to(img, { scale: 1.12, x: x * 12, y: y * 12, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.3, overwrite: "auto" });
        };

        const onMove = (e: MouseEvent) => {
          lastE = e;
          if (rafId === null) rafId = requestAnimationFrame(flush);
        };

        item.addEventListener("mousemove", onMove);

        item.addEventListener("mouseleave", () => {
          if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
          lastE = null;
          gsap.to(item, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto",
          });
          if (img) gsap.to(img, { scale: 1, x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
          if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4, overwrite: "auto" });
        });
      });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative z-20 px-4 sm:px-6 py-14 lg:py-32 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(232, 171, 48, 0.12) 0%, transparent 50%)," +
          "radial-gradient(ellipse at 70% 80%, rgba(196, 144, 26, 0.08) 0%, transparent 50%)," +
          "linear-gradient(135deg, #0d0703 0%, #1a0f05 40%, #0a0502 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(232, 171, 48, 0.04) 0%, transparent 40%)," +
            "radial-gradient(circle at 85% 75%, rgba(232, 171, 48, 0.03) 0%, transparent 40%)," +
            "radial-gradient(circle at 50% 50%, rgba(245, 194, 66, 0.05) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-6xl mx-auto relative">
        <div ref={headerRef} className="text-center mb-16">
          <span
            ref={labelRef}
            className="text-xs tracking-[0.45em] uppercase font-semibold"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              color: "rgba(232, 171, 48, 0.65)",
              textShadow: "0 1px 2px rgba(232, 171, 48, 0.2)",
            }}
          >
            Visual Feast
          </span>
          <h3
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-black italic mt-4"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              lineHeight: 1.25,
              perspective: "800px",
            }}
          >
            Gallery
          </h3>
          <div
            ref={ornamentRef}
            className="flex items-center justify-center gap-3 mt-6"
            style={{ transformOrigin: "center" }}
          >
            <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,171,48,0.35), transparent)" }} />
            <div className="w-2.5 h-2.5 rotate-45" style={{ background: "rgba(232,171,48,0.5)", boxShadow: "0 1px 2px rgba(232,171,48,0.2)" }} />
            <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,171,48,0.35), transparent)" }} />
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[140px] sm:auto-rows-[200px]" style={{ perspective: "800px" }}>
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`galleryItem relative rounded-2xl overflow-hidden cursor-pointer ${
                img.span === "large"
                  ? "col-span-2 row-span-2"
                  : img.span === "medium"
                  ? "col-span-2 row-span-1"
                  : "col-span-1 row-span-1"
              }`}
              style={{
                background: "#0a0503",
                border: "1px solid rgba(245,194,66,0.12)",
                boxShadow:
                  "0 12px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(245,194,66,0.06)",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="galleryImg object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                style={{ willChange: "transform" }}
              />
              <div
                className="galleryOverlay absolute inset-0 pointer-events-none"
                style={{
                  opacity: 0,
                  background: "linear-gradient(to top, rgba(10,5,3,0.85) 0%, rgba(10,5,3,0.2) 40%, transparent 70%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
