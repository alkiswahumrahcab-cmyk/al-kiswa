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

const competitors = ['other online platforms', 'global brokers', 'middlemen'];

export default function DirectVsMiddleman() {
    return (
        <section className="py-24 relative z-10 overflow-hidden bg-surface-alt border-y border-border">

            <div className="container mx-auto px-4">
                <FadeIn>
                    {/* Header */}
                    <div className="text-center mb-14">
                        <span className="inline-block bg-gold-soft border border-gold-line text-gold-strong text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                            Why Pay More?
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold font-display text-ink mb-4 leading-tight">
                            We Are <span className="text-gold">Not a Middleman.</span>
                            <br className="hidden md:block" /> We Are the Driver.
                        </h2>
                        <p className="text-body max-w-2xl mx-auto text-lg">
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
                                <div className="inline-flex items-center gap-2 bg-gold-soft border border-gold-line text-gold-strong font-bold px-4 py-2 rounded-[8px] text-sm">
                                    <ShieldCheck size={16} />
                                    Al Kiswah
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 bg-surface border border-border-strong text-muted font-medium px-4 py-2 rounded-[8px] text-sm">
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
                                        className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1.5fr_1fr_1fr] gap-3 items-center bg-surface border border-border rounded-xl px-4 py-4 hover:shadow-sm transition-shadow"
                                    >
                                        {/* Label */}
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-[8px] bg-surface-alt text-body shrink-0 border border-border">
                                                <Icon size={18} />
                                            </div>
                                            <span className="text-ink font-medium text-sm md:text-base">{row.label}</span>
                                        </div>

                                        {/* Al Kiswah */}
                                        <div className="flex items-center gap-2 justify-center md:justify-start">
                                            <div className="shrink-0 p-0.5 rounded-full bg-gold/20 text-gold">
                                                <Check size={14} />
                                            </div>
                                            <span className="text-gold font-semibold text-sm hidden md:block">{row.us.text}</span>
                                            <span className="text-gold font-semibold text-xs md:hidden">Direct</span>
                                        </div>

                                        {/* Competitors */}
                                        <div className="flex items-center gap-2 justify-center md:justify-start">
                                            <div className="shrink-0 p-0.5 rounded-full bg-error-soft text-error">
                                                <X size={14} />
                                            </div>
                                            <span className="text-error text-sm hidden md:block">{row.them.text}</span>
                                            <span className="text-error text-xs md:hidden">Extra fees</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-surface border border-gold-line rounded-xl px-6 py-5 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gold-soft rounded-[8px] text-gold-strong shrink-0">
                                    <ShieldCheck size={28} />
                                </div>
                                <div>
                                    <p className="text-ink font-bold text-lg">Saudi-Licensed Fleet Owner</p>
                                    <p className="text-body text-sm">Ministry of Hajj &amp; Umrah Licensed · Makkah, Saudi Arabia</p>
                                </div>
                            </div>
                            <a
                                href="/booking"
                                className="shrink-0 bg-gold text-ink font-semibold px-8 py-3 rounded-btn hover:bg-gold-soft transition-colors uppercase tracking-wider text-sm"
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
