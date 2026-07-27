'use client';

import React, { useEffect, useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { motion } from 'framer-motion';

interface CurrencyToggleProps {
    className?: string;
}

export default function CurrencyToggle({ className = '' }: CurrencyToggleProps) {
    const { currency, toggleCurrency } = useCurrency();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={`w-24 h-10 rounded-full bg-surface-alt border border-border animate-pulse ${className}`} />;
    }

    return (
        <button
            onClick={toggleCurrency}
            className={`
                group flex items-center gap-2 px-3 py-1.5 rounded-full
                bg-surface-alt/50 hover:bg-surface-alt border border-transparent hover:border-border/50
                transition-all duration-300 focus:outline-none backdrop-blur-sm
                ${className}
            `}
            aria-label={`Toggle currency, currently ${currency}`}
        >
            <span className={`flex items-center gap-1 text-[11px] font-bold tracking-widest transition-colors ${currency === 'SAR' ? 'text-gold-strong' : 'text-muted group-hover:text-ink'}`}>
                <span className="text-sm font-medium">﷼</span> SAR
            </span>
            <span className="text-border text-[10px]">|</span>
            <span className={`flex items-center gap-1 text-[11px] font-bold tracking-widest transition-colors ${currency === 'USD' ? 'text-gold-strong' : 'text-muted group-hover:text-ink'}`}>
                <span className="text-sm font-medium">$</span> USD
            </span>
        </button>
    );
}
