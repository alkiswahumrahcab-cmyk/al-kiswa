'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeLogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function ThemeLogo({ className = "", width = 160, height = 48, priority = false }: ThemeLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // To prevent hydration mismatch, default to the dark theme logo (logo-light.svg is for dark theme)
  const logoSrc = mounted && resolvedTheme === 'light' ? '/logo-dark.svg' : '/logo-light.svg';

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Image
        src={logoSrc}
        alt="Al Kiswah Umrah Transport"
        width={width}
        height={height}
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}
