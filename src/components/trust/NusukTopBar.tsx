'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

const NusukTopBar = () => {
    return (
        <div className="bg-[#0f3d2b] border-b border-[#1b5e43] text-white py-2 px-4 relative z-50">
            <div className="container mx-auto flex items-center justify-center gap-3 text-center">
                <ShieldCheck size={16} className="text-[#34d399] shrink-0" />
                <p className="text-xs md:text-sm font-medium tracking-wide">
                    <span className="hidden md:inline">All vehicles are officially registered on the </span>
                    <strong className="text-[#34d399] font-bold">Nusuk platform</strong> 
                    <span className="hidden md:inline"> — Government-verified for licensed pilgrim transport.</span>
                    <span className="md:hidden"> Ministry of Hajj Verified Transport</span>
                </p>
                {/* Arabic Text (Optional, hidden on very small screens to save space) */}
                <p className="hidden lg:block text-xs text-[#34d399]/80 font-arabic ml-4 pl-4 border-l border-white/10" dir="rtl">
                    مركباتنا مسجلة رسمياً في منصة نسك
                </p>
            </div>
        </div>
    );
};

export default NusukTopBar;
