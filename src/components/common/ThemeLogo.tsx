'use client';

import React from 'react';

interface ThemeLogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  useWhiteText?: boolean;
}

export default function ThemeLogo({ className = "", useWhiteText = false }: ThemeLogoProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
        <div className="flex items-center gap-3">
            <span className={`text-xl md:text-2xl font-display font-semibold tracking-wide uppercase transition-colors hover:text-gold ${useWhiteText ? 'text-white' : 'text-ink'}`}>
                Al Kiswah
            </span>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-[0.65rem] md:text-[0.7rem] font-bold text-gold tracking-[0.2em] uppercase leading-none">
                Umrah Transport
            </span>
        </div>
    </div>
  );
}
