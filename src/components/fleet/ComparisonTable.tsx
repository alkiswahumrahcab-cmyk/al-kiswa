'use client';

import FadeIn from '@/components/common/FadeIn';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';
import { FLEET, formatSeats, formatLuggage } from '@/data/fleet';

const PRICE_MAP: Record<string, string> = {
    'gmc-yukon-xl': '350',
    'hyundai-staria': '280',
    'toyota-hiace': '320',
    'toyota-camry': '180',
    'hyundai-starex': '250',
    'toyota-coaster': '650',
    'mitsubishi-xpander': '150'
};

export default function ComparisonTable() {

    // Using the same array as the card grid
    const displayVehicles = FLEET.filter(v => v.bookable);

    return (
        <section className="py-24 bg-surface-alt relative">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-semibold font-display text-center mb-16 text-ink">
                        Compare All <span className="text-gold italic font-serif">Vehicles</span>
                    </h2>
                </FadeIn>

                <div className="overflow-x-auto pb-4 custom-scrollbar max-w-5xl mx-auto">
                    <GlassCard className="min-w-[800px] overflow-hidden p-0 border-border bg-surface shadow-sm rounded-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-alt text-ink border-b border-border">
                                    <th className="p-5 font-sans font-bold text-lg">Vehicle</th>
                                    <th className="p-5 font-sans font-bold text-lg text-center">Seats</th>
                                    <th className="p-5 font-sans font-bold text-lg text-center">Luggage</th>
                                    <th className="p-5 font-sans font-bold text-lg">Best For</th>
                                    <th className="p-5 font-sans font-bold text-lg text-right">Price From (SAR)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {displayVehicles.map((vehicle, i) => {
                                    const linkHref = `/fleet/${vehicle.slug}`;
                                    
                                    return (
                                    <tr key={i} className="hover:bg-surface-alt transition-colors duration-200 group">
                                        <td className="p-5">
                                            {vehicle.hasDetailPage ? (
                                                <Link href={linkHref} className="font-bold text-ink group-hover:text-gold-strong transition-colors inline-flex items-center gap-2">
                                                    {vehicle.name}
                                                </Link>
                                            ) : (
                                                <span className="font-bold text-ink inline-flex items-center gap-2">
                                                    {vehicle.name}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-5 text-body text-center">{formatSeats(vehicle)}</td>
                                        <td className="p-5 text-body text-center">{formatLuggage(vehicle)}</td>
                                        <td className="p-5 text-body">{vehicle.bestFor}</td>
                                        <td className="p-5 font-bold text-gold-strong text-right">{PRICE_MAP[vehicle.id] || 'Contact Us'}</td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </GlassCard>
                    <div className="text-right mt-4">
                        <Link href="/pricing" className="text-sm text-gold-strong hover:text-ink font-bold underline underline-offset-4 transition-colors inline-flex items-center gap-1">
                            → See full route pricing
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
