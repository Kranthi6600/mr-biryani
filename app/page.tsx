"use client";

import Link from "next/link";
import MobileHero from "./components/MobileHero";
import MenuBook from "./components/MenuBook";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Experience from "./components/Experience";
import CookingProcess from "./components/CookingProcess";
import StatsCounter from "./components/StatsCounter";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Reservation from "./components/Reservation";
import Contact from "./components/Contact";
import Locations from "./components/Locations";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Loader />

      {/* ==================== HERO: mobile & tablet only ==================== */}
      <MobileHero />

      {/* ==================== 1st SECTION: Kitchen to Plate ==================== */}
      <CookingProcess />

      {/* ==================== 2nd SECTION: Menu Book ==================== */}
      <MenuBook />

      <About />

      <Experience />

      <StatsCounter />

      <Gallery />

      <Locations />

      <Reservation />

      <Contact />

      <Footer />

      {/* Floating Menu button — mobile only */}
      <Link
        href="/menu"
        className="md:hidden fixed bottom-5 right-5 z-50 flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm shadow-lg active:scale-95 transition-transform"
        style={{
          background: "linear-gradient(135deg, #E8AB30 0%, #D4951A 100%)",
          color: "#1a0f05",
          boxShadow: "0 8px 28px rgba(232, 171, 48, 0.4)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
        Menu
      </Link>
    </>
  );
}
