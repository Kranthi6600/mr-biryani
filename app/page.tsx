"use client";

import Image from "next/image";
import HeroBackground from "./components/HeroBackground";
import DiningTable from "./components/DiningTable";
import Overview from "./components/Overview";
import { useDishSync, dishes } from "./components/useDishSync";
import MenuBook from "./components/MenuBook";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Experience from "./components/Experience";
import CookingProcess from "./components/CookingProcess";
import StatsCounter from "./components/StatsCounter";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";

export default function Home() {
  const { activeDish, goToDish, prevDish, nextDish } = useDishSync();

  return (
    <>
      <CustomCursor />
      <Loader />

      {/* ==================== HERO SECTION ==================== */}
      <section id="hero" className="fixed inset-0 z-10 overflow-hidden">
        <HeroBackground />
        <Overview activeDish={activeDish} goToDish={goToDish} />
        <main className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <DiningTable activeDish={activeDish} />
        </main>

        {/* Dish name above thumbnails */}
        <div className="absolute z-30 left-1/2" style={{ bottom: "380px", transform: "translateX(calc(-50% + 40px))" }}>
          <div key={activeDish} className="animate-[dishNameReveal_0.5s_cubic-bezier(0.33,1,0.68,1)] flex items-center gap-3" style={{ animationFillMode: "both" }}>
            <div className="h-12 w-[3px] rounded-full" style={{ background: "linear-gradient(180deg, transparent, #0f0805, transparent)" }} />
            <div>
              <span
                className="block font-bold uppercase animate-[dishLineUp_0.6s_cubic-bezier(0.33,1,0.68,1)]"
                style={{
                  animationFillMode: "both",
                  fontFamily: "var(--font-cinzel-decorative), serif",
                  fontSize: "1.4rem",
                  letterSpacing: "0.35em",
                  color: "#0f0805",
                  opacity: 0.5,
                }}
              >
                {dishes[activeDish].name.split(" ").slice(0, -1).join(" ")}
              </span>
              <h2
                className="font-bold italic tracking-[-0.01em] animate-[dishLineUpBold_0.7s_cubic-bezier(0.33,1,0.68,1)_0.1s]"
                style={{
                  animationFillMode: "both",
                  fontFamily: "var(--font-cinzel), serif",
                  fontSize: "5.5rem",
                  lineHeight: 1,
                  color: "#0f0805",
                }}
              >
                {dishes[activeDish].name.split(" ").slice(-1).join(" ")}
              </h2>
            </div>
          </div>
        </div>

        {/* Bottom thumbnail strip with arrows */}
        <div className="absolute bottom-24 left-1/2 z-30 flex items-center gap-3" style={{ transform: "translateX(calc(-50% - 40px))" }}>
          <button
            onClick={prevDish}
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#1a0f05]/90 border border-[rgba(245,194,66,0.15)] text-[#FFD75A]/70 hover:text-[#FFD75A] hover:border-[rgba(255,215,90,0.4)] transition-all duration-300 cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_28px_rgba(255,215,90,0.15)]"
            aria-label="Previous dish"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="relative flex items-start" style={{ gap: "40px" }}>
            <div
              className="absolute top-0 bottom-0 left-0 w-32 rounded-2xl bg-[#1a0f05] p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_24px_rgba(245,194,66,0.15),inset_0_1px_2px_rgba(255,215,90,0.08)] transition-transform duration-500 ease-out z-0"
              style={{ transform: `translateX(${activeDish * 168}px)` }}
            />
            {dishes.map((d, i) => (
              <button
                key={d.plate}
                onClick={() => goToDish(i)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-500 ease-out relative z-10 ${
                  i === activeDish
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-70"
                }`}
                aria-label={d.name}
              >
                <div className="w-32 rounded-2xl p-2.5">
                  <Image
                    key={i === activeDish ? `active-${activeDish}` : `inactive-${i}`}
                    src={d.img}
                    alt={d.name}
                    width={96}
                    height={96}
                    className={`w-24 h-24 object-cover rounded-full mx-auto ${
                      i === activeDish ? "shadow-[0_0_16px_1px_rgba(255,215,90,0.2),0_4px_16px_rgba(255,215,90,0.08)] animate-[platePop_0.6s_cubic-bezier(0.33,1,0.68,1)]" : ""
                    }`}
                  />
                  <span className={`block text-sm font-bold tracking-[0.1em] uppercase text-center leading-tight mt-2 transition-all duration-300 ${
                    i === activeDish ? "text-[#FFD75A] opacity-100" : "text-white/40 opacity-0"
                  }`}>
                    {d.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={nextDish}
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#1a0f05]/90 border border-[rgba(245,194,66,0.15)] text-[#FFD75A]/70 hover:text-[#FFD75A] hover:border-[rgba(255,215,90,0.4)] transition-all duration-300 cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_28px_rgba(255,215,90,0.15)]"
            aria-label="Next dish"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </section>

      {/* Spacer to enable scrolling past the fixed hero */}
      <div className="h-screen w-full" aria-hidden="true" style={{ background: "linear-gradient(135deg, #E8AB30 0%, #D4951A 40%, #B88015 100%)" }} />

      {/* ==================== SCROLLABLE SECTIONS ==================== */}
      <MenuBook />

      <About />

      <Experience />

      <CookingProcess />

      <StatsCounter />

      <Gallery />

      <Reservation />

      <Footer />
    </>
  );
}
