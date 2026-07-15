import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export default function TrustBar() {
    return (
        <section className="bg-surface-alt border-y border-border py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 text-ink">
                    
                    {/* Rating */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-1 text-gold mb-1">
                            <Star size={20} fill="currentColor" />
                            <Star size={20} fill="currentColor" />
                            <Star size={20} fill="currentColor" />
                            <Star size={20} fill="currentColor" />
                            <Star size={20} fill="currentColor" />
                        </div>
                        <span className="font-semibold text-lg">4.9/5 Average Rating</span>
                        <span className="text-sm text-muted">From 500+ Pilgrim Reviews</span>
                    </div>

                    {/* Stat */}
                    <div className="flex flex-col items-center md:items-start md:border-l border-border md:pl-12">
                        <span className="text-3xl font-display font-bold text-gold-strong">5,000+</span>
                        <span className="text-sm font-medium uppercase tracking-wider text-muted">Pilgrims Served</span>
                    </div>

                    {/* Partner / Logos */}
                    <div className="flex flex-col items-center md:items-start md:border-l border-border md:pl-12">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={28} className="text-gold" />
                            <div>
                                <span className="block font-semibold">Nusuk Approved</span>
                                <span className="text-sm text-muted">Ministry of Hajj & Umrah</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
