'use client';

import { ShieldCheck, X, Check, TrendingDown, Car, Headphones, DollarSign } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

const rows = [
    {
        icon: DollarSign,
        label: 'Platform Commission',
        us: { text: '0% — Zero Markup', good: true },
        them: { text: '+15% to 30% added to your fare', good: false },
    },
    {
        icon: Car,
        label: 'Vehicle Ownership',
        us: { text: 'Our own licensed Saudi fleet', good: true },
        them: { text: '3rd-party random subcontractors', good: false },
    },
    {
        icon: ShieldCheck,
        label: 'Price Guarantee',
        us: { text: 'Fixed at booking — never changes', good: true },
        them: { text: 'May change after payment', good: false },
    },
    {
        icon: Headphones,
        label: 'Support',
        us: { text: 'Direct WhatsApp to your driver', good: true },
        them: { text: 'Ticket system, email only', good: false },
    },
    {
        icon: TrendingDown,
        label: 'Hidden Fees',
        us: { text: 'Tolls, parking, fuel included', good: true },
        them: { text: 'Extras often billed on arrival', good: false },
    },
];

const competitors = ['Booking.com', 'Telexo', 'Kiwi.com', 'Viator'];

export default function DirectVsMiddleman() {
    return (
        <section className="py-24 relative z-10 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4">
                <FadeIn>
                    {/* Header */}
                    <div className="text-center mb-14">
                        <span className="inline-block bg-gold-primary/10 border border-gold-primary/30 text-gold-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                            Why Pay More?
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            We Are <span className="text-gold-primary">Not a Middleman.</span>
                            <br className="hidden md:block" /> We Are the Driver.
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Unlike {competitors.join(', ')} — we own every vehicle in our fleet.
                            No broker. No commission. No mystery surcharge. You book with us, you ride with us.
                        </p>
                    </div>

                    {/* Comparison Table */}
                    <div className="max-w-5xl mx-auto">
                        {/* Column Headers */}
                        <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1.5fr_1fr_1fr] gap-3 mb-4 px-4">
                            <div />
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 bg-gold-primary/10 border border-gold-primary/40 text-gold-primary font-bold px-4 py-2 rounded-full text-sm">
                                    <ShieldCheck size={16} />
                                    Al Kiswah
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-gray-400 font-medium px-4 py-2 rounded-full text-sm">
                                    Other Platforms
                                </div>
                            </div>
                        </div>

                        {/* Rows */}
                        <div className="space-y-3">
                            {rows.map((row, i) => {
                                const Icon = row.icon;
                                return (
                                    <div
                                        key={i}
                                        className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1.5fr_1fr_1fr] gap-3 items-center bg-white/3 border border-white/5 rounded-2xl px-4 py-4 hover:border-white/10 transition-colors"
                                    >
                                        {/* Label */}
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-xl bg-white/5 text-gray-400 shrink-0">
                                                <Icon size={18} />
                                            </div>
                                            <span className="text-gray-300 font-medium text-sm md:text-base">{row.label}</span>
                                        </div>

                                        {/* Al Kiswah */}
                                        <div className="flex items-center gap-2 justify-center md:justify-start">
                                            <div className="shrink-0 p-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                                                <Check size={14} />
                                            </div>
                                            <span className="text-emerald-400 font-semibold text-sm hidden md:block">{row.us.text}</span>
                                            <span className="text-emerald-400 font-semibold text-xs md:hidden">Direct</span>
                                        </div>

                                        {/* Competitors */}
                                        <div className="flex items-center gap-2 justify-center md:justify-start">
                                            <div className="shrink-0 p-0.5 rounded-full bg-red-500/20 text-red-400">
                                                <X size={14} />
                                            </div>
                                            <span className="text-red-400 text-sm hidden md:block">{row.them.text}</span>
                                            <span className="text-red-400 text-xs md:hidden">Extra fees</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-gold-primary/10 to-transparent border border-gold-primary/20 rounded-2xl px-6 py-5">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gold-primary/15 rounded-xl text-gold-primary shrink-0">
                                    <ShieldCheck size={28} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg">Saudi-Licensed Fleet Owner</p>
                                    <p className="text-gray-400 text-sm">Ministry of Hajj &amp; Umrah Licensed · Makkah, Saudi Arabia</p>
                                </div>
                            </div>
                            <a
                                href="/booking"
                                className="shrink-0 bg-gold-primary text-black font-bold px-8 py-3 rounded-xl hover:bg-white transition-colors uppercase tracking-wider text-sm"
                            >
                                Book Direct — Save 20–30%
                            </a>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
