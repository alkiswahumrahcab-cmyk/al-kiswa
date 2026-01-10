'use client';

import FadeIn from '@/components/common/FadeIn';
import GlassCard from '@/components/ui/GlassCard';

export default function ComparisonTable() {

    const data = [
        { name: 'Toyota Camry', type: 'camry', capacity: '4', comfort: 'High', price: 'From SAR 200' },
        { name: 'GMC Yukon', type: 'gmc', capacity: '7', comfort: 'Premium', price: 'From SAR 400' },
        { name: 'Hyundai Staria', type: 'staria', capacity: '7', comfort: 'High', price: 'From SAR 300' },
        { name: 'Hyundai Starex', type: 'starex', capacity: '7', comfort: 'Standard', price: 'From SAR 250' },
        { name: 'Toyota Hiace', type: 'hiace', capacity: '11', comfort: 'Standard', price: 'From SAR 350' },
        { name: 'Toyota Coaster', type: 'coaster', capacity: '21', comfort: 'Standard', price: 'From SAR 600' },
    ];

    return (
        <section className="py-20 bg-white relative">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-bold font-playfair text-center mb-12 text-emerald-950">Compare Our <span className="text-gradient-gold">Premium Fleet</span></h2>
                </FadeIn>

                <div className="overflow-x-auto pb-4">
                    <GlassCard className="min-w-[800px] overflow-hidden p-0 border-slate-100 bg-white/80">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white border-b border-gold/30">
                                    <th className="p-4 font-playfair font-bold text-lg">Vehicle Type</th>
                                    <th className="p-4 font-playfair font-bold text-lg">Capacity</th>
                                    <th className="p-4 font-playfair font-bold text-lg">Comfort Level</th>
                                    <th className="p-4 font-playfair font-bold text-lg">Starting Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((row) => (
                                    <tr key={row.type} className="hover:bg-emerald-50/50 transition-colors duration-200 group">
                                        <td className="p-4 font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">{row.name}</td>
                                        <td className="p-4 text-slate-600">{row.capacity} Passengers</td>
                                        <td className="p-4 text-slate-600">{row.comfort}</td>
                                        <td className="p-4 font-bold text-gold">{row.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
}
