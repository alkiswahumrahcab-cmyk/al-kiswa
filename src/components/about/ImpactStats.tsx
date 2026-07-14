'use client'; // Required for Next.js App Router

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { COMPANY_STATS, SOCIAL_PROOF_MESSAGES, SOCIAL_PROOF_MESSAGES_AR } from "@/lib/stats";
import GlassCard from "@/components/ui/GlassCard";

import { animate, useInView } from "framer-motion";

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

function AnimatedCounter({ target, duration = 2000, suffix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isInView) {
      const controls = animate(0, target, {
        duration: duration / 1000,
        ease: "easeOut",
        onUpdate(value) {
          setCount(parseFloat(value.toFixed(decimals)));
        },
        onComplete() {
          setCount(target);
        }
      });
      return () => controls.stop();
    }
  }, [isInView, target, duration, decimals]);

  return (
    <span ref={ref} className="counter-animated" data-fallback={`${decimals > 0 ? target.toFixed(decimals) : target.toLocaleString()}${suffix}`}>
      {decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}{suffix}
    </span>
  );
}

function SocialProofTicker({ lang = 'en' }: { lang?: 'ar' | 'en' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const messages = lang === 'ar' ? SOCIAL_PROOF_MESSAGES_AR : SOCIAL_PROOF_MESSAGES;

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="mt-12 flex justify-center items-center">
      <div className="flex items-center space-x-2 bg-card border border-border px-6 py-2 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.1)]">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <p
          className={`text-green-500/80 text-xs transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          {messages[currentIndex]}
        </p>
      </div>
    </div>
  );
}

interface Props {
  lang?: 'ar' | 'en';
}

export default function ImpactStats({ lang = 'en' }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      aria-label="Company statistics and trust signals"
      className="py-20 md:py-24 relative overflow-hidden bg-background border-y border-border backdrop-blur-sm"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {COMPANY_STATS.map((stat, index) => (
            <GlassCard
              key={stat.id}
              delay={index * 0.1}
              className="flex flex-col items-center justify-center text-center p-8 group hover:border-gold/50 transition-all duration-500 bg-card border-border hover:shadow-[0_0_20px_hsl(var(--gold-glow) / 0.15)] h-full"
            >
              <div 
                className="mb-6 text-2xl md:text-3xl text-gold p-4 bg-gold/10 rounded-btn group-hover:scale-110 transition-transform duration-300 border border-gold/20 group-hover:bg-gold group-hover:text-black" 
                aria-hidden="true"
              >
                {stat.icon}
              </div>

              <div 
                className="text-4xl md:text-5xl font-semibold text-foreground mb-2 font-display tracking-tight"
                role="img"
                aria-label={`${stat.value}${stat.suffix} ${lang === 'ar' ? stat.labelAr : stat.label}`}
              >
                {isMounted ? (
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals !== undefined ? stat.decimals : 0}
                    duration={2200}
                  />
                ) : (
                  <span className="counter-animated" data-fallback={`${stat.decimals !== undefined ? stat.value.toFixed(stat.decimals!) : stat.value.toLocaleString()}${stat.suffix}`}>
                    {stat.decimals !== undefined ? stat.value.toFixed(stat.decimals!) : stat.value.toLocaleString()}{stat.suffix}
                  </span>
                )}
              </div>

              {lang === 'ar' ? (
                <>
                  <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.1em] mb-1" style={{ fontFamily: 'var(--font-tajawal)' }}>
                    {stat.labelAr}
                  </p>
                  <p className="text-muted-foreground text-xs mb-3 font-sans uppercase tracking-widest">
                    {stat.label}
                  </p>
                  <p className="text-muted-foreground text-xs mb-4 opacity-0 h-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-300" style={{ fontFamily: 'var(--font-tajawal)' }}>
                    {stat.descriptionAr || stat.description}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.1em] mb-1">
                    {stat.label}
                  </p>
                  <p
                    className="text-muted-foreground text-xs mb-3"
                    dir="rtl"
                    lang="ar"
                    style={{ fontFamily: 'var(--font-tajawal)' }}
                  >
                    {stat.labelAr}
                  </p>
                  <p className="text-muted-foreground text-xs mb-4 opacity-0 h-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-300">
                    {stat.description}
                  </p>
                </>
              )}

              <Link
                href={lang === 'ar' && stat.link.startsWith('/') ? `/ar${stat.link}` : stat.link}
                className="mt-auto text-xs text-gold/80 hover:text-gold border-b border-gold/30 hover:border-gold transition-colors pb-0.5"
                style={lang === 'ar' ? { fontFamily: 'var(--font-tajawal)' } : {}}
              >
                {lang === 'ar' && stat.ctaTextAr ? stat.ctaTextAr : stat.ctaText}
              </Link>
            </GlassCard>
          ))}
        </div>

        <SocialProofTicker lang={lang} />

        <p className="text-center text-muted-foreground text-sm mt-8 italic" style={{ fontFamily: 'var(--font-tajawal)' }}>
          {lang === 'ar' ? 'أرقام موثقة منذ 2014 · Figures reflect verified bookings and reviews since 2014' : 'Figures reflect verified bookings and reviews since 2014 · أرقام موثقة منذ 2014'}
        </p>
      </div>
    </section>
  );
}
