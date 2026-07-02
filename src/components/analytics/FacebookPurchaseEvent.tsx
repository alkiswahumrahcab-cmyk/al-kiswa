'use client';

import { useEffect } from 'react';

export default function FacebookPurchaseEvent({ 
    value, 
    currency 
}: { 
    value: number | string, 
    currency: string 
}) {
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
            // Wait a brief moment to ensure base pixel is fully initialized
            setTimeout(() => {
                (window as any).fbq('track', 'Purchase', {
                    value: Number(value) || 0,
                    currency: currency || 'SAR'
                });
            }, 500);
        }
    }, [value, currency]);

    return null;
}
