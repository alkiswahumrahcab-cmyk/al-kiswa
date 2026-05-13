'use client';

import React from 'react';
import { ShieldCheck, Award, MapPin } from 'lucide-react';
import Link from 'next/link';

const NusukSidebarCard = () => {
    return (
        <div className="bg-[#111] border border-[#1b5e43]/50 rounded-2xl overflow-hidden shadow-xl sticky top-24">
            {/* Header Area */}
            <div className="bg-gradient-to-br from-[#0f3d2b] to-[#0a2015] p-6 text-center relative">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 mix-blend-overlay" />
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 mb-4 relative z-10">
                    <ShieldCheck size={32} className="text-[#34d399]" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2 relative z-10">Official Transport</h3>
                <div className="inline-block px-3 py-1 bg-black/40 rounded-full border border-white/10 text-[#34d399] text-xs font-bold tracking-widest uppercase relative z-10">
                    Nusuk Registered
                </div>
            </div>

            {/* Body Area */}
            <div className="p-6">
                <p className="text-gray-400 text-sm leading-relaxed text-center mb-6">
                    All Al Kiswah vehicles are officially registered on the Ministry of Hajj & Umrah's government-verified system.
                </p>

                <ul className="space-y-4 mb-6">
                    <li className="flex gap-3 text-sm text-gray-300">
                        <Award size={18} className="text-gold-primary shrink-0 mt-0.5" />
                        <span>Ministry Licensed Operator</span>
                    </li>
                    <li className="flex gap-3 text-sm text-gray-300">
                        <MapPin size={18} className="text-blue-400 shrink-0 mt-0.5" />
                        <span>Live GPS Tracking Systems</span>
                    </li>
                </ul>

                <Link 
                    href="/#booking" 
                    className="block w-full text-center py-3 px-4 bg-gold-primary hover:bg-white text-black font-bold rounded-lg transition-colors"
                >
                    Book Verified Taxi
                </Link>
            </div>
        </div>
    );
};

export default NusukSidebarCard;
