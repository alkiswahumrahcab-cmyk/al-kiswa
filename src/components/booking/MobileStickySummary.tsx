'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileStickySummaryProps {
    isVisible: boolean;
    vehicleName: string | null;
    totalAmount: number;
    currency: string;
    onConfirm: () => void;
    buttonText?: string;
    isSubmitting?: boolean;
}

export default function MobileStickySummary({
    isVisible,
    vehicleName,
    totalAmount,
    currency,
    onConfirm,
    buttonText = "Continue Booking",
    isSubmitting = false
}: MobileStickySummaryProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] md:hidden"
                >
                    {/* Floating Summary Bar */}
                    <div className="bg-surface/95 backdrop-blur-xl border-t border-border p-3 shadow-2xl">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-muted font-medium uppercase tracking-wider">
                                    Selected
                                </span>
                                <span className="text-sm text-ink font-bold truncate max-w-[150px]">
                                    {vehicleName || "No vehicle selected"}
                                </span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-muted font-medium uppercase tracking-wider">
                                    Total
                                </span>
                                <span className="text-base text-gold-strong font-bold">
                                    {currency === 'USD' ? '$' : ''}{totalAmount}{currency === 'SAR' ? ' SAR' : ''}
                                </span>
                            </div>
                        </div>
                        
                        <button
                            onClick={onConfirm}
                            disabled={isSubmitting || !vehicleName}
                            className="w-full bg-gold hover:bg-gold-strong text-ink font-bold text-sm py-2.5 px-4 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </div>
                            ) : (
                                buttonText
                            )}
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
