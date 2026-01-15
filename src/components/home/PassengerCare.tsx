'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Users, Heart, Check, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

const careOptions = [
    {
        id: 'sisters',
        title: 'Solo Sisters',
        arabicTitle: 'أمان تام للأخوات',
        icon: <Shield className="w-8 h-8" />,
        description: "We specialize in female-friendly transport where your security is our #1 priority. Our chauffeurs are vetted professionals trained to respect your privacy.",
        features: [
            "24/7 Control Room Tracking",
            "Share Live Trip Link instantly",
            "Privacy Screens Available",
            "Strict 'No Interaction' Policy"
        ],
        image: '/images/services/solo-sister-transport.png',
        linkText: "Read Safety Guide",
        link: "/blog/why-comfort-safety-matter-umrah-transport"
    },
    {
        id: 'families',
        title: 'Families',
        arabicTitle: 'خصوصية وراحة للعوائل',
        icon: <Users className="w-8 h-8" />,
        description: "Travel Together, Comfortably. We provide spacious GMC Yukons so your entire family stays together. We create a calm environment for children.",
        features: [
            "Spacious Interiors for strollers",
            "Flexible Stops for prayer/food",
            "Child Seats Available (Free)",
            "Entertainment Screens"
        ],
        image: '/images/services/family-transport-umrah.png',
        linkText: "Read Family Tips",
        link: "/blog/top-5-travel-tips-pilgrims-makkah-madinah"
    },
    {
        id: 'elderly',
        title: 'Elderly Care',
        arabicTitle: 'رعاية ورفق بكبار السن',
        icon: <Heart className="w-8 h-8" />,
        description: "Serving them is our Honor. We understand the physical challenges of Umrah. Our chauffeurs are trained to be extra patient and helpful.",
        features: [
            "Door-to-Door Assistance",
            "Closest Hotel Drop-offs",
            "Gentle driving style",
            "Wheelchair Handling"
        ],
        image: '/images/services/elderly-care-transport.png',
        linkText: "Read Elderly Guide",
        link: "/blog/private-taxi-vs-haramain-train-umrah"
    }
];

export default function PassengerCare() {
    return (
        <section className="bg-zinc-950 relative overflow-hidden">
            <div className="container mx-auto px-4 py-24 text-center relative z-10">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">
                        Tailored for <span className="text-gold-primary italic font-serif">Every Pilgrim</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                        Specialized care for every member of your family.
                    </p>
                </FadeIn>
            </div>

            <div className="flex flex-col w-full">
                {careOptions.map((option, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div key={option.id} className="grid grid-cols-1 lg:grid-cols-2 min-h-[450px]">
                            {/* Image - Conditional Order for Desktop */}
                            <div className={`relative h-[300px] lg:h-auto w-full ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                                <Image
                                    src={option.image}
                                    alt={option.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-zinc-900/90 backdrop-blur rounded-full border border-gold-primary/30 flex items-center justify-center text-gold-primary shadow-2xl lg:hidden">
                                    {option.icon}
                                </div>
                            </div>

                            {/* Content - Conditional Order */}
                            <div className={`bg-zinc-900 flex items-center p-8 lg:p-16 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                                <FadeIn className="w-full">
                                    <div className="hidden lg:flex w-16 h-16 bg-zinc-950 rounded-2xl border border-gold-primary/20 items-center justify-center text-gold-primary mb-6 shadow-lg">
                                        {option.icon}
                                    </div>

                                    <div className="flex items-center gap-4 mb-3">
                                        <span className="h-px w-12 bg-gold-primary" />
                                        <span className="text-gold-primary font-bold uppercase tracking-widest text-[10px]">
                                            {option.arabicTitle}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-4 font-sans">
                                        {option.title}
                                    </h3>

                                    <p className="text-gray-400 text-base leading-relaxed mb-6 font-light">
                                        {option.description}
                                    </p>

                                    <ul className="space-y-3 mb-8">
                                        {option.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-4 text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a href={option.link} className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest group hover:text-gold-primary transition-colors text-xs">
                                        <span>{option.linkText}</span>
                                        <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" />
                                    </a>
                                </FadeIn>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
