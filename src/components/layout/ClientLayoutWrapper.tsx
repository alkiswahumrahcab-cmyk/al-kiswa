'use client';

import { usePathname } from 'next/navigation';

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const shouldHide = pathname?.startsWith('/292852') || pathname?.startsWith('/driver');

    if (shouldHide) {
        return null;
    }

    return <>{children}</>;
}
