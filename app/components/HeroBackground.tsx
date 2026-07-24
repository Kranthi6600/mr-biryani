import styles from "./HeroBackground.module.css";

export default function HeroBackground() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      {/* Base matte-black gradient */}
      <div className={styles.base} />

      {/* Large soft golden radial glows in different corners */}
      <div className={`${styles.glow} ${styles.glowTopLeft}`} />
      <div className={`${styles.glow} ${styles.glowBottomRight}`} />
      <div className={`${styles.glow} ${styles.glowCenter}`} />

      {/* Oversized blurred abstract blobs / organic curved shapes */}
      <div className={`${styles.blob} ${styles.blobOne}`} />
      <div className={`${styles.blob} ${styles.blobTwo}`} />
      <div className={`${styles.blob} ${styles.blobThree}`} />

      {/* Subtle glass-like light reflections */}
      <div className={`${styles.reflection} ${styles.reflectionOne}`} />
      <div className={`${styles.reflection} ${styles.reflectionTwo}`} />

      {/* Soft golden ambient lighting overlay */}
      <div className={styles.ambient} />

      {/* Tiny noise / grain texture for realism */}
      <div className={styles.grain} />

      {/* Vignette for premium depth & high contrast */}
      <div className={styles.vignette} />
    </div>
  );
}
