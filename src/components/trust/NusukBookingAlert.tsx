'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const NusukBookingAlert = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full mb-8"
        >
            {/* Desktop Full Alert */}
            <div className="hidden sm:block relative overflow-hidden bg-surface-alt border border-gold/35 rounded-xl shadow-sm p-5">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gold-strong" />
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
                
                <div className="relative z-10 flex gap-4 items-center">
                    <div className="bg-surface p-3 rounded-lg border border-gold/20 shrink-0">
                        <ShieldCheck size={24} className="text-gold-strong" />
                    </div>
                    
                    <div className="flex-grow flex items-center">
                        <h4 className="text-ink font-bold text-lg flex items-center gap-2">
                            Nusuk registered vehicles
                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gold-strong text-surface">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                        </h4>
                    </div>
                </div>
            </div>

            {/* Mobile Lite Badge */}
            <div className="sm:hidden flex items-center gap-2 bg-surface-alt border border-gold/35 px-3 py-2 rounded-full w-fit shadow-sm">
                <ShieldCheck size={16} className="text-gold-strong" />
                <span className="text-xs font-semibold text-ink flex items-center gap-1.5">
                    Nusuk Registered
                    <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-gold-strong text-surface">
                        <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                </span>
            </div>
        </motion.div>
    );
};

export default NusukBookingAlert;
