"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { src: "/imgs/hero-plate/plate1.png", alt: "Royal Chicken Biryani", span: "large" },
  { src: "/imgs/chicken%20%20biryani.jpg", alt: "Chicken Biryani", span: "medium" },
  { src: "/imgs/hero-plate/plate2.png", alt: "Mutton Shahi Biryani", span: "small" },
  { src: "/imgs/hero-plate/plate3.png", alt: "Veg Dum Biryani", span: "small" },
  { src: "/imgs/hero-plate/plate4.png", alt: "Prawn Masala Biryani", span: "medium" },
  { src: "/imgs/ingredients/ing1.png", alt: "Fresh Ingredients", span: "small" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
            "linear-gradient(135deg, #1a0f05 0%, #3a2510 30%, #1a0f05 60%, #2a1a08 100%)";
          span.style.setProperty("-webkit-background-clip", "text");
          span.style.backgroundClip = "text";
          span.style.setProperty("-webkit-text-fill-color", "transparent");
          span.style.filter =
            "drop-shadow(1px 1px 0 rgba(0,0,0,0.35)) drop-shadow(2px 2px 0 rgba(0,0,0,0.22)) drop-shadow(4px 4px 12px rgba(0,0,0,0.35)) drop-shadow(0 2px 4px rgba(255,244,214,0.2))";
          titleEl.appendChild(span);
          letterEls.push(span);
        });
      }

      gsap.set([labelRef.current], { y: 30, opacity: 0, filter: "blur(8px)" });
      gsap.set(letterEls, { y: 80, opacity: 0, rotateX: -90, rotateZ: -10 });
      gsap.set(ornamentRef.current, { scaleX: 0, opacity: 0 });

      imageEls.forEach((el, i) => {
        const fromLeft = i % 2 === 0;
        gsap.set(el, {
          x: fromLeft ? -150 : 150,
          y: 100,
          z: -600,
          opacity: 0,
          scale: 0.6,
          rotateY: fromLeft ? -75 : 75,
          rotateX: 25,
          transformOrigin: "center center",
          filter: "blur(16px)",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 70%",
          scrub: 4,
        },
      });

      tl.to(labelRef.current, { y: 0, opacity: 1, filter: "blur(0px)", ease: "expo.out", duration: 1 }, 0)
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
          filter: "blur(0px)",
          ease: "expo.out",
          duration: 2,
          stagger: 0.25,
        }, 0.3);

      // Parallax depth hover on each gallery item
      imageEls.forEach((el) => {
        const item = el as HTMLElement;
        const img = item.querySelector(".galleryImg");
        const overlay = item.querySelector(".galleryOverlay");
        const caption = item.querySelector(".galleryCaption");
        const captionText = item.querySelector(".galleryCaptionText");

        item.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = item.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(item, {
            rotateY: x * 10,
            rotateX: y * -8,
            duration: 0.4,
            ease: "power2.out",
          });
          if (img) gsap.to(img, { scale: 1.12, x: x * 12, y: y * 12, duration: 0.5, ease: "power3.out" });
          if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.3 });
          if (caption) gsap.to(caption, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" });
          if (captionText) gsap.to(captionText, { x: x * 6, y: y * 4, duration: 0.4, ease: "power3.out" });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          });
          if (img) gsap.to(img, { scale: 1, x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
          if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.4 });
          if (caption) gsap.to(caption, { y: 16, opacity: 0, duration: 0.4 });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative z-20 px-6 py-32 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(255, 244, 214, 0.15) 0%, transparent 50%)," +
          "radial-gradient(ellipse at 70% 80%, rgba(196, 144, 26, 0.2) 0%, transparent 50%)," +
          "linear-gradient(135deg, #E8AB30 0%, #D4951A 40%, #B88015 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(26, 15, 5, 0.05) 0%, transparent 40%)," +
            "radial-gradient(circle at 85% 75%, rgba(26, 15, 5, 0.04) 0%, transparent 40%)," +
            "radial-gradient(circle at 50% 50%, rgba(255, 244, 214, 0.08) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-6xl mx-auto relative">
        <div ref={headerRef} className="text-center mb-16">
          <span
            ref={labelRef}
            className="text-xs tracking-[0.45em] uppercase font-semibold"
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              color: "rgba(26, 15, 5, 0.65)",
              textShadow: "0 1px 2px rgba(255, 244, 214, 0.3)",
            }}
          >
            Visual Feast
          </span>
          <h3
            ref={titleRef}
            className="text-5xl sm:text-6xl font-black italic mt-4"
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
            <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(26,15,5,0.35), transparent)" }} />
            <div className="w-2.5 h-2.5 rotate-45" style={{ background: "rgba(26,15,5,0.45)", boxShadow: "0 1px 2px rgba(255,244,214,0.2)" }} />
            <div className="w-20 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(26,15,5,0.35), transparent)" }} />
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]" style={{ perspective: "800px" }}>
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
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ willChange: "transform" }}
              />
              <div
                className="galleryOverlay absolute inset-0 pointer-events-none"
                style={{
                  opacity: 0,
                  background: "linear-gradient(to top, rgba(10,5,3,0.85) 0%, rgba(10,5,3,0.2) 40%, transparent 70%)",
                }}
              />
              <div
                className="galleryCaption absolute bottom-0 left-0 right-0 p-5 pointer-events-none"
                style={{ opacity: 0, transform: "translateY(16px)" }}
              >
                <div
                  className="inline-block"
                  style={{
                    padding: "4px 12px",
                    borderRadius: "6px",
                    background: "rgba(245,194,66,0.1)",
                    border: "1px solid rgba(245,194,66,0.2)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span
                    className="galleryCaptionText text-sm font-bold italic"
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      color: "#f5c242",
                      textShadow: "0 1px 4px rgba(245,194,66,0.15)",
                    }}
                  >
                    {img.alt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
