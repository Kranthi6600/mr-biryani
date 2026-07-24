import styles from "./GlassPanel.module.css";

export default function GlassPanel() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      {/* Outer ambient shadow for floating effect */}
      <div className={styles.shadow} />

      {/* Main glass panel */}
      <div className={styles.panel}>
        {/* Inner glow along edges */}
        <div className={styles.innerGlow} />

        {/* Golden rim lighting */}
        <div className={styles.rim} />

        {/* Glass reflections near top corners */}
        <div className={`${styles.reflection} ${styles.reflectionLeft}`} />
        <div className={`${styles.reflection} ${styles.reflectionRight}`} />

        {/* Fine glass grain */}
        <div className={styles.grain} />

        {/* Depth layers */}
        <div className={styles.depthLayer} />
      </div>
    </div>
  );
}
