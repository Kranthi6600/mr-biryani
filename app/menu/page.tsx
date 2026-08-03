"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES, MENU_ITEMS, type MenuItem } from "../components/menuData";
import styles from "./menu.module.css";

type CartItem = MenuItem & { qty: number };

const CATEGORY_EMOJIS: Record<string, string> = {
  "Soups": "🍲",
  "Veg Appetizers": "🥬",
  "Chicken Appetizers": "🍗",
  "Mutton Appetizers": "🥩",
  "Seafood Appetizers": "🦐",
  "Veg Tandoori": "🔥",
  "Chicken Tandoori": "🔥",
  "Mutton Tandoori": "🔥",
  "Veg Entrees": "🍛",
  "Egg Entrees": "🥚",
  "Chicken Entrees": "🍛",
  "Mutton Entrees": "🍛",
  "Fusion Biryanis/Pulavs": "🍚",
  "OG Dum Biryanis": "🍚",
  "Classic Arabian Mandis": "🫓",
  "Indo-Chinese": "🥘",
  "Sides": "🥗",
  "South Indian Breakfast": "🥞",
  "Lunch Specials": "🍱",
  "Little Royals Menu": "👶",
  "Coolers & Sips": "🥤",
  "Heavenly Delights": "🍮",
};

export default function MobileMenu() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const chipRowRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const cartItems = Object.values(cart);
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => {
    const price = parseFloat(i.price.replace(/[^0-9.]/g, "")) || 0;
    return s + price * i.qty;
  }, 0);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return MENU_ITEMS.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.desc.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
    );
  }, [search]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    CATEGORIES.forEach((cat) => {
      groups[cat] = MENU_ITEMS.filter((i) => i.category === cat);
    });
    return groups;
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => ({
      ...prev,
      [item.name]: { ...item, qty: (prev[item.name]?.qty || 0) + 1 },
    }));
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[name]) {
        next[name] = { ...next[name], qty: next[name].qty - 1 };
        if (next[name].qty <= 0) delete next[name];
      }
      return next;
    });
  };

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat);
    const el = sectionRefs.current[cat];
    if (el) {
      const targetTop = el.getBoundingClientRect().top + window.scrollY - 160;
      const startTop = window.scrollY;
      const distance = targetTop - startTop;
      const duration = Math.max(1200, Math.min(2400, Math.abs(distance) * 1.6));
      const startTime = performance.now();

      const animateScroll = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 7);
        window.scrollTo({ top: startTop + distance * eased });
        if (progress < 1) requestAnimationFrame(animateScroll);
      };
      requestAnimationFrame(animateScroll);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cat = entry.target.getAttribute("data-category");
            if (cat) setActiveCategory(cat);
          }
        });
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [search]);

  useEffect(() => {
    if (search) return;
    const chipRow = chipRowRef.current;
    if (!chipRow) return;
    const activeChip = chipRow.querySelector(`[data-cat="${activeCategory}"]`) as HTMLElement | null;
    if (activeChip) {
      const chipLeft = activeChip.offsetLeft;
      const chipWidth = activeChip.offsetWidth;
      const rowWidth = chipRow.clientWidth;
      const targetLeft = chipLeft - rowWidth / 2 + chipWidth / 2;
      const startLeft = chipRow.scrollLeft;
      const distance = targetLeft - startLeft;
      const duration = 600;
      const startTime = performance.now();

      const animateScroll = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        chipRow.scrollLeft = startLeft + distance * eased;
        if (progress < 1) requestAnimationFrame(animateScroll);
      };
      requestAnimationFrame(animateScroll);
    }
  }, [activeCategory, search]);

  return (
    <div className={styles.page}>
      {/* ---------- Sticky Top Block (header + search + chips) ---------- */}
      <div className={styles.stickyTop}>
        <header className={styles.header}>
          <Link href="/" className={styles.backBtn} aria-label="Back to home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className={styles.headerCenter}>
            <h1 className={styles.headerTitle}>Mr Biryani</h1>
            <span className={styles.headerSub}>Royal Kitchen</span>
          </div>
          <button
            className={styles.cartIconBtn}
            onClick={() => cartCount > 0 && setCartOpen(true)}
            aria-label="View cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </button>
        </header>

        {/* ---------- Search ---------- */}
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            className={styles.searchInput}
            placeholder="Search for dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.searchClear} onClick={() => setSearch("")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* ---------- Category Chips ---------- */}
        {!search && (
          <div className={styles.chipBar}>
            <div className={styles.chipRow} ref={chipRowRef}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  data-cat={cat}
                  className={`${styles.chip} ${activeCategory === cat ? styles.chipActive : ""}`}
                  onClick={() => scrollToCategory(cat)}
                >
                  <span className={styles.chipEmoji}>{CATEGORY_EMOJIS[cat] || "🍽️"}</span>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ---------- Search Results (attached below sticky block) ---------- */}
      {search && filteredItems && (
        <div className={styles.searchDropdown}>
          <p className={styles.resultsCount}>
            {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""}
          </p>
          <div className={styles.searchDropdownList}>
            {filteredItems.length === 0 ? (
              <p className={styles.cartEmpty}>No dishes found</p>
            ) : (
              filteredItems.map((item) => (
                <ProductCard
                  key={item.name}
                  item={item}
                  qty={cart[item.name]?.qty || 0}
                  onAdd={() => addToCart(item)}
                  onRemove={() => removeFromCart(item.name)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* ---------- Content ---------- */}
      <div className={styles.content}>
        {CATEGORIES.map((cat) => {
            const items = groupedItems[cat];
            if (!items || items.length === 0) return null;
            return (
              <div
                key={cat}
                ref={(el) => { sectionRefs.current[cat] = el; }}
                data-category={cat}
                className={styles.categorySection}
              >
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryEmoji}>{CATEGORY_EMOJIS[cat] || "🍽️"}</span>
                  <h2 className={styles.categoryTitle}>{cat}</h2>
                  <span className={styles.categoryCount}>{items.length}</span>
                </div>
                <div className={styles.itemList}>
                  {items.map((item) => (
                    <ProductCard
                      key={item.name}
                      item={item}
                      qty={cart[item.name]?.qty || 0}
                      onAdd={() => addToCart(item)}
                      onRemove={() => removeFromCart(item.name)}
                    />
                  ))}
                </div>
              </div>
            );
          })
        }
        <div className={styles.bottomSpacer} />
      </div>

      {/* ---------- Cart Bar ---------- */}
      {cartCount > 0 && !cartOpen && (
        <button className={styles.cartBar} onClick={() => setCartOpen(true)}>
          <div className={styles.cartBarLeft}>
            <span className={styles.cartBarCount}>{cartCount} item{cartCount !== 1 ? "s" : ""}</span>
            <span className={styles.cartBarTotal}>₹{cartTotal.toFixed(0)}</span>
          </div>
          <span className={styles.cartBarBtn}>
            View Cart
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      )}

      {/* ---------- Cart Sheet ---------- */}
      {cartOpen && (
        <div className={styles.cartOverlay} onClick={() => setCartOpen(false)}>
          <div className={styles.cartSheet} onClick={(e) => e.stopPropagation()}>
            <div className={styles.cartSheetHeader}>
              <h2 className={styles.cartSheetTitle}>Your Cart</h2>
              <button className={styles.cartSheetClose} onClick={() => setCartOpen(false)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className={styles.cartSheetBody}>
              {cartItems.length === 0 ? (
                <p className={styles.cartEmpty}>Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.name} className={styles.cartRow}>
                    <div className={styles.cartRowInfo}>
                      <h3 className={styles.cartRowName}>{item.name}</h3>
                      <span className={styles.cartRowPrice}>{item.price}</span>
                    </div>
                    <div className={styles.qtyControl}>
                      <button className={styles.qtyBtn} onClick={() => removeFromCart(item.name)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                          <path d="M5 12h14" />
                        </svg>
                      </button>
                      <span className={styles.qtyValue}>{item.qty}</span>
                      <button className={styles.qtyBtn} onClick={() => addToCart(item)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className={styles.cartSheetFooter}>
                <div className={styles.cartSheetTotal}>
                  <span>Total</span>
                  <span className={styles.cartSheetTotalValue}>₹{cartTotal.toFixed(0)}</span>
                </div>
                <button className={styles.checkoutBtn}>
                  Checkout
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({
  item,
  qty,
  onAdd,
  onRemove,
}: {
  item: MenuItem;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const emoji = CATEGORY_EMOJIS[item.category] || "🍽️";
  return (
    <div className={styles.productCard}>
      <div className={styles.productImgPlaceholder}>
        <span className={styles.productEmoji}>{emoji}</span>
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{item.name}</h3>
        <p className={styles.productDesc}>{item.desc}</p>
        <span className={styles.productPrice}>{item.price}</span>
      </div>
      <div className={styles.productAction}>
        {qty > 0 ? (
          <div className={styles.qtyControl}>
            <button className={styles.qtyBtn} onClick={onRemove}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M5 12h14" />
              </svg>
            </button>
            <span className={styles.qtyValue}>{qty}</span>
            <button className={styles.qtyBtn} onClick={onAdd}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        ) : (
          <button className={styles.addBtn} onClick={onAdd}>
            ADD
          </button>
        )}
      </div>
    </div>
  );
}
