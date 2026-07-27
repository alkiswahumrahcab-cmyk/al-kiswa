'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import CTAButton from './CTAButton';

export default function SidebarBookingWidget() {
    return (
        <div className="bg-ink-bg rounded-3xl p-8 text-on-ink shadow-2xl border border-border/10 relative overflow-hidden">
            {/* Subtle Gold Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/15 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <h3 className="text-2xl font-display font-semibold mb-6 flex items-center gap-3 text-on-ink">
                <span className="w-1 h-6 bg-gold rounded-full" />
                Get a Quote
            </h3>

            <div className="space-y-5 mb-8">
                <div className="space-y-2 relative z-10">
                    <label className="text-xs text-on-ink-muted uppercase tracking-wider font-bold">Pickup</label>
                    <div className="flex items-center gap-3 bg-ink-surface/50 p-4 rounded-xl border border-border/10 transition-colors hover:border-gold/30">
                        <MapPin size={18} className="text-gold flex-shrink-0" />
                        <span className="text-[15px] font-medium">Jeddah Airport (JED)</span>
                    </div>
                </div>

                <div className="space-y-2 relative z-10">
                    <label className="text-xs text-on-ink-muted uppercase tracking-wider font-bold">Drop-off</label>
                    <div className="flex items-center gap-3 bg-ink-surface/50 p-4 rounded-xl border border-border/10 transition-colors hover:border-gold/30">
                        <MapPin size={18} className="text-gold flex-shrink-0" />
                        <span className="text-[15px] font-medium">Makkah Hotel</span>
                    </div>
                </div>

                <div className="p-3 mt-4 bg-gold/5 border border-gold/20 rounded-xl relative z-10">
                    <p className="text-sm text-gold text-center font-bold tracking-wide">
                        ✨ Best Price Guarantee
                    </p>
                </div>
            </div>

            <div className="relative z-10">
                <CTAButton
                    text="Calculate Price"
                    href="/booking"
                    className="w-full justify-center !py-4 shadow-lg shadow-gold/10"
                />
            </div>

            <p className="text-xs text-center text-on-ink-muted mt-5 relative z-10">
                No credit card required for quote
            </p>
        </div>
    );
}
