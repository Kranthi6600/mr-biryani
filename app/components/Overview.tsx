"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { dishes } from "./useDishSync";

function useTypingEffect(text: string, speed = 20) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    indexRef.current = 0;

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

export default function Overview({
  activeDish,
}: {
  activeDish: number;
  goToDish?: (index: number) => void;
}) {
  const [tab, setTab] = useState<"overview" | "ingredients">("overview");
  const dish = dishes[activeDish];
  const { displayed, done } = useTypingEffect(dish.overview, 18);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const prevDishRef = useRef(activeDish);

  useEffect(() => {
    if (!cardRef.current || !contentRef.current) return;
    const card = cardRef.current;
    const content = contentRef.current;

    const isDishChange = prevDishRef.current !== activeDish;
    prevDishRef.current = activeDish;

    if (!isDishChange) return;

    // Ensure GSAP knows the base rotateY
    gsap.set(card, { rotateY: -12, x: 0, opacity: 1, filter: "blur(0px)" });
    gsap.set(content, { opacity: 1, y: 0 });

    // Flip the card out, swap content, flip back in
    const tl = gsap.timeline();
    tl.to(card, {
      rotateY: isDishChange ? -37 : -27,
      x: isDishChange ? -30 : -15,
      opacity: 0.3,
      filter: "blur(6px)",
      duration: 0.3,
      ease: "power2.in",
    })
    .to(content, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
    }, 0)
    .to(card, {
      rotateY: -12,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.5,
      ease: "back.out(1.4)",
    })
    .to(content, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.3");

    // Stagger animate inner items (info cards or ingredient cards)
    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll("[data-anim]");
      gsap.set(items, { opacity: 0, y: 15, scale: 0.9 });
      tl.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: "back.out(1.6)",
      }, "-=0.2");
    }
  }, [activeDish]);

  return (
    <div
      className="absolute top-1/2 right-4 sm:right-6 md:right-8 z-20 hidden sm:block w-[clamp(240px,22vw,360px)] h-[clamp(380px,62vh,680px)]"
      style={{
        transform: "translateY(-50%)",
      }}
    >
    <div
      ref={cardRef}
      className="w-full h-full rounded-[2rem] overflow-hidden transition-shadow duration-700 ease-out hover:shadow-[0_12px_48px_rgba(0,0,0,0.6)]"
      style={{
        background: "rgba(0, 0, 0, 0.96)",
        border: "1px solid rgba(245, 194, 66, 0.12)",
        transform: "perspective(1200px) rotateY(-12deg)",
        transformStyle: "preserve-3d",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 215, 90, 0.12), inset 0 -1px 2px rgba(0, 0, 0, 0.3), 0 0 40px rgba(245, 194, 66, 0.06), -20px 30px 60px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Soft top glow */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 transition-opacity duration-700"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 215, 90, 0.07) 0%, transparent 80%)",
        }}
      />
      {/* Specular highlight */}
      <div
        className="absolute -top-24 -left-24 w-48 h-48 rounded-full transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%)",
        }}
      />
      {/* Bottom warmth */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(0deg, rgba(255, 215, 90, 0.05) 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col h-full p-8" style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
        <div className="h-px bg-gradient-to-r from-[rgba(255,215,90,0.5)] to-transparent" />

        {/* Tabs */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setTab("overview")}
            className={`relative flex-1 rounded-lg px-4 py-2 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-500 ease-out ${
              tab === "overview"
                ? "bg-[rgba(255,215,90,0.18)] text-[#FFD75A] shadow-[0_0_16px_rgba(255,215,90,0.2)]"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setTab("ingredients")}
            className={`relative flex-1 rounded-lg px-4 py-2 text-xs font-medium tracking-[0.15em] uppercase transition-all duration-500 ease-out ${
              tab === "ingredients"
                ? "bg-[rgba(255,215,90,0.18)] text-[#FFD75A] shadow-[0_0_16px_rgba(255,215,90,0.2)]"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            Ingredients
          </button>
        </div>

        {/* Tab content */}
        <div ref={itemsRef} className="mt-4 flex-1 overflow-hidden">
          {tab === "overview" ? (
            <div key={activeDish}>
              <p className="text-sm leading-relaxed text-white/70 min-h-[120px]">
                {displayed}
                <span
                  className="inline-block w-[2px] h-[1em] ml-[1px] align-text-bottom bg-[#FFD75A] animate-[blinkCursor_0.8s_step-end_infinite]"
                  style={{ opacity: done ? 0 : 1 }}
                />
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dish.info.map((item) => (
                  <div
                    key={item.label}
                    data-anim
                    className={`flex items-center justify-between rounded-xl px-3 py-2 bg-[rgba(255,215,90,0.05)] border border-[rgba(245,194,66,0.1)] shadow-[0_8px_24px_rgba(0,0,0,0.08)] ${
                      item.label === "Spice Level" ? "sm:col-span-2" : ""
                    }`}
                  >
                    <span className="text-xs text-white/60">{item.label}</span>
                    <span className="text-xs text-[#FFD75A]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              key={activeDish}
              className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 content-start"
            >
              {dish.ingredients.map((item) => (
                <div
                  key={item.name}
                  data-anim
                  className="flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-3 bg-[rgba(255,215,90,0.05)] border border-[rgba(245,194,66,0.1)] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                >
                  <span className="text-lg sm:text-xl">{item.emoji}</span>
                  <span className="text-[0.65rem] sm:text-xs text-white/80 text-center">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

