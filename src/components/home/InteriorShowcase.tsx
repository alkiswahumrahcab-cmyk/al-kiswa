"use client";

import Image from "next/image";
import styles from "./interior-showcase.module.css";
import { getVehicle, formatSeats } from "@/data/fleet";

type Vehicle = {
  id: string;
  line: string;   // editorial one-liner
  image: string;  // interior asset
};

const VEHICLES: Vehicle[] = [
  { id: "hyundai-staria", line: "Space that breathes with you", image: "/images/homepagescroll.jpg" },
  { id: "gmc-yukon-xl", line: "Where the journey slows down", image: "/images/homepagescrol.jpg" },
  { id: "hyundai-starex", line: "Room for every companion", image: "/images/homepagescrolll.jpg" },
  { id: "toyota-hiace", line: "Together, in comfort", image: "/images/homepagescrollll.jpg" }
];
// TODO: confirm interior assets exist. Alternate wide + macro shots, one warm grade.
// Do NOT fall back to exterior images.

export function InteriorShowcase() {
  const total = VEHICLES.length;
  return (
    <section className={styles.section} aria-label="Vehicle interiors">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>The Interior Experience</p>
        <h2 className={styles.heading}>Step Inside</h2>
        <p className={styles.sub}>
          Every journey begins in comfort. Explore the cabin of each vehicle in our fleet.
        </p>
        <p className={styles.sub} dir="rtl">تجربة المقصورة الفاخرة — راحة تليق بضيوف الرحمن</p>
      </div>

      <div className={styles.stack}>
        {VEHICLES.map((v, i) => {
          const fleetVehicle = getVehicle(v.id);
          if (!fleetVehicle) return null;
          return (
          <div key={fleetVehicle.name} className={styles.card} style={{ ["--index" as string]: i }}>
            <div className={styles.cardInner}>
              <Image
                src={v.image}
                alt={fleetVehicle.name}
                fill
                sizes="(max-width: 768px) 100vw, 74rem"
                className={styles.image}
              />
              <div className={styles.caption}>
                <p className={styles.index}>
                  {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>
                <h3 className={styles.name}>{fleetVehicle.name}</h3>
                <p className={styles.spec}>{v.line} — {fleetVehicle.categoryLabel} · {formatSeats(fleetVehicle)}</p>
              </div>
            </div>
          </div>
        )})}
      </div>
    </section>
  );
}
