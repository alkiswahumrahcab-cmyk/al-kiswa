'use client';

import { useEffect, useRef } from 'react';

interface TrackEventProps {
    event: string;
    params?: Record<string, any>;
    eventId?: string;
}

export default function TrackEvent({ event, params, eventId }: TrackEventProps) {
    const hasFired = useRef(false);

    useEffect(() => {
        if (hasFired.current) return;
        
        if (typeof window !== 'undefined' && (window as any).fbq) {
            // Wait a brief moment to ensure base pixel is fully initialized
            setTimeout(() => {
                const options = eventId ? { eventID: eventId } : undefined;
                if (params) {
                    (window as any).fbq('track', event, params, options);
                } else {
                    (window as any).fbq('track', event, undefined, options);
                }
                hasFired.current = true;
            }, 500);
        }
    }, [event, params, eventId]);

    return null;
}
