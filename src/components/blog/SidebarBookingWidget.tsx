'use client';

import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import CTAButton from './CTAButton';

export default function SidebarBookingWidget() {
    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl border border-white/10 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />

            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gold-primary rounded-full" />
                Get a Quote
            </h3>

            <div className="space-y-4 mb-6">
                <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Pickup</label>
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                        <MapPin size={18} className="text-gold-primary" />
                        <span className="text-sm">Jeddah Airport (JED)</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Drop-off</label>
                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                        <MapPin size={18} className="text-gold-primary" />
                        <span className="text-sm">Makkah Hotel</span>
                    </div>
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <p className="text-xs text-emerald-400 text-center font-medium">
                        ✨ Best Price Guarantee
                    </p>
                </div>
            </div>

            <CTAButton
                text="Calculate Price"
                href="/booking"
                className="w-full justify-center !py-4"
            />

            <p className="text-[10px] text-center text-gray-500 mt-4">
                No credit card required for quote
            </p>
        </div>
    );
}
