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
            <div className="flex items-center gap-2 px-4 py-2 rounded-btn bg-success/20 border border-success/40 text-surface text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
                <Shield size={14} className="text-[#4ADE80]" /> {/* Bright green for dark mode contrast */}
                Nusuk Registered
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-btn bg-gold/15 border border-gold/40 text-surface text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
                <Award size={14} className="text-gold" />
                Ministry Licensed
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-btn bg-ink-surface/60 border border-border/20 text-surface text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
                <CheckCircle size={14} className="text-on-ink-muted" />
                Verified Transport
            </div>
        </motion.div>
    );
};

export default NusukHeroBadges;
