'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function HtmlLangUpdater() {
    const pathname = usePathname();

    useEffect(() => {
        // Only run on the client side
        if (typeof window === 'undefined') return;

        const htmlElement = document.documentElement;

        if (pathname.startsWith('/ar')) {
            htmlElement.setAttribute('lang', 'ar');
            htmlElement.setAttribute('dir', 'rtl');
        } else {
            htmlElement.setAttribute('lang', 'en');
            htmlElement.setAttribute('dir', 'ltr');
        }
    }, [pathname]);

    // This component doesn't render anything
    return null;
}
