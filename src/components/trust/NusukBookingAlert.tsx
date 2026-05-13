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
            <div className="relative overflow-hidden bg-gradient-to-r from-[#0f3d2b] to-[#112a20] border border-[#1b5e43] rounded-xl shadow-lg p-5">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#34d399]" />
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#34d399]/10 rounded-full blur-2xl" />
                
                <div className="relative z-10 flex gap-4 items-start sm:items-center">
                    <div className="bg-[#1b5e43]/50 p-3 rounded-lg border border-[#34d399]/20 shrink-0">
                        <ShieldCheck size={24} className="text-[#34d399]" />
                    </div>
                    
                    <div className="flex-grow">
                        <h4 className="text-white font-bold text-base md:text-lg mb-1 flex items-center gap-2">
                            Nusuk Verified Booking
                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#34d399] text-[#0f3d2b]">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Your booking is protected. All Al Kiswah Umrah Cab vehicles are officially registered on the Ministry of Hajj & Umrah's Nusuk platform.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NusukBookingAlert;
