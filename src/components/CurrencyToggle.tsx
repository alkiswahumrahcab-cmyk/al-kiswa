'use client';

import React, { useEffect, useState } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { Banknote } from 'lucide-react';
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
        return <div className={`w-16 h-8 rounded-full bg-slate-800/50 ${className}`} />;
    }

    return (
        <button
            onClick={toggleCurrency}
            className={`
                relative flex items-center justify-between w-20 h-9 rounded-full 
                bg-slate-800/80 border border-slate-700/50 backdrop-blur-md
                hover:border-amber-500/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50
                ${className}
            `}
            aria-label="Toggle currency"
        >
            <span className="sr-only">Switch to {currency === 'SAR' ? 'USD' : 'SAR'}</span>
            
            {/* Background pill */}
            <motion.div
                className="absolute inset-y-1 bg-amber-500 rounded-full"
                initial={false}
                animate={{
                    left: currency === 'SAR' ? '4px' : 'calc(100% - 36px)',
                    width: '32px'
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            />
            
            <span className={`relative z-10 w-1/2 text-center text-xs font-bold transition-colors duration-300 ${currency === 'SAR' ? 'text-black' : 'text-slate-400'}`}>
                SAR
            </span>
            <span className={`relative z-10 w-1/2 text-center text-xs font-bold transition-colors duration-300 ${currency === 'USD' ? 'text-black' : 'text-slate-400'}`}>
                USD
            </span>
        </button>
    );
}
