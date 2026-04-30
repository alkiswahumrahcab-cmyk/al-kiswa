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
                relative flex items-center justify-between w-24 h-10 rounded-full 
                bg-black/50 border border-gold-primary/30 backdrop-blur-md
                hover:border-gold-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-primary/50 shadow-[0_0_15px_rgba(239,191,91,0.1)] hover:shadow-[0_0_20px_rgba(239,191,91,0.2)]
                ${className}
            `}
            aria-label="Toggle currency"
        >
            <span className="sr-only">Switch to {currency === 'SAR' ? 'USD' : 'SAR'}</span>
            
            {/* Background pill */}
            <motion.div
                className="absolute inset-y-1 bg-gradient-to-r from-gold-primary to-gold-dark rounded-full shadow-inner"
                initial={false}
                animate={{
                    left: currency === 'SAR' ? '4px' : 'calc(100% - 44px)',
                    width: '40px'
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            />
            
            <span className={`relative z-10 w-1/2 text-center text-xs font-bold tracking-wider transition-colors duration-300 ${currency === 'SAR' ? 'text-black' : 'text-gray-400'}`}>
                SAR
            </span>
            <span className={`relative z-10 w-1/2 text-center text-xs font-bold tracking-wider transition-colors duration-300 ${currency === 'USD' ? 'text-black' : 'text-gray-400'}`}>
                USD
            </span>
        </button>
    );
}
