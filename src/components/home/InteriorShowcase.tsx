"use client";

import Image from "next/image";
import styles from "./interior-showcase.module.css";

type Vehicle = {
  name: string;
  line: string;   // editorial one-liner
  spec: string;   // tracked sub-text
  image: string;  // interior asset
  alt: string;
};

const VEHICLES: Vehicle[] = [
  { name: "Hyundai Staria",   line: "Space that breathes with you", spec: "Premium Family · 7 Seats",    image: "/images/homepagescroll.jpg", alt: "Hyundai Staria" },
  { name: "GMC Yukon XL",     line: "Where the journey slows down", spec: "VIP · 7 Seats",              image: "/images/homepagescrol.jpg",     alt: "GMC Yukon XL" },
  { name: "Hyundai H1 Starex",line: "Room for every companion",     spec: "Comfortable Family · 7 Seats",image: "/images/homepagescrolll.jpg", alt: "Hyundai H1 Starex" },
  { name: "Toyota Hiace",     line: "Together, in comfort",         spec: "Group Travel · 11 Seats",     image: "/images/homepagescrollll.jpg",  alt: "Toyota Hiace" }
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
        {VEHICLES.map((v, i) => (
          <div key={v.name} className={styles.card} style={{ ["--index" as string]: i }}>
            <div className={styles.cardInner}>
              <Image
                src={v.image}
                alt={v.alt}
                fill
                sizes="(max-width: 768px) 100vw, 74rem"
                className={styles.image}
              />
              <div className={styles.caption}>
                <p className={styles.index}>
                  {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>
                <h3 className={styles.name}>{v.name}</h3>
                <p className={styles.spec}>{v.line} — {v.spec}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
