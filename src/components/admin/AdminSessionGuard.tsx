'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { logout } from '@/lib/auth';

export default function AdminSessionGuard() {
    const pathname = usePathname();
    const prevPathRef = useRef(pathname);

    useEffect(() => {
        const prevPath = prevPathRef.current;
        const currentPath = pathname;

        const isAdminPath = (path: string) => path.startsWith('/292852');

        // If we were in admin (but not login) and now we are NOT in admin
        // Trigger logout without redirecting (so user can see the page they went to)
        if (isAdminPath(prevPath) && prevPath !== '/292852/login' && !isAdminPath(currentPath)) {
            logout(false);
        }

        prevPathRef.current = currentPath;
    }, [pathname]);

    return null;
}
