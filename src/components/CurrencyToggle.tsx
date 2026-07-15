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
                relative flex items-center justify-between w-24 h-10 rounded-full 
                bg-surface-alt border border-border p-1
                hover:border-gold/30 hover:bg-surface-alt/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/20
                ${className}
            `}
            aria-label="Toggle currency"
        >
            <span className="sr-only">Switch to {currency === 'SAR' ? 'USD' : 'SAR'}</span>
            
            {/* Active Pill Indicator */}
            <motion.div
                className="absolute inset-y-1 bg-surface rounded-full shadow-sm border border-border/50"
                initial={false}
                animate={{
                    left: currency === 'SAR' ? '4px' : 'calc(100% - 46px)',
                    width: '42px'
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
            
            <span className={`relative z-10 w-1/2 text-center text-[11px] font-bold tracking-widest transition-colors duration-300 ${currency === 'SAR' ? 'text-gold-strong' : 'text-muted group-hover:text-ink'}`}>
                SAR
            </span>
            <span className={`relative z-10 w-1/2 text-center text-[11px] font-bold tracking-widest transition-colors duration-300 ${currency === 'USD' ? 'text-gold-strong' : 'text-muted group-hover:text-ink'}`}>
                USD
            </span>
        </button>
    );
}
