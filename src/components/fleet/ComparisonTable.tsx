'use client';

import FadeIn from '@/components/common/FadeIn';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ComparisonTable() {

    const data = [
        { name: 'GMC Yukon XL', link: '/fleet/gmc-yukon-at4', seats: '7', luggage: '5+ large', bestFor: 'VIP family', price: '350' },
        { name: 'Hyundai Staria', link: '/fleet/hyundai-staria', seats: '9', luggage: '4 large', bestFor: 'Groups', price: '280' },
        { name: 'Toyota Hiace', link: '/fleet/toyota-hiace', seats: '12', luggage: '8 large', bestFor: 'Large groups', price: '320' },
        { name: 'Toyota Camry', link: '/fleet/toyota-camry', seats: '4', luggage: '2 large', bestFor: 'Solo/couple', price: '180' },
        { name: 'Hyundai Starex', link: '/fleet/hyundai-starex', seats: '8', luggage: '4 large', bestFor: 'Medium groups', price: '250' },
    ];

    return (
        <section className="py-20 bg-transparent relative">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-bold font-sans text-center mb-12 text-white">
                        Compare All <span className="text-gold-primary">Vehicles</span>
                    </h2>
                </FadeIn>

                <div className="overflow-x-auto pb-4 custom-scrollbar max-w-5xl mx-auto">
                    <GlassCard className="min-w-[800px] overflow-hidden p-0 border-white/10 bg-neutral-900/80 backdrop-blur-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/80 text-white border-b border-gold-primary/30">
                                    <th className="p-5 font-sans font-bold text-lg text-gold-primary">Vehicle</th>
                                    <th className="p-5 font-sans font-bold text-lg text-gold-primary text-center">Seats</th>
                                    <th className="p-5 font-sans font-bold text-lg text-gold-primary text-center">Luggage</th>
                                    <th className="p-5 font-sans font-bold text-lg text-gold-primary">Best For</th>
                                    <th className="p-5 font-sans font-bold text-lg text-gold-primary text-right">Price From (SAR)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {data.map((row, i) => (
                                    <tr key={i} className="hover:bg-gold-primary/5 transition-colors duration-200 group">
                                        <td className="p-5">
                                            <Link href={row.link} className="font-bold text-white group-hover:text-gold-primary transition-colors inline-flex items-center gap-2">
                                                {row.name}
                                            </Link>
                                        </td>
                                        <td className="p-5 text-gray-300 text-center">{row.seats}</td>
                                        <td className="p-5 text-gray-300 text-center">{row.luggage}</td>
                                        <td className="p-5 text-gray-300">{row.bestFor}</td>
                                        <td className="p-5 font-bold text-gold-primary text-right">{row.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </GlassCard>
                    <div className="text-right mt-4">
                        <Link href="/pricing" className="text-sm text-gold-primary hover:text-white font-bold underline underline-offset-4 transition-colors inline-flex items-center gap-1">
                            → See full route pricing
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
