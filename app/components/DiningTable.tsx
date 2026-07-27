"use client";

import styles from "./DiningTable.module.css";
import { dishes } from "./useDishSync";

const TABLE_ROTATION = 43;

const STEAM_PUFFS = [
  { delay: 0.0, duration: 3.6, drift: -10, size: 52, left: 20, top: 35 },
  { delay: 0.4, duration: 4.0, drift: 14, size: 44, left: 75, top: 30 },
  { delay: 0.8, duration: 3.4, drift: -6, size: 56, left: 38, top: 50 },
  { delay: 1.2, duration: 3.8, drift: 18, size: 40, left: 62, top: 45 },
  { delay: 1.6, duration: 3.5, drift: -14, size: 48, left: 15, top: 55 },
  { delay: 2.0, duration: 4.2, drift: 8, size: 54, left: 82, top: 48 },
  { delay: 2.4, duration: 3.3, drift: -3, size: 42, left: 50, top: 38 },
  { delay: 2.8, duration: 3.9, drift: 16, size: 50, left: 28, top: 42 },
  { delay: 3.2, duration: 3.6, drift: -12, size: 46, left: 68, top: 52 },
  { delay: 3.6, duration: 4.1, drift: 5, size: 58, left: 45, top: 60 },
  { delay: 4.0, duration: 3.5, drift: -8, size: 44, left: 88, top: 38 },
  { delay: 4.4, duration: 3.8, drift: 12, size: 50, left: 10, top: 45 },
];

function Steam({ counterRotation }: { counterRotation: number }) {
  return (
    <div
      className={styles.steamContainer}
      style={{ transform: `rotate(${counterRotation}deg)` }}
    >
      {STEAM_PUFFS.map((puff, i) => (
        <div
          key={i}
          className={styles.steamPuff}
          style={{
            left: `${puff.left}%`,
            top: `${puff.top}%`,
            width: `${puff.size}px`,
            height: `${puff.size}px`,
            animationDuration: `${puff.duration}s`,
            animationDelay: `${puff.delay}s`,
            ["--puff-drift" as string]: `${puff.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function DiningTable({ activeDish }: { activeDish: number }) {
  const rotation = activeDish * 90;
  const counterRotation = -(TABLE_ROTATION + rotation);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.table}>
        {/* Plates - rotating orbit container */}
        <div
          className={styles.plateOrbit}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className={`${styles.plate} ${styles.plate0}`}>
            <div key={`p0-${activeDish}`} className={`${styles.plateInner} ${styles.plateInnerActive}`}>
              <img src={dishes[0].img} alt="" className={styles.plateImg} />
            </div>
            <Steam counterRotation={counterRotation} />
          </div>
          <div className={`${styles.plate} ${styles.plate45}`}>
            <div key={`p1-${activeDish}`} className={`${styles.plateInner} ${styles.plateInnerActive}`}>
              <img src={dishes[1].img} alt="" className={styles.plateImg} />
            </div>
            <Steam counterRotation={counterRotation} />
          </div>
          <div className={`${styles.plate} ${styles.plate90}`}>
            <div key={`p2-${activeDish}`} className={`${styles.plateInner} ${styles.plateInnerActive}`}>
              <img src={dishes[2].img} alt="" className={styles.plateImg} />
            </div>
            <Steam counterRotation={counterRotation} />
          </div>
          <div className={`${styles.plate} ${styles.plate180}`}>
            <div key={`p3-${activeDish}`} className={`${styles.plateInner} ${styles.plateInnerActive}`}>
              <img src={dishes[3].img} alt="" className={styles.plateImg} />
            </div>
            <Steam counterRotation={counterRotation} />
          </div>
        </div>
      </div>
    </div>
  );
}
