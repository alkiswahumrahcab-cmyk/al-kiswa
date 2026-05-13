'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle } from 'lucide-react';

const NusukHeroBadges = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8"
        >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f3d2b]/60 border border-[#34d399]/30 text-[#34d399] text-[11px] font-bold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <Shield size={14} className="fill-[#34d399]/20" />
                Nusuk Registered
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-gray-300 text-[11px] font-bold tracking-wider uppercase backdrop-blur-md">
                <Award size={14} className="text-gold-primary" />
                Ministry Licensed
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-gray-300 text-[11px] font-bold tracking-wider uppercase backdrop-blur-md">
                <CheckCircle size={14} className="text-[#34d399]" />
                Verified Transport
            </div>
        </motion.div>
    );
};

export default NusukHeroBadges;
