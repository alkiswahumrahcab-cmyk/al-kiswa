"use client";

/**
 * BookingForm
 *
 * A 3-step inline booking form with live fare preview.
 * No page navigation — step state is managed locally via useState.
 *
 * Step 1 — Journey: route type, pickup/dropoff, popular hotel chips,
 *           date/time grid, passenger stepper, live price preview block.
 * Step 2 — Vehicle: selectable full-row vehicle cards.
 * Step 3 — Details: passenger name, WhatsApp number, optional flight number,
 *           and final confirm button.
 *
 * Estimated price = BASE_PRICE[routeType] × VEHICLE_MULTIPLIER[vehicle]
 * Updated live whenever routeType or selectedVehicle changes.
 */

import React, { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type RouteType = "Intercity" | "Airport" | "Ziyarat";
type VehicleId = "camry" | "staria" | "hiace" | "yukon";

interface Vehicle {
  id: VehicleId;
  name: string;
  capacity: string;
  features: string;
  priceMultiplier: number;
}

const ROUTE_TYPES: RouteType[] = ["Intercity", "Airport", "Ziyarat"];

const BASE_PRICES: Record<RouteType, number> = {
  Intercity: 380,
  Airport: 250,
  Ziyarat: 180,
};

const VEHICLES: Vehicle[] = [
  { id: "camry",  name: "Toyota Camry",    capacity: "1–3 pax",   features: "Sedan · AC · Private",         priceMultiplier: 1.0 },
  { id: "staria", name: "Hyundai Staria",  capacity: "Up to 9",   features: "MPV · AC · Spacious",          priceMultiplier: 1.3 },
  { id: "hiace",  name: "Toyota Hiace",    capacity: "Up to 12",  features: "Minibus · AC · Group-ready",   priceMultiplier: 1.5 },
  { id: "yukon",  name: "GMC Yukon XL",    capacity: "Up to 7",   features: "SUV · Luxury · AC",            priceMultiplier: 1.8 },
];

const POPULAR_HOTELS: string[] = [
  "Swissôtel Makkah",
  "Hilton Towers",
  "Pullman Zamzam",
  "Dar Al Tawhid",
  "Anwar Al Madinah",
];

const COUNTRY_CODES = [
  { code: "+44",  label: "🇬🇧 UK" },
  { code: "+1",   label: "🇺🇸 US" },
  { code: "+1",   label: "🇨🇦 CA" },
  { code: "+966", label: "🇸🇦 SA" },
  { code: "+971", label: "🇦🇪 UAE" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** 3-dot step progress indicator */
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-[6px] justify-center py-[14px]" aria-label={`Step ${current} of 3`}>
      {[1, 2, 3].map((s) => (
        <span
          key={s}
          className={
            s === current
              ? "bg-blue-700 w-[24px] h-[6px] rounded-full transition-all duration-300"
              : "bg-gray-200 w-[6px] h-[6px] rounded-full transition-all duration-300"
          }
        />
      ))}
    </div>
  );
}

/** Location SVG pin icon — rendered inside input left-padding slot */
function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-4 h-4 text-gray-400"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BookingForm() {
  // Step state
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 state
  const [routeType, setRouteType] = useState<RouteType>("Intercity");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pax, setPax] = useState(1);

  // Step 2 state
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleId>("camry");

  // Step 3 state
  const [passengerName, setPassengerName] = useState("");
  const [countryCode, setCountryCode] = useState("+44");
  const [phone, setPhone] = useState("");
  const [flightNumber, setFlightNumber] = useState("");

  // Derived: live estimated price
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  useEffect(() => {
    const vehicle = VEHICLES.find((v) => v.id === selectedVehicle);
    if (!vehicle) return;
    const base = BASE_PRICES[routeType];
    setEstimatedPrice(Math.round(base * vehicle.priceMultiplier));
  }, [routeType, selectedVehicle]);

  // Whether to surface the price preview (step 1 only, route always selected)
  const showPricePreview = step === 1;

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleNextStep() {
    if (step < 3) setStep((s) => (s + 1) as 1 | 2 | 3);
  }

  function handlePrevStep() {
    if (step > 1) setStep((s) => (s - 1) as 1 | 2 | 3);
  }

  function handleConfirm() {
    const whatsappText = encodeURIComponent(
      `Salam! I'd like to confirm a booking:\n\nRoute: ${routeType} — ${pickup} → ${dropoff}\nDate: ${date} at ${time}\nPassengers: ${pax}\nVehicle: ${VEHICLES.find((v) => v.id === selectedVehicle)?.name}\nName: ${passengerName}\nPhone: ${countryCode}${phone}${flightNumber ? `\nFlight: ${flightNumber}` : ""}\nEstimated Fare: SAR ${estimatedPrice}`
    );
    window.open(`https://wa.me/966548707332?text=${whatsappText}`, "_blank");
  }

  // ── Shared input class ─────────────────────────────────────────────────────
  const inputClass =
    "w-full h-[52px] rounded-xl border border-gray-200 px-[14px] text-[15px] text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors bg-white";

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Step indicator */}
      <StepIndicator current={step} />

      <div className="px-[14px] pb-[14px]">

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* STEP 1 — Journey                                                  */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="flex flex-col gap-[12px]">
            {/* Route type pill selector */}
            <div className="flex gap-[8px]" role="group" aria-label="Select route type">
              {ROUTE_TYPES.map((rt) => (
                <button
                  key={rt}
                  type="button"
                  onClick={() => setRouteType(rt)}
                  className={`flex-1 h-[40px] rounded-lg text-[12px] font-medium transition-colors ${
                    routeType === rt
                      ? "bg-blue-700 text-white"
                      : "bg-gray-50 text-gray-500 border border-gray-100"
                  }`}
                  aria-pressed={routeType === rt}
                >
                  {rt}
                </button>
              ))}
            </div>

            {/* Pickup field with pin icon */}
            <div className="relative">
              <span className="absolute left-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
                <PinIcon />
              </span>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Pickup location"
                className={`${inputClass} pl-[42px]`}
                aria-label="Pickup location"
              />
            </div>

            {/* Dropoff field with pin icon */}
            <div className="relative">
              <span className="absolute left-[14px] top-1/2 -translate-y-1/2 pointer-events-none">
                <PinIcon />
              </span>
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Dropoff location"
                className={`${inputClass} pl-[42px]`}
                aria-label="Dropoff location"
              />
            </div>

            {/* Popular hotel chips */}
            <div className="flex flex-wrap gap-[6px]" role="group" aria-label="Popular hotel shortcuts">
              {POPULAR_HOTELS.map((hotel) => (
                <button
                  key={hotel}
                  type="button"
                  onClick={() => setDropoff(hotel)}
                  className="text-[11px] py-1 px-[10px] rounded-full bg-gray-50 border border-gray-100 text-gray-500 active:bg-blue-50 active:border-blue-200 active:text-blue-700 transition-colors min-h-[28px]"
                >
                  {hotel}
                </button>
              ))}
            </div>

            {/* Date + Time grid */}
            <div className="grid grid-cols-2 gap-[8px]">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
                aria-label="Journey date"
                min={new Date().toISOString().split("T")[0]}
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={inputClass}
                aria-label="Departure time"
              />
            </div>

            {/* Passenger stepper */}
            <div
              className="h-[52px] rounded-xl border border-gray-200 flex items-center justify-between px-[14px]"
              role="group"
              aria-label="Passenger count"
            >
              <span className="text-[14px] text-gray-400">Passengers</span>
              <div className="flex items-center gap-[12px]">
                <button
                  type="button"
                  onClick={() => setPax((p) => Math.max(1, p - 1))}
                  className="w-[32px] h-[32px] rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 text-lg font-medium active:bg-gray-100 transition-colors"
                  aria-label="Decrease passengers"
                  disabled={pax <= 1}
                >
                  −
                </button>
                <span className="text-[15px] font-medium min-w-[20px] text-center text-gray-900">
                  {pax}
                </span>
                <button
                  type="button"
                  onClick={() => setPax((p) => Math.min(20, p + 1))}
                  className="w-[32px] h-[32px] rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 text-lg font-medium active:bg-gray-100 transition-colors"
                  aria-label="Increase passengers"
                  disabled={pax >= 20}
                >
                  +
                </button>
              </div>
            </div>

            {/* ★ Live price preview — most important UX element ★ */}
            {showPricePreview && (
              <div className="bg-blue-50 rounded-xl p-[12px] flex justify-between items-center">
                <div>
                  <p className="text-[12px] text-blue-900 font-medium">Estimated fare</p>
                  <p className="text-[11px] text-blue-400 mt-[2px]">Fixed · No hidden fees</p>
                </div>
                <p className="text-[20px] font-medium text-blue-700">
                  SAR {estimatedPrice}
                </p>
              </div>
            )}

            {/* Next CTA */}
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full h-[52px] bg-blue-700 text-white rounded-xl text-[15px] font-medium active:opacity-90 transition-opacity mt-[2px]"
            >
              Choose Vehicle
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* STEP 2 — Vehicle Selection                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="flex flex-col">
            <p className="text-[13px] text-gray-400 mb-[12px]">
              Select your vehicle — price updates live
            </p>

            {VEHICLES.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;
              const vehiclePrice = Math.round(BASE_PRICES[routeType] * vehicle.priceMultiplier);
              return (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`flex items-center gap-[12px] p-[12px] rounded-xl border-[1.5px] mb-[8px] cursor-pointer transition-colors w-full text-left ${
                    isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                  aria-pressed={isSelected}
                  aria-label={`${vehicle.name} — ${vehicle.capacity} — SAR ${vehiclePrice}`}
                >
                  {/* Vehicle thumbnail placeholder */}
                  <div className="w-[52px] h-[40px] rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 52 40" fill="none" className="w-[36px] h-[28px] text-gray-400" aria-hidden="true">
                      <path d="M6 28h40M10 28l3-10h26l3 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="16" cy="30" r="3" stroke="currentColor" strokeWidth="2" />
                      <circle cx="36" cy="30" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Vehicle info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-gray-900">{vehicle.name}</p>
                    <p className="text-[12px] text-gray-400 mt-[2px] truncate">
                      {vehicle.capacity} · {vehicle.features}
                    </p>
                  </div>

                  {/* Price */}
                  <p className="text-[14px] font-medium text-blue-700 ml-auto flex-shrink-0">
                    SAR {vehiclePrice}
                  </p>
                </button>
              );
            })}

            {/* Navigation buttons */}
            <div className="flex gap-[8px] mt-[4px]">
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex-1 h-[52px] bg-gray-50 text-gray-600 rounded-xl text-[15px] font-medium border border-gray-200 active:opacity-80 transition-opacity"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-[2] h-[52px] bg-blue-700 text-white rounded-xl text-[15px] font-medium active:opacity-90 transition-opacity"
              >
                Enter Details
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* STEP 3 — Passenger Details                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="flex flex-col gap-[12px]">
            {/* Name field */}
            <input
              type="text"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              placeholder="Your full name"
              className={inputClass}
              autoComplete="name"
              aria-label="Full name"
            />

            {/* WhatsApp number with country code selector */}
            <div className="flex gap-[8px]">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="h-[52px] rounded-xl border border-gray-200 px-[10px] text-[15px] text-gray-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none bg-white flex-shrink-0 w-[90px]"
                aria-label="Country code"
              >
                {COUNTRY_CODES.map((cc) => (
                  <option key={`${cc.code}-${cc.label}`} value={cc.code}>
                    {cc.label}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp number"
                className={`${inputClass} flex-1`}
                autoComplete="tel"
                inputMode="tel"
                aria-label="WhatsApp phone number"
              />
            </div>

            {/* Optional flight number */}
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              placeholder="Flight number (optional)"
              className={inputClass}
              aria-label="Flight number (optional)"
            />

            {/* Summary price preview */}
            <div className="bg-blue-50 rounded-xl p-[12px] flex justify-between items-center">
              <div>
                <p className="text-[12px] text-blue-900 font-medium">Total fare</p>
                <p className="text-[11px] text-blue-400 mt-[2px]">Fixed · No hidden fees</p>
              </div>
              <p className="text-[20px] font-medium text-blue-700">SAR {estimatedPrice}</p>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-[8px]">
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex-1 h-[52px] bg-gray-50 text-gray-600 rounded-xl text-[15px] font-medium border border-gray-200 active:opacity-80 transition-opacity"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-[2] h-[52px] bg-blue-700 text-white rounded-xl text-[15px] font-medium active:opacity-90 transition-opacity"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
