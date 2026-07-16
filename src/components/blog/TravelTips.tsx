import React from 'react';
import { Calendar, Shield, Map } from 'lucide-react';

const tips = [
    {
        title: "Book in Advance",
        description: "Especially during peak seasons like Ramadan and Hajj, booking your transport weeks ahead ensures availability and better rates.",
        icon: Calendar,
        image: "/images/blog/tip-booking.png"
    },
    {
        title: "Verify Licensing",
        description: "Always choose a licensed transport provider to ensure safety, insurance coverage, and professional service standards.",
        icon: Shield,
        image: "/images/blog/tip-safety.png"
    },
    {
        title: "Plan Ziyarat Routes",
        description: "Discuss your Ziyarat locations with your driver beforehand to optimize your route and save time for worship.",
        icon: Map,
        image: "/images/blog/tip-route.png"
    }
];

export default function TravelTips() {
    return (
        <section className="py-24 bg-surface-alt relative overflow-hidden border-t border-border">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-gold-strong font-semibold tracking-[0.14em] uppercase text-sm mb-4 block">Expert Advice</span>
                    <h2 className="text-3xl md:text-[44px] font-semibold text-ink mb-6 font-display leading-tight">Essential Travel Tips</h2>
                    <p className="text-body text-lg font-body leading-[1.65]">
                        Maximize your spiritual experience with these key recommendations for a smooth and hassle-free journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tips.map((tip, index) => (
                        <div key={index} className="h-full flex flex-col p-0 overflow-hidden bg-surface border border-border rounded-xl group transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                            <div className="relative h-64 bg-surface-alt flex items-center justify-center overflow-hidden border-b border-border">
                                
                                <div className="relative z-10 transform scale-150 group-hover:scale-125 transition-transform duration-500 text-gold-line opacity-50">
                                    <tip.icon size={80} />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                                    <div className="w-12 h-12 rounded-pill bg-gold text-ink flex items-center justify-center font-bold font-sans text-lg shadow-sm">
                                        0{index + 1}
                                    </div>
                                    <div className="text-gold-strong opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <tip.icon size={32} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 pt-10 flex-grow bg-surface">
                                <h3 className="text-2xl font-semibold font-display text-ink mb-4 group-hover:text-gold-strong transition-colors">{tip.title}</h3>
                                <p className="text-body text-base leading-relaxed font-body">{tip.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
