"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomSelect from "./CustomSelect";
import styles from "./Reservation.module.css";

gsap.registerPlugin(ScrollTrigger);

const TIME_OPTIONS = [
  { label: "12:00 PM", value: "12:00" },
  { label: "1:00 PM", value: "13:00" },
  { label: "2:00 PM", value: "14:00" },
  { label: "7:00 PM", value: "19:00" },
  { label: "8:00 PM", value: "20:00" },
  { label: "9:00 PM", value: "21:00" },
];

const PARTY_OPTIONS = [
  { label: "1 Person", value: "1" },
  { label: "2 People", value: "2" },
  { label: "3 People", value: "3" },
  { label: "4 People", value: "4" },
  { label: "5 People", value: "5" },
  { label: "6 People", value: "6" },
  { label: "7+ People", value: "7+" },
];

export default function Reservation() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const orderBtnsRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const header = headerRef.current;
      const form = formRef.current;
      const orderBtns = orderBtnsRef.current;

      gsap.set([header, form, orderBtns], { autoAlpha: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(header, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0)
        .to(form, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.2)
        .to(orderBtns, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.4);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section ref={sectionRef} id="reservation" className={styles.section}>
      <div className={styles.bgGlow} />

      <div className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>Reserve Your Table</span>
          <h2 className={styles.title}>Book a Royal Feast</h2>
          <p className={styles.subtitle}>
            Secure your spot or order ahead — experience biryani crafted with centuries of tradition.
          </p>
        </div>

        {/* Form + Order Buttons */}
        <div className={styles.layout}>
          {/* Reservation Form */}
          <div ref={formRef} className={styles.formCard}>
            <h3 className={styles.formTitle}>Make a Reservation</h3>

            {submitted ? (
              <div className={styles.successMsg}>
                <span className={styles.successIcon}>&#10003;</span>
                <p>Reservation request sent! We&apos;ll confirm shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">Full Name</label>
                  <input id="name" type="text" className={styles.input} placeholder="Your name" required />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="date">Date</label>
                  <input id="date" type="date" className={styles.input} required />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="time">Time</label>
                  <CustomSelect id="time" placeholder="Select time" options={TIME_OPTIONS} />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="party">Party Size</label>
                  <CustomSelect id="party" placeholder="Select size" options={PARTY_OPTIONS} />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Reserve Table
                </button>
              </form>
            )}
          </div>

          {/* Order Now Buttons */}
          <div ref={orderBtnsRef} className={styles.orderSection}>
            <h3 className={styles.orderTitle}>Order Now</h3>
            <p className={styles.orderSubtitle}>
              Get biryani delivered hot to your door, or pick up at your convenience.
            </p>

            <div className={styles.orderBtns}>
              <a
                href="https://mrbiryanirestaurant.smartonlineorder.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.orderBtn} ${styles.orderDelivery}`}
              >
                <span className={styles.orderBtnLabel}>Delivery</span>
                <span className={styles.orderBtnSub}>30-45 min</span>
              </a>
              <a
                href="https://mrbiryanirestaurant.smartonlineorder.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.orderBtn} ${styles.orderPickup}`}
              >
                <span className={styles.orderBtnLabel}>Pickup</span>
                <span className={styles.orderBtnSub}>Ready in 20 min</span>
              </a>
            </div>

            <div className={styles.contactRow}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Call</span>
                <a href="tel:+19052409585" className={styles.contactValue}>+1 905-240-9585</a>
              </div>
              <div className={styles.contactDivider} />
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Hours</span>
                <span className={styles.contactValue}>11:30 AM – 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
