"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export const dishes = [
  {
    name: "Royal Chicken Biryani",
    plate: 1,
    img: "/imgs/hero-plate/plate1.png",
    overview:
      "A timeless biryani crafted with aromatic basmati rice, tender marinated chicken, and a blend of royal spices. Slow-cooked to perfection in the traditional dum style.",
    info: [
      { label: "Cook Time", value: "45 min" },
      { label: "Serves", value: "4 people" },
      { label: "Spice Level", value: "Medium" },
    ],
    ingredients: [
      { name: "Basmati Rice", emoji: "🌾" },
      { name: "Saffron", emoji: "🌸" },
      { name: "Chicken", emoji: "🍗" },
      { name: "Yogurt", emoji: "🥛" },
      { name: "Cardamom", emoji: "🫛" },
      { name: "Cloves", emoji: "🟤" },
      { name: "Ginger", emoji: "🫚" },
      { name: "Mint", emoji: "🌿" },
    ],
  },
  {
    name: "Mutton Shahi Biryani",
    plate: 2,
    img: "/imgs/hero-plate/plate2.png",
    overview:
      "Slow-cooked succulent mutton layered with fragrant rice, fried onions, and a rich blend of Mughlai spices. A regal dish fit for a feast.",
    info: [
      { label: "Cook Time", value: "90 min" },
      { label: "Serves", value: "6 people" },
      { label: "Spice Level", value: "High" },
    ],
    ingredients: [
      { name: "Mutton", emoji: "🥩" },
      { name: "Basmati Rice", emoji: "🌾" },
      { name: "Fried Onions", emoji: "🧅" },
      { name: "Red Chili", emoji: "🌶️" },
      { name: "Cinnamon", emoji: "🟫" },
      { name: "Bay Leaf", emoji: "🍃" },
      { name: "Ghee", emoji: "🧈" },
      { name: "Coriander", emoji: "🌱" },
    ],
  },
  {
    name: "Veg Dum Biryani",
    plate: 3,
    img: "/imgs/hero-plate/plate3.png",
    overview:
      "A vibrant medley of garden-fresh vegetables and basmati rice, steamed with saffron and whole spices in a sealed pot for an aromatic, wholesome experience.",
    info: [
      { label: "Cook Time", value: "35 min" },
      { label: "Serves", value: "3 people" },
      { label: "Spice Level", value: "Mild" },
    ],
    ingredients: [
      { name: "Mixed Veggies", emoji: "🥕" },
      { name: "Basmati Rice", emoji: "🌾" },
      { name: "Saffron", emoji: "🌸" },
      { name: "Cashews", emoji: "🥜" },
      { name: "Raisins", emoji: "🍇" },
      { name: "Star Anise", emoji: "⭐" },
      { name: "Peas", emoji: "🟢" },
      { name: "Coconut", emoji: "🥥" },
    ],
  },
  {
    name: "Prawn Masala Biryani",
    plate: 4,
    img: "/imgs/hero-plate/plate4.png",
    overview:
      "Juicy prawns tossed in a fiery masala, layered with basmati rice and coastal spices. A bold, flavorful biryani with a hint of the sea.",
    info: [
      { label: "Cook Time", value: "40 min" },
      { label: "Serves", value: "4 people" },
      { label: "Spice Level", value: "High" },
    ],
    ingredients: [
      { name: "Prawns", emoji: "🦐" },
      { name: "Basmati Rice", emoji: "🌾" },
      { name: "Tamarind", emoji: "🟤" },
      { name: "Curry Leaves", emoji: "🌿" },
      { name: "Mustard Seeds", emoji: "🟡" },
      { name: "Turmeric", emoji: "🟧" },
      { name: "Garlic", emoji: "🧄" },
      { name: "Lemon", emoji: "🍋" },
    ],
  },
];

export function useDishSync() {
  const [activeDish, setActiveDish] = useState(0);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseAutoRotate = useCallback(() => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      pauseTimerRef.current = null;
    }, 8000);
  }, []);

  const goToDish = useCallback((index: number) => {
    pauseAutoRotate();
    setActiveDish(index);
  }, [pauseAutoRotate]);

  const prevDish = useCallback(() => {
    pauseAutoRotate();
    setActiveDish((prev) => (prev - 1 + dishes.length) % dishes.length);
  }, [pauseAutoRotate]);

  const nextDish = useCallback(() => {
    pauseAutoRotate();
    setActiveDish((prev) => (prev + 1) % dishes.length);
  }, [pauseAutoRotate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pauseTimerRef.current) {
        setActiveDish((prev) => (prev + 1) % dishes.length);
      }
    }, 4000);

    return () => {
      clearInterval(interval);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return { activeDish, goToDish, prevDish, nextDish };
}
