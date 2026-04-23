"use client";

/**
 * FleetScroll
 *
 * A horizontally scrolling fleet showcase row.
 * The partial visibility of the 3rd+ card (~40 px) signals scrollability to the user.
 * Scrollbar is hidden via inline style since Tailwind's `scrollbar-hide` utility
 * requires an additional plugin not confirmed in this project's config.
 *
 * @prop vehicles - Array of vehicle objects (defaults to 4 hard-coded fleet vehicles)
 */

import React from "react";
import Image from "next/image";

export interface FleetVehicle {
  name: string;
  /** Max passenger capacity */
  capacity: number;
  /** Starting price in SAR */
  priceFrom: number;
  /** Optional image path served from /public */
  imageSrc?: string;
}

const DEFAULT_VEHICLES: FleetVehicle[] = [
  {
    name: "GMC Yukon XL",
    capacity: 7,
    priceFrom: 450,
    imageSrc: "/images/fleet/gmc-yukon.jpg",
  },
  {
    name: "Hyundai Staria",
    capacity: 9,
    priceFrom: 320,
    imageSrc: "/images/fleet/hyundai-staria.jpg",
  },
  {
    name: "Toyota Hiace",
    capacity: 12,
    priceFrom: 280,
    imageSrc: "/images/fleet/toyota-hiace.jpg",
  },
  {
    name: "Toyota Camry",
    capacity: 3,
    priceFrom: 200,
    imageSrc: "/images/fleet/toyota-camry.jpg",
  },
];

export interface FleetScrollProps {
  vehicles?: FleetVehicle[];
}

/** Fallback SVG shown when no image is available */
function CarPlaceholder() {
  return (
    <svg
      viewBox="0 0 64 40"
      fill="none"
      className="w-[72px] h-[48px] text-gray-300"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 28h48M12 28l4-12h32l4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="30" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="46" cy="30" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16h10M38 16h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function FleetScroll({ vehicles = DEFAULT_VEHICLES }: FleetScrollProps) {
  return (
    <div
      className="flex gap-[10px] px-[14px] overflow-x-auto pb-2"
      /* scrollbar-hide plugin not confirmed — use inline style for cross-browser compat */
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      role="list"
      aria-label="Available fleet vehicles"
    >
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.name}
          role="listitem"
          className="w-[160px] flex-shrink-0 rounded-xl border border-gray-100 bg-white overflow-hidden"
        >
          {/* Vehicle image area */}
          <div className="h-[90px] bg-gray-50 flex items-center justify-center relative overflow-hidden">
            {vehicle.imageSrc ? (
              <Image
                src={vehicle.imageSrc}
                alt={vehicle.name}
                fill
                sizes="160px"
                className="object-cover"
                onError={() => {/* Next.js Image handles srcset; fallback handled below */}}
              />
            ) : (
              <CarPlaceholder />
            )}
          </div>

          {/* Vehicle info */}
          <div className="p-[10px]">
            <p className="text-[13px] font-medium text-gray-900 leading-tight truncate">
              {vehicle.name}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Up to {vehicle.capacity} passengers
            </p>
            <p className="text-[12px] font-medium text-blue-700 mt-[6px]">
              From SAR {vehicle.priceFrom}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
