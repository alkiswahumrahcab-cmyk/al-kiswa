"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith("/ar");

  // Correctly compute the alternate path
  // /ar/services/jeddah  →  /services/jeddah
  // /services/jeddah     →  /ar/services/jeddah
  const englishPath = isArabic ? pathname.replace(/^\/ar/, "") || "/" : pathname;
  const arabicPath = isArabic ? pathname : `/ar${pathname === "/" ? "" : pathname}`;

  return (
    <div
      className="flex items-center gap-0.5 bg-white/5 rounded-full p-0.5 border border-white/10 backdrop-blur-sm"
      role="navigation"
      aria-label="Select language"
    >
      {/* Globe icon */}
      <span className="pl-2 text-gray-400">
        <Globe size={12} />
      </span>

      {/* English */}
      <Link
        href={englishPath}
        hrefLang="en"
        lang="en"
        title="Switch to English"
        aria-current={!isArabic ? "true" : undefined}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
          !isArabic
            ? "bg-gold-primary text-black shadow-md"
            : "text-gray-400 hover:text-white"
        }`}
      >
        <span>EN</span>
      </Link>

      {/* Arabic */}
      <Link
        href={arabicPath}
        hrefLang="ar"
        lang="ar"
        title="التبديل إلى العربية"
        aria-current={isArabic ? "true" : undefined}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
          isArabic
            ? "bg-gold-primary text-black shadow-md"
            : "text-gray-400 hover:text-white"
        }`}
        style={{ fontFamily: "var(--font-arabic, inherit)" }}
      >
        <span>عربي</span>
      </Link>
    </div>
  );
}
