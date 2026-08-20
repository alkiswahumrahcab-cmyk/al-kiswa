'use client';
import { useEffect, useState } from 'react';

function getCountdown(date: string, time: string): string {
    const pickup = new Date(`${date}T${time}`);
    if (isNaN(pickup.getTime())) return '';
    const now = new Date();
    const diffMs = pickup.getTime() - now.getTime();
    if (diffMs < 0) {
        const abs = Math.abs(diffMs);
        const h = Math.floor(abs / 3600000);
        const m = Math.floor((abs % 3600000) / 60000);
        if (h > 48) return `${Math.floor(h / 24)}d ago`;
        if (h > 0) return `${h}h ${m}m ago`;
        return `${m}m ago`;
    }
    const h = Math.floor(diffMs / 3600000);
    const m = Math.floor((diffMs % 3600000) / 60000);
    const s = Math.floor((diffMs % 60000) / 1000);
    if (h > 48) return `in ${Math.floor(h / 24)} days`;
    if (h > 0) return `in ${h}h ${m}m`;
    if (m > 0) return `in ${m}m ${s}s`;
    return `in ${s}s`;
}

export default function CountdownTimer({ date, time, className = '' }: { date: string; time: string; className?: string }) {
    const [countdown, setCountdown] = useState(() => getCountdown(date, time));
    useEffect(() => {
        const iv = setInterval(() => setCountdown(getCountdown(date, time)), 1000);
        return () => clearInterval(iv);
    }, [date, time]);
    if (!countdown) return null;
    return <span className={`font-mono tabular-nums ${className}`}>{countdown}</span>;
}