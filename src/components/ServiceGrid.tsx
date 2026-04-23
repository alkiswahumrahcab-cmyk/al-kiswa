"use client";

/**
 * ServiceGrid
 *
 * A 2-column grid of tappable service/route cards.
 * Each card shows an icon, route title, subtitle, and price in SAR.
 * The entire card area is the tap target via Next.js <Link>.
 * Conforms to WCAG AA minimum tap target size (h-11 minimum enforced by card padding).
 *
 * @prop routes - Array of route objects to render (defaults to 4 hard-coded Umrah routes)
 */

import React from "react";
import Link from "next/link";

export interface ServiceRoute {
  title: string;
  subtitle: string;
  price: number;
  href: string;
  /** SVG path `d` attribute for the route icon, rendered in a 36×36 blue container */
  icon: React.ReactNode;
}

const DEFAULT_ROUTES: ServiceRoute[] = [
  {
    title: "Jeddah → Makkah",
    subtitle: "Airport · City transfers",
    price: 250,
    href: "/services/jeddah-makkah",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-blue-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.71.71m14.14 14.14.71.71M3 12H2m20 0h-1M4.93 19.07l.71-.71M18.36 5.64l.71-.71" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "Makkah → Madinah",
    subtitle: "Intercity · Private cab",
    price: 380,
    href: "/services/makkah-madinah",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-blue-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-10l6-3m0 16l5.447-2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m0 13V7" />
      </svg>
    ),
  },
  {
    title: "Ziyarat Tours",
    subtitle: "Holy sites · Group trips",
    price: 180,
    href: "/services/ziyarat-tours",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-blue-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Madinah Airport",
    subtitle: "Prince Mohammad Airport",
    price: 120,
    href: "/services/madinah-airport",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5 text-blue-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
];

export interface ServiceGridProps {
  routes?: ServiceRoute[];
}

export default function ServiceGrid({ routes = DEFAULT_ROUTES }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-2 gap-[10px] px-[14px]">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className="rounded-xl border border-gray-100 bg-white p-[14px] flex flex-col gap-[8px] active:scale-[0.98] transition-transform min-h-[44px]"
          aria-label={`${route.title} — from SAR ${route.price}`}
        >
          {/* Icon container 36×36 */}
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            {route.icon}
          </div>

          {/* Route title */}
          <p className="text-[13px] font-medium text-gray-900 leading-tight">
            {route.title}
          </p>

          {/* Subtitle */}
          <p className="text-[11px] text-gray-400 leading-tight -mt-[4px]">
            {route.subtitle}
          </p>

          {/* Price */}
          <p className="text-[13px] font-medium text-blue-700 mt-auto">
            SAR {route.price}
          </p>
        </Link>
      ))}
    </div>
  );
}
