"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const header = headerRef.current;
      const info = infoRef.current;
      const form = formRef.current;

      gsap.set([header, info, form], { autoAlpha: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(header, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0)
        .to(info, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.2)
        .to(form, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.35);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section ref={sectionRef} id="contact" className={styles.section}>
      <div className={styles.bgGlow} />

      <div className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>Contact Us</span>
          <h2 className={styles.title}>Get in Touch</h2>
          <p className={styles.subtitle}>
            Whether you&apos;re craving answers or planning a feast, we&apos;re here to help.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Info Column */}
          <div ref={infoRef} className={styles.infoCol}>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>General Inquiries</h3>
              <p className={styles.infoText}>
                Have a question about our menu, your order, or anything else? Our
                team is always nearby&mdash;just reach out.
              </p>
              <div className={styles.contactRow}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email</span>
                  <a href="mailto:Mrbiryanica@gmail.com" className={styles.contactValue}>Mrbiryanica@gmail.com</a>
                </div>
                <div className={styles.contactDivider} />
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Phone</span>
                  <a href="tel:+19052409585" className={styles.contactValue}>+1 905-240-9585</a>
                </div>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Planning Something Special?</h3>
              <p className={styles.infoText}>
                We cater with the same soul we serve in-house. From intimate
                gatherings to grand celebrations, let Mr. Biryani bring the flavor
                to your event.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className={styles.formCard}>
            <h3 className={styles.formTitle}>Contact Us</h3>

            {submitted ? (
              <div className={styles.successMsg}>
                <span className={styles.successIcon}>&#10003;</span>
                <p>Message sent! We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.nameRow}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="firstName">First Name*</label>
                    <input id="firstName" type="text" className={styles.input} placeholder="First name" required />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lastName">Last Name*</label>
                    <input id="lastName" type="text" className={styles.input} placeholder="Last name" required />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email*</label>
                  <input id="email" type="email" className={styles.input} placeholder="you@example.com" required />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" className={styles.input} placeholder="+1 (___) ___-____" />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="message">How can we help you?</label>
                  <textarea id="message" className={styles.textarea} placeholder="Tell us about your question or event..." rows={5} />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
