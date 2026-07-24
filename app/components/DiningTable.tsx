"use client";

import styles from "./DiningTable.module.css";
import { dishes } from "./useDishSync";

export default function DiningTable({ activeDish }: { activeDish: number }) {
  const rotation = activeDish * 90;

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
          </div>
          <div className={`${styles.plate} ${styles.plate45}`}>
            <div key={`p1-${activeDish}`} className={`${styles.plateInner} ${styles.plateInnerActive}`}>
              <img src={dishes[1].img} alt="" className={styles.plateImg} />
            </div>
          </div>
          <div className={`${styles.plate} ${styles.plate90}`}>
            <div key={`p2-${activeDish}`} className={`${styles.plateInner} ${styles.plateInnerActive}`}>
              <img src={dishes[2].img} alt="" className={styles.plateImg} />
            </div>
          </div>
          <div className={`${styles.plate} ${styles.plate180}`}>
            <div key={`p3-${activeDish}`} className={`${styles.plateInner} ${styles.plateInnerActive}`}>
              <img src={dishes[3].img} alt="" className={styles.plateImg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
