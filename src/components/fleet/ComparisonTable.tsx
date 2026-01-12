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
        <section className="py-20 bg-transparent relative">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-bold font-sans text-center mb-12 text-white">
                        Compare Our <span className="text-gold-primary">Premium Fleet</span>
                    </h2>
                </FadeIn>

                <div className="overflow-x-auto pb-4 custom-scrollbar">
                    <GlassCard className="min-w-[800px] overflow-hidden p-0 border-white/10 bg-neutral-900/80 backdrop-blur-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black/80 text-white border-b border-gold-primary/30">
                                    <th className="p-5 font-sans font-bold text-lg text-gold-primary">Vehicle Type</th>
                                    <th className="p-5 font-sans font-bold text-lg text-gold-primary">Capacity</th>
                                    <th className="p-5 font-sans font-bold text-lg text-gold-primary">Comfort Level</th>
                                    <th className="p-5 font-sans font-bold text-lg text-gold-primary">Starting Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {data.map((row) => (
                                    <tr key={row.type} className="hover:bg-gold-primary/5 transition-colors duration-200 group">
                                        <td className="p-5 font-bold text-white group-hover:text-gold-primary transition-colors">{row.name}</td>
                                        <td className="p-5 text-gray-300">{row.capacity} Passengers</td>
                                        <td className="p-5 text-gray-300">{row.comfort}</td>
                                        <td className="p-5 font-bold text-gold-primary">{row.price}</td>
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
