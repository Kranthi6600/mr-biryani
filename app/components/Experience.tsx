"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const titleWords = useMemo(() => "Experience the Flavor".split(" "), []);
  const bodyWords = useMemo(
    () =>
      "At Mr. Biryani, every dish is slow-cooked, spice-layered, and served with soul. Whether you're craving the smoky depth of Hyderabadi dum or the richness of Lucknowi indulgence, your journey starts here.".split(
        " "
      ),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const titleWordEls = titleRef.current?.querySelectorAll("[data-word]") || [];
      const bodyWordEls = bodyRef.current?.querySelectorAll("[data-word]") || [];

      const isMobile = window.innerWidth < 640;

      gsap.set(titleWordEls, { y: "100%", opacity: 0, rotateX: isMobile ? -45 : -90 });
      gsap.set(bodyWordEls, { y: 20, opacity: 0 });
      gsap.set([subtitleRef.current, buttonRef.current], { y: isMobile ? 30 : 60, opacity: 0, scale: isMobile ? 0.96 : 0.92, filter: isMobile ? "blur(6px)" : "blur(12px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 15%",
          scrub: 4,
        },
      });

      tl.to(titleWordEls, {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        ease: "back.out(1.6)",
        duration: 1,
        stagger: 0.15,
      }, 0)
        .to(subtitleRef.current, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", ease: "expo.out", duration: 1.2 }, 0.5)
        .to(bodyWordEls, {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 0.6,
          stagger: 0.04,
        }, 0.7)
        .to(buttonRef.current, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", ease: "back.out(1.4)", duration: 1.2 }, 1.2);

      // Floating spice particles
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll("[data-particle]");
        particles.forEach((p, i) => {
          const el = p as HTMLElement;
          const startX = parseFloat(el.style.left);
          gsap.to(el, {
            y: -200 - Math.random() * 300,
            x: `+=${(Math.random() - 0.5) * 120}`,
            opacity: 0,
            rotation: `+=${(Math.random() - 0.5) * 360}`,
            duration: 6 + Math.random() * 6,
            repeat: -1,
            delay: i * 0.4,
            ease: "none",
            onRepeat: () => {
              gsap.set(el, { y: 0, opacity: 0.6, x: startX });
            },
          });
        });
      }

      // Golden ring pulse behind title
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          scale: 1.15,
          opacity: 0.15,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Ornament draw-in
      if (ornamentRef.current) {
        const line = ornamentRef.current.querySelector("[data-line]");
        const diamond = ornamentRef.current.querySelector("[data-diamond]");
        if (line) {
          gsap.set(line, { scaleX: 0 });
          tl.to(line, { scaleX: 1, ease: "expo.out", duration: 1 }, 0.9);
        }
        if (diamond) {
          gsap.set(diamond, { scale: 0, rotate: 0 });
          tl.to(diamond, { scale: 1, rotate: 45, ease: "back.out(2)", duration: 0.6 }, 1.1);
        }
      }

      // Scroll-reactive parallax on content
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Magnetic button effect (desktop only)
      if (buttonRef.current && !isMobile) {
        const btn = buttonRef.current;
        btn.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(btn, { x: x * 20, y: y * 12, duration: 0.4, ease: "power3.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-20 min-h-screen flex items-center justify-center px-4 py-20 sm:px-6 sm:py-32 overflow-x-hidden"
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

      {/* Floating spice particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {["◆", "✦", "◆", "✦", "◆", "✦", "◆", "✦", "◆", "✦"].map((char, i) => (
          <span
            key={i}
            data-particle
            className="absolute select-none"
            style={{
              left: `${8 + i * 9}%`,
              bottom: "10%",
              fontSize: `${10 + (i % 3) * 4}px`,
              color: "rgba(232, 171, 48, 0.25)",
              textShadow: "0 0 8px rgba(232, 171, 48, 0.2)",
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <div ref={contentRef} className="max-w-3xl mx-auto text-center relative">
        {/* Golden ring pulse behind title */}
        <div
          ref={ringRef}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            top: "-20px",
            width: "clamp(200px, 60vw, 320px)",
            height: "clamp(80px, 25vw, 120px)",
            borderRadius: "50%",
            border: "1px solid rgba(232, 171, 48, 0.2)",
            opacity: 0.3,
          }}
        />

        <div style={{ perspective: "800px" }}>
          <h3
            ref={titleRef}
            className="text-3xl sm:text-5xl md:text-6xl font-black italic mb-4 sm:mb-6"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              lineHeight: 1.25,
            }}
          >
            {titleWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden" style={{ perspective: "400px" }}>
                <span
                  data-word
                  className="inline-block"
                  style={{
                    background: "linear-gradient(135deg, #f5c242 0%, #e8ab30 30%, #f5c242 60%, #d4951a 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter:
                      "drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.5)) drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.35)) drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.5)) drop-shadow(0 2px 8px rgba(232, 171, 48, 0.3))",
                    transformStyle: "preserve-3d",
                    marginRight: "0.25em",
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h3>
        </div>

        <p
          ref={subtitleRef}
          className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8"
          style={{
            fontFamily: "var(--font-fraunces), serif",
            color: "rgba(245, 194, 66, 0.75)",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)",
            fontStyle: "italic",
            fontWeight: 500,
          }}
        >
          This isn&rsquo;t just a meal&mdash; it&rsquo;s a moment.
        </p>

        {/* Ornamental divider */}
        <div
          ref={ornamentRef}
          className="flex items-center justify-center gap-2 sm:gap-3 my-6 sm:my-8"
        >
          <span
            data-line
            className="inline-block"
            style={{
              width: "40px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(232, 171, 48, 0.35), transparent)",
              transformOrigin: "center",
            }}
          />
          <span
            data-diamond
            className="inline-block"
            style={{
              width: "8px",
              height: "8px",
              background: "rgba(232, 171, 48, 0.4)",
              boxShadow: "0 1px 2px rgba(232, 171, 48, 0.2)",
            }}
          />
          <span
            data-line
            className="inline-block"
            style={{
              width: "40px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(232, 171, 48, 0.35), transparent)",
              transformOrigin: "center",
            }}
          />
        </div>

        <p
          ref={bodyRef}
          className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            color: "rgba(245, 194, 66, 0.65)",
            letterSpacing: "0.015em",
            lineHeight: 1.9,
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          {bodyWords.map((word, i) => (
            <span key={i} data-word className="inline-block" style={{ marginRight: "0.25em" }}>
              {word}
            </span>
          ))}
        </p>
        <button
          ref={buttonRef}
          className="group relative inline-flex items-center gap-2 sm:gap-3 rounded-full px-8 sm:px-12 py-4 sm:py-5 text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #1a0f05 0%, #2a1a08 50%, #1a0f05 100%)",
            color: "#FFD75A",
            border: "1px solid rgba(255,215,90,0.22)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,215,90,0.15), inset 0 -1px 0 rgba(0,0,0,0.4)",
            transition: "box-shadow 0.4s ease, border-color 0.4s ease",
          }}
        >
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "radial-gradient(circle at center, rgba(255,215,90,0.18) 0%, transparent 70%)",
            }}
          />
          <span
            className="absolute inset-0 rounded-full overflow-hidden"
          >
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD75A]/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"
            />
          </span>
          <span
            className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, rgba(255,215,90,0.3) 0%, transparent 50%, rgba(255,215,90,0.1) 100%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />
          <span className="relative tracking-[0.2em] sm:tracking-[0.25em]" style={{ textShadow: "0 1px 4px rgba(255,215,90,0.15)" }}>View Our Menu</span>
          <svg className="relative transition-all duration-500 group-hover:translate-x-1.5 group-hover:stroke-[#FFD75A]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 4px rgba(255,215,90,0.3))" }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
