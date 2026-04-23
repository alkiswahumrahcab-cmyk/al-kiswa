"use client";

/**
 * StickyBookingBar
 *
 * A fixed bottom action bar always visible on mobile.
 * Contains a primary "Book Now" button and a WhatsApp shortcut.
 * Handles iPhone safe-area-inset-bottom via inline style for the pb value
 * since Tailwind has no equivalent for env() CSS functions.
 *
 * @prop price      - Estimated fare in SAR (0 = not yet calculated)
 * @prop route      - Human-readable route string, e.g. "Jeddah → Makkah"
 * @prop date       - Journey date string, e.g. "2024-03-01"
 * @prop pax        - Passenger count
 * @prop onBook     - Callback fired when the primary button is tapped
 */

import React from "react";

export interface StickyBookingBarProps {
  price: number;
  route: string;
  date: string;
  pax: number;
  onBook: () => void;
}

export default function StickyBookingBar({
  price,
  route,
  date,
  pax,
  onBook,
}: StickyBookingBarProps) {
  const whatsappText = encodeURIComponent(
    `Salam, I want to book: ${route} on ${date} for ${pax} passengers`
  );
  const whatsappHref = `https://wa.me/966548707332?text=${whatsappText}`;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-[14px] pt-[10px]"
      /* env(safe-area-inset-bottom) has no Tailwind equivalent — inline style required */
      style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-[10px]">
        {/* Primary — Book Now */}
        <button
          type="button"
          onClick={onBook}
          className="flex-[2] h-[52px] bg-blue-700 text-white rounded-xl text-[15px] font-medium active:opacity-90 transition-opacity"
          aria-label={price > 0 ? `Book Now — SAR ${price}` : "Book Now"}
        >
          {price > 0 ? `Book Now — SAR ${price}` : "Book Now"}
        </button>

        {/* Secondary — WhatsApp */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-[52px] bg-green-50 text-green-900 rounded-xl text-[13px] font-medium flex items-center justify-center gap-[6px] active:opacity-90 transition-opacity"
          aria-label="Chat on WhatsApp"
        >
          {/* Filled green circle dot icon */}
          <span className="w-[20px] h-[20px] rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              className="w-[12px] h-[12px]"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </span>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
