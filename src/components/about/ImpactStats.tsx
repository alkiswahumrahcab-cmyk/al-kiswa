'use client'; // Required for Next.js App Router

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { COMPANY_STATS, SOCIAL_PROOF_MESSAGES } from "@/lib/stats";
import GlassCard from "@/components/ui/GlassCard";

// Easing function for smooth animation
function easeOutQuad(t: number): number {
  return t * (2 - t);
}

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

function AnimatedCounter({ target, duration = 2000, suffix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Guard 1: Prevent SSR hydration mismatch
    if (typeof window === "undefined") return;

    // Guard 2: IntersectionObserver — only animate when visible in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();

          // Guard 3: requestAnimationFrame for smooth, reliable animation
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuad(progress);
            const currentValue = easedProgress * target;

            setCount(parseFloat(currentValue.toFixed(decimals)));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              // Guard 4: Always set exact final value to prevent rounding errors
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of element is visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target, duration, decimals, hasAnimated]);

  return (
    <span ref={ref} className="counter-animated" data-fallback={`${decimals > 0 ? target.toFixed(decimals) : target.toLocaleString()}${suffix}`}>
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}{suffix}
    </span>
  );
}

function SocialProofTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // trigger fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SOCIAL_PROOF_MESSAGES.length);
        setFade(true); // trigger fade in
      }, 500); // 500ms fade transition
    }, 4000); // changes every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12 flex justify-center items-center">
      <div className="flex items-center space-x-2 bg-black/40 border border-white/5 px-6 py-2 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.1)]">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <p
          className={`text-green-500/80 text-xs transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {SOCIAL_PROOF_MESSAGES[currentIndex]}
        </p>
      </div>
    </div>
  );
}

export default function ImpactStats() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      aria-label="Company statistics and trust signals"
      className="py-20 md:py-24 relative overflow-hidden bg-neutral-900/30 border-y border-white/5 backdrop-blur-sm"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Canonical aggregateRating schema is in the page-level JSON-LD only — not here */}

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {COMPANY_STATS.map((stat, index) => (
            <GlassCard
              key={stat.id}
              delay={index * 0.1}
              className="flex flex-col items-center justify-center text-center p-8 group hover:border-gold-primary/50 transition-all duration-500 bg-black/60 border-white/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] h-full"
            >
              {/* Icon */}
              <div 
                className="mb-6 text-2xl md:text-3xl text-gold-primary p-4 bg-gold-primary/10 rounded-full group-hover:scale-110 transition-transform duration-300 border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black" 
                aria-hidden="true"
              >
                {stat.icon}
              </div>

              {/* Animated number — fallback to real number if JS fails */}
              <div 
                className="text-4xl md:text-5xl font-bold text-white mb-2 font-sans tracking-tight"
                role="img"
                aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
              >
                {isMounted ? (
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    decimals={"decimals" in stat ? stat.decimals : 0}
                    duration={2200}
                  />
                ) : (
                  // SEO fallback: real number visible to crawlers & non-JS users
                  <span className="counter-animated" data-fallback={`${"decimals" in stat ? stat.value.toFixed(stat.decimals!) : stat.value.toLocaleString()}${stat.suffix}`}>
                    {"decimals" in stat ? stat.value.toFixed(stat.decimals!) : stat.value.toLocaleString()}{stat.suffix}
                  </span>
                )}
              </div>

              {/* English label */}
              <p className="text-gray-300 text-sm font-medium uppercase tracking-[0.1em] mb-1">
                {stat.label}
              </p>

              {/* Arabic label */}
              <p
                className="text-gray-500 text-xs mb-3"
                dir="rtl"
                lang="ar"
                style={{ fontFamily: 'var(--font-tajawal)' }}
              >
                {stat.labelAr}
              </p>

              {/* Tooltip description on hover */}
              <p className="text-gray-400 text-xs mb-4 opacity-0 h-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-300">
                {stat.description}
              </p>

              {/* Micro-CTA Data Injection */}
              <Link
                href={stat.link}
                className="mt-auto text-xs text-gold-primary/80 hover:text-gold-primary border-b border-gold-primary/30 hover:border-gold-primary transition-colors pb-0.5"
              >
                {stat.ctaText}
              </Link>
            </GlassCard>
          ))}
        </div>

        {/* Social proof ticker */}
        <SocialProofTicker />

        {/* Trust reinforcement line below counters */}
        <p className="text-center text-gray-500 text-sm mt-8 italic" style={{ fontFamily: 'var(--font-tajawal)' }}>
          Figures reflect verified bookings and reviews since 2014 · أرقام موثقة منذ 2014
        </p>
      </div>
    </section>
  );
}
